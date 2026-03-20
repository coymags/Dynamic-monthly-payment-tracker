require('dotenv').config()
//Paymongo
const paymongo = require('../.api/apis/paymongo')
//Axios
const axios = require('axios')


// Paymongo controller for client payment method
exports.userPayment = async (req, res) => {

    paymongo.auth(process.env.PAYMONGO_SECRET);
    
    const { userId, monthNumber, amount } = req.body
    
    try {
        // 1. Create payment intents (payment request)
       const intentResponse = await axios.post('https://api.paymongo.com/v1/payment_intents',{
            data:{
                attributes:{
                    amount: amount * 100,
                    payment_method_allowed: ['gcash'],
                    currency: "PHP",
                    description: `Monthly Dues for the  ${monthNumber} from ${userId}`,
                    capture_type: "automatic"
                }
            }
       },{
        auth:{
            username: process.env.PAYMONGO_SECRET,
            password:""
        },
        headers:{
            "Content-Type": "application/json"
        }
       })

       
       // 2. Create payment method (for checkout url)
       const paymentMethod = await axios.post('https://api.paymongo.com/v1/payment_methods',{
                data:{
                    attributes:{
                        type:"gcash"
                    }
                }
            },{
                auth:{
                    username: process.env.PAYMONGO_SECRET,
                    password: ""
                },
                headers:{
                    "Content-Type": "application/json"
                }
            }
        )
        
        //Get intentResponse ID and paymentMethod ID
        const paymentIntentID = intentResponse.data.data.id
        const paymentMethodID = paymentMethod.data.data.id

        
        // 3. Attach Payment Method to Payment Intent
        const attachResponse = await axios.post(`https://api.paymongo.com/v1/payment_intents/${paymentIntentID}/attach`,
            {
                data:{
                    attributes:{
                        payment_method: paymentMethodID,
                        return_url: 'http://localhost:5173/success'
                    }
                }
            },{
                auth:{
                    username: process.env.PAYMONGO_SECRET,
                    password: ""
                },
                headers:{
                    "Content-Type": "application/json"
                }
            }
        )

        res.json(attachResponse.data.data.attributes.next_action)

        /*
        // Get the data of payment intent
        const paymentIntentData = await axios.get(`https://api.paymongo.com/v1/payment_intents/${paymentIntentID}`,{
            auth:{
                username: process.env.PAYMONGO_SECRET,
                password: ""
            }
        })
        */
      

    } catch (error) {
        console.error(error)
    }
}

// Payment verification process
exports.paymentVerification = async (req, res) => {
    const {payment_intent_id} = req.params

    if(!payment_intent_id){
        return res.status(400).json({error:'Missing Payment Intent ID'})
    }

    try {
        const verifyResponse = await axios.get(`https://api.paymongo.com/v1/payment_intents/${payment_intent_id}`,
            {
                auth:{
                    username: process.env.PAYMONGO_SECRET,
                    password: ""
                }
            }
        )

        res.json(verifyResponse.data.data.attributes.status)

    } catch (error) {
        
    }
}