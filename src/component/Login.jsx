import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaUser, FaLock, FaBullseye, FaEye } from "react-icons/fa"
import axios from 'axios'



function Login() {

    //Declare useNavigate functin
    const navigate = useNavigate();

    //Hook to toggle Authentication error for username and password
    const [ userSetter, setUserErrsetter ] = useState(false);
    const [ passSetter, setPassSetter ] = useState(false)

    // eye toggle
    const [ eyeToggle, setEyeToggle ] = useState(FaBullseye)

    //Hook to change value in onchange function
    const [info, setInfo] = useState({
        username: '',
        password: ''
    });

    
    const handleOnchange = (e) => {
        e.preventDefault()

        const { name, value } = e.target
        setInfo((prev) => {
            return { ...prev, [name]: value }
        });

        //console.log(info);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // This data came from the server
            const toLogin = await axios.post('http://localhost:3000/users/login', info);            
            
            // Storing token to localstorage, token is from response in userLogin in userController.js
            localStorage.setItem('token', toLogin.data.token);
            localStorage.setItem('user', JSON.stringify(
                {
                    _id: toLogin.data._id,
                    username: toLogin.data.username,
                    email: toLogin.data.email
                }
            ))
            // Password is correct then navigate to Home page
            navigate('/home')

            //this part is to make payment status data
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:3000/users/profile',{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            
            //User ID from database
            const userId = response.data._id

            // Extract ISO date to months, day and year
            const createdAt = new Date(response.data.createdAt)
            const year = createdAt.getUTCFullYear()
            const createdMonth = createdAt.getUTCMonth() + 1
            const day = createdAt.getUTCDate()
            console.log(`Year: ${year}, Month: ${createdMonth}, Day:${day}`)

            // Current Year
            const thisYear = new Date().getUTCFullYear()
            

            //request to check if this user is already have a payment status in the status database collection
            const existingStatus = await axios.get('http://localhost:3000/users/status', {
                params:{userId,thisYear},
                headers:{"Authorization": `Bearer ${token}`}
            })

            
            console.log("Dapat data ni sya", existingStatus)

            if(existingStatus.data){
                //This will not create a payment status model
            }else{
                try {
                //Request to Create/POST into the server. userController will handle the request
                const pay  = await axios.post('http://localhost:3000/users/paymentstatus',{userId, thisYear},{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                })

                console.log("Compare user req:", userId)
                console.log(pay)

            } catch (error) {
                console.error(error)
            }
            }
            
            
        }catch(err){
            
            console.log(err.response.data.message)

            if(err.response.data.message == 'Wrong username'){
                alert('Wrong username')
                setUserErrsetter(true)
            }

            if(err.response.data.message == 'Wrong password'){
                alert('Wrong password')
                setPassSetter(true)
            }
        }
    };

    const handleNavigate = () => {
        navigate('/register')
    }

    const handleEye = () => {
        setEyeToggle(!eyeToggle)
    }


    return(
        <>
            <div className="w-90 h-screen relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-linear-to-b from-[#031a46] to-[#1e6fd9]">
                <div className="w-screen h-15 flex flex-row justify-end items-center gap-4 p-3">
                    <h3 className="text-amber-500">Sign in</h3>
                    <h3 className="text-blue-600" onClick={handleNavigate}>Sign up</h3>
                </div>
                <div className="h-130 ">
                    <form className=" h-full" onSubmit={handleSubmit}>
                        <div className="text-white">
                            <input className={ userSetter ? "w-full border-b-2 border-red-400 bg-transparent outline-none focus:border-blue-500 py-2" : "w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2" } placeholder="Username" type="text" id="username" autoComplete="username" name="username" onChange={handleOnchange} />
                        </div>
                        <div className="flex fle-row justify-center items-center text-white">
                            <input className={ passSetter ? "w-full border-b-2 border-red-400 bg-transparent outline-none focus:border-blue-500 py-2" : "w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2" } placeholder="Password"  type={eyeToggle ? "password" : "text"} id="password" name="password" onChange={handleOnchange}/>
                            < FaEye size={15} onClick={handleEye}/>
                        </div>
                        <div className="h-15 m-5 flex justify-center items-center ">
                            <button  type="submit" className="w-40 h-9 flex justify-center items-center hover:bg-gray-200" >Submit</button>
                        </div>
                        <div className="flex justify-center items-center">
                            <span onClick={handleNavigate} className="text-white">Register here</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
        
    

};

export default Login;