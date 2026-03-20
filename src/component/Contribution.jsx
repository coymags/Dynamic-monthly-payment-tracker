import { FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function Contribution(){

    // Hook to update button into red ot green when status is updated
    const [ update, setUpdate] = useState("")

    //Navigation function
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate('/home')
    }

    //Year handler 
    const [ year, setYear ] = useState(new Date().getFullYear())
    const [data, setData] = useState(null)

    //Change value of the year
    const handleOnchange = (e) => {
        setYear(Number(e.target.value))
        console.log(e.target.value)
    }
    //Arrow up function
    const increment = () => {
        setYear(prevYear => prevYear + 1)
    }
    //Arrow down function
    const decrement = () => {
        setYear(prevYear => prevYear - 1)
    }

    useEffect(() => {
        
        const userData = async () => {
            try {
                //This response data is comming from user collection
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/users/profile',{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                })
                // Allocate response to data variable
                setData(response)
                const thisYear = new Date().getUTCFullYear()
                const userId = response.data._id

                //console.log(userId)
                //console.log(year)

                try {
                    // Getting the payment status from the status collection in database
                    const paymentStatus = await axios.get('http://localhost:3000/users/status',{
                        params:{userId, thisYear},
                        headers: {"Authorization": `Bearer ${token}`}
                    })

                    console.log(paymentStatus.data.months)
                    const date = paymentStatus.data.createdAt
                    const month = new Date(date).getUTCMonth() + 1
                    
                    //Condition to verrify which Quarter the user starts to pay
                    if(month <= 6){
                        const months = paymentStatus.data.months
                        console.log('Jan to June bayari')
                        console.log(paymentStatus.data)
                        for(let monthNumber in months){
                            console.log(months[monthNumber].status + `Month:${monthNumber}`)
                        }
                        
                    }else{
                        console.log('Jul to Dec bayari')
                    }

                } catch (error) {
                    console.error(error)
                }

            } catch (error) {
                console.error(error)
            }
        }

        userData()
        
    },[])

    
    return(
        <>
            <div className="w-90 h-screen flex flex-col relative min-h-screen overflow-hidden bg-linear-to-b from-[#031a46] to-[#1e6fd9]">
                <div className="w-full h-30 flex flex-row justify-between items-center p-5">
                    <h2 className="text-white">Contribution</h2>
                    <FaTimes size={20} onClick={handleOnClick} className="bg-white rounded-lg"/>
                </div>
                <div className="text-white flex flex-row justify-center items-center w-90 h-20 gap-5">
                    <label htmlFor="">Select Year: </label>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input type="number" value={year} onChange={handleOnchange} min={2000} max={2500} step={1} className="bg-white text-black rounded"/>
                        <FaArrowDown size={20} onClick={decrement}/><FaArrowUp size={20} onClick={increment}/>
                    </div>
                </div>
                <div className="w-full h-140 flex flex-col">
                    <div className="w-full h-6 flex justify-center items-center">
                        <h2 className="text-white">1st Quarter</h2>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">January</h2>
                        <button id="1" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">February</h2>
                        <button id="2" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">March</h2>
                        <button id="3" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">April</h2>
                        <button id="4" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">May</h2>
                        <button id="5" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">June</h2>
                        <button id="6" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-6 flex justify-center items-center">
                        <h2 className="text-white">2nd Quarter</h2>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">July</h2>
                        <button id="7" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">August</h2>
                        <button id="8" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">September</h2>
                        <button id="9" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">October</h2>
                        <button id="10" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">November</h2>
                        <button id="11" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                    <div className="w-full h-10 flex flex-row border-b border-gray-300 justify-between items-center p-2">
                        <h2 className="text-white text-lg">December</h2>
                        <button id="12" type="button" className={`w-40 h-7 flex justify-center items-center text-sm  ${update == "paid"? "text-green-400": "text-red-400"}`}>{update}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contribution