import React,{useState,useEffect, useContext} from 'react';
import Form from './partials/logInSignUp/form';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard';
import { AuthContext } from './context/AuthContext';



function App() {
    const {user,setUser}=useContext(AuthContext);
    const navigate=useNavigate();
   useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      navigate('/login')
    }
   },[user])


  return (
<>
<ToastContainer />

        <Routes>
            <Route index path='*' element={<Dashboard user={user}/>} />
            <Route exact path="/login" element={<Form str={'Login'} setUser={setUser} />} />
            <Route exact path="/signup" element={<Form str={'Sign Up'} />} />
        </Routes>
        </>
  )
}

export default App