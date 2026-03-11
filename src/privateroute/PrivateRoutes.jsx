import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function PrivateRoutes({children}) {

    const navigate = useNavigate()
    
    // Check local storage for any token
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!token){
            // Token is not in client local storage
            navigate('/')
        }
    },[])


    // If client successfully log
    return children
}


export default PrivateRoutes