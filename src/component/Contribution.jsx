import { FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function Contribution(){

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
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/users/profile',{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                })

                setData(response)
            } catch (error) {
                console.error(error)
            }
        }

        userData()
    },[])

    console.log(data)

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
                <div className="w-full h-100 grid-cols-4 gap-3 justify-center content-center">
                    <button type="button" className="m-2">JAN</button>
                    <button type="button" className="m-2">FEB</button>
                    <button type="button" className="m-2">MAR</button>
                    <button type="button" className="m-2">APR</button>
                    <button type="button" className="m-2">MAY</button>
                    <button type="button" className="m-2">JUN</button>
                    <button type="button" className="m-2">JUL</button>
                    <button type="button" className="m-2">AUG</button>
                    <button type="button" className="m-2">SEPT</button>
                    <button type="button" className="m-2">OCT</button>
                    <button type="button" className="m-2">NOV</button>
                    <button type="button" className="m-2">DEC</button>
                </div>
            </div>
        </>
    )
}

export default Contribution