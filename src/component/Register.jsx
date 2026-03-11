import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaUser, FaLock, FaEye } from "react-icons/fa"


function Register() {

    //Year extraction handler
    const [ thisYear, setThisYear ] = useState(null)

    const [ errToggle, setErrToggle ] = useState(false)
    const [ eyeToggle, setEyeToggle ] = useState(false)

    const navigate = useNavigate();

    const [info, setInfo] = useState({
        firstname: "",
        lastname: "",
        address: "",
        birthday: "",
        age: "",
        email: "",
        username: "",
        password: ""
    })

    const handleOnchange = (e) => {
        e.preventDefault()

        const { name, value } =e.target
        setInfo((prev) => {
            return { ...prev, [name]: value }
        })
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault()


        if(info.email.includes('@')){
            
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(info)
            });


            // Execute when Registration is Successful
            alert('Registration Success')
            navigate('/')

            setErrToggle(false)
            
            if(response.status === 401){
                alert('Email already exist')
            }

        } else{
            setErrToggle(true)
            alert('Not an email')
        }
        
    };

    const handleNavigate = () => {
        navigate('/');
    };

    //Eye Toggle
    const handleEye = () => {
        setEyeToggle(!eyeToggle)
    }


    return(
        <>
            <div className="w-90 h-screen flex flex-col justify-center relative min-h-screen overflow-hidden bg-linear-to-b from-[#031a46] to-[#1e6fd9]">
                <div className="w-screen h-15 flex flex-row justify-end items-center gap-4 p-3">
                    <h3 className="text-amber-500" onClick={handleNavigate}>Sign in</h3>
                    <h3 className="text-blue-600" >Sign up</h3>
                </div>
                <div className="h-130 p-5">
                    <form className=" h-full " onSubmit={handleSubmit}>
                        <div className="text-white">
                            <input type="text" name="firstname" placeholder="Firstname" onChange={handleOnchange} className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2"/>
                            <input type="text" name="lastname" placeholder="Lastname" onChange={handleOnchange} className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2"/>
                            <input type="text" name="address" placeholder="Address" onChange={handleOnchange} className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2"/>
                            <input type="date" name="birthday" placeholder="mm/dd/yyyy" onChange={handleOnchange} className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2"/>
                            <input type="text" name="age" placeholder="Age" onChange={handleOnchange} className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2"/>
                        </div>
                        <div className="text-white">
                            <input className={errToggle ? "w-full border-b-2 border-red-400 bg-transparent outline-none focus:border-blue-500 py-2":"w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2"} placeholder="Email" type="text" id="email" autoComplete="email" name="email" onChange={handleOnchange}/>
                        </div>
                        <div className="text-white">
                            <input className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2" placeholder="Username" type="text" id="username" autoComplete="username" name="username" onChange={handleOnchange} />
                        </div>
                        <div className="flex fle-row justify-center items-center text-white">
                            <input className="w-full border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 py-2" placeholder="Password"  type={eyeToggle ? "text":"password"} id="password" name="password" onChange={handleOnchange}/>
                            < FaEye size={15} onClick={handleEye}/>
                        </div>
                        <div className="h-15 m-5 flex justify-center items-center ">
                            <button  type="submit" onClick={handleSubmit} className="w-40 h-9 flex justify-center items-center hover:bg-gray-200" >Submit</button>
                        </div>
                        <div className="flex justify-center items-center">
                            <span onClick={handleNavigate} className="text-white">I'm already a member</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;