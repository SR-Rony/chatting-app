import React from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import { ToastContainer} from 'react-toastify';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forgetpassword/ForgetPassword';
import Layout from './components/root layout/Layout';
import Notification from './pages/notification/Notification';
import Messages from './pages/messages/Messages';


function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={<Registration/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forget' element={<ForgetPassword/>} />
        <Route path='/' element={<Layout/>}>
        <Route path='/home' element={<Home/>} />
          <Route path='/notifiction' element={<Notification/>}/>
          <Route path='/messages' element={<Messages/>}/>
        </Route>
      </Route>
    )
  );







  return (
    <>
       <RouterProvider router={router} />
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
    </>
  )
}

export default App
