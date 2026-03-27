import { useState, useEffect, } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

function Success() {

    const location = useLocation()
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    
    function handleNavigate() {
        navigate('/home')
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const paymentIntentId = params.get("payment_intent_id")

        if(paymentIntentId){
            verifyPayment(paymentIntentId)
        }else{
            setStatus('Failed')
        }


    },[location])

    const verifyPayment = async (id) => {
        const publicKey = import.meta.env.PAYMONGO_PUBLIC_KEY
        try {
            const response = await axios.get(`http://localhost:3000/users/payment_verification/${id}`,{
                auth: {
                    username: publicKey,
                    password: ''
                }
            })

            //console.log(response)

            if(!response.data){
                return <p>Loading.....Please wait</p>
            }

            if(response.data ==="succeeded"){
                setStatus(true)
            }
            

        } catch (error) {
            console.error(error)
        }
    }


    return(
        <>
            <div className="w-90 h-screen flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl">{status? "Payment Successful" : "Payment Unsuccessful"}</h1>
                <button onClick={handleNavigate}>Home</button>
            </div>
        </>
    )
}

export default Success