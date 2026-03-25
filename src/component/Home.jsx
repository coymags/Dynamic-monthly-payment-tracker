import { useState, useEffect } from "react";
import axios from "axios";
import Contribution from "./Contribution";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


// This onLogout arguements is a prop from app.jsx file 
function Home({onLogout}) {

    // useState to handle data from the database
    const [ userData, setUserData ] = useState(null)
    // toggle div when pay monthly dues is click
    const [ open, setOpen ] = useState(false)
    // Setter of onchange value in payment number input
    const [num, setNum] = useState()

    //use navigate declaration
    const navigate = useNavigate()


    //Payment function to handle payment logic
    const sendPayment = async () => {

        const token = localStorage.getItem("token")
        try {
            //fetch data from database through protected route
            const response = await axios.get('http://localhost:3000/users/profile',{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            

            //Paymongo Payment intent (payment request)
            const checkout_url = await axios.post('http://localhost:3000/users/payment_intents',{
                userId: response.data._id,
                monthNumber : 3, //Change this monthNumber in to dynamic
                amount: num
                },{
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            )

            console.log(checkout_url.data)
            //redirect user to Gcash checkout page
            const redirectUrl = checkout_url.data.redirect.url
            //window.location.href = redirectUrl
            
            //User Payment for the database
            const userPayment = await axios.post('http://localhost:3000/users/payment',{
                    user: response.data._id,
                    payment: num
                },{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            
            //console.log(response.data._id)
            alert("payment successful")
            setOpen(!open)

        } catch (error) {
            console.error(error)
        }
    }

    //Onchange in payment input
    const handleOnchange = (e) => {
        setNum(e.target.value)
        console.log(num)
    }


    

    // Onclick for handling navigation
    const handleOnClick = () => {
        navigate("/contribution")
    }

    // useEffect to handle data from database and handling name and address of the user
    useEffect( () => {
        const getUser = async () => {

            //local storage token
            const token = localStorage.getItem('token')

            if(!token){
                console.error('No token found in local storage')
                return;
            }

            try{
                const user = await fetch('http://localhost:3000/users/profile',{
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!user.ok) {
                    const err = await user.json();
                    console.error("Server error:", err);
                    return;
                }


                const userInfo = await user.json()
                console.log(userInfo.firstname)
                setUserData(userInfo)
                
                

            }catch(error){
                console.error(error)
            }
        }

        getUser()
        
    },[])

    // Condition if the name and address is delayed 
    if(!userData){
        return <p>Loading user data.....</p>
    } 

    return(
        <>
            <div className="w-90 h-screen flex flex-col justify-center relative min-h-screen overflow-hidden bg-linear-to-b from-[#031a46] to-[#1e6fd9]">
                <div className="h-130 flex flex-col justify-center ">
                    <div className="m-3">
                        <h2 className="text-white text-3xl">Name:{userData.firstname[0].toUpperCase() + userData.firstname.slice(1)}</h2>
                        <h2 className="text-white text-2xl">Address: {userData.address}</h2>
                        <div className="h-15 m-5 flex justify-center items-center">
                            <button className="w-50 h-9 flex justify-center items-center hover:bg-gray-200 text-2xl" onClick={handleOnClick}>View Contribution</button>
                        </div>
                    </div>
                    <div className="h-40 flex flex-row justify-center items-center gap-5 m-3">
                        <button>Pay Registration</button>
                        <button onClick={() => setOpen(!open)}>Pay Monthly Dues</button>
                        {open && (
                            <div className="w-70 h-70 absolute bg-gray-300 flex flex-col gap-10 rounded" >
                                <div className="w-full h-10 flex justify-end p-3">
                                    < FaTimes size={18} className="" onClick={() => setOpen(!open)}/>
                                </div>
                                <div className="w-70 h-25 flex flex-col justify-between items-center">
                                    <input type="number" placeholder="amount" onChange={handleOnchange} className="border rounded p-1"/>
                                    <button className="h-10" onClick={sendPayment}>Submit</button>
                                </div>
                            </div>
                        )}
                    
                    </div>
                </div>
                <div className="w-90 h-40 flex justify-center items-center">
                    <button onClick={onLogout}>Logout</button>
                </div>
            </div>
        </>
    )
};


export default Home;