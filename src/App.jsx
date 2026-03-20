import {useNavigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Register from './component/Register'
import Login from './component/Login'
import Home from './component/Home'
import AdminDashboard from './component/AdminDashboard'
import PrivateRoutes from './privateroute/PrivateRoutes'
import Contribution from './component/Contribution'
import Success from './component/Success'
import Failed from './component/Failed'

function App() {

  //Declare useNavigate here not inside the handler function
  const navigate = useNavigate();
  
  function handleLogout() {
    console.log('gikan pani sa app.jsx na file gipasa')

    // When user logout He will navigate to Login page
    navigate('/')
  }


  return (
    <>
      <Routes>
        <Route path='/' element={ <Login/>}></Route>

        <Route path='/home' element={ <PrivateRoutes> <Home onLogout={handleLogout} /> </PrivateRoutes>}></Route>
        <Route path='/admin' element={ <PrivateRoutes> <AdminDashboard onLogout={handleLogout}/> </PrivateRoutes>}></Route>
        <Route path='/contribution' element={<PrivateRoutes><Contribution/></PrivateRoutes>}></Route>
        
        <Route path='/register' element={ <Register/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
        <Route path='/failed' element={<Failed/>}></Route>
      </Routes> 
    </>
  )
}

export default App
