import React, { useState } from 'react'
import './forget.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const ForgetPassword = () => {
    let navigate=useNavigate()
    const auth = getAuth();

    
    const [email,setEmail]=useState("")


    const handlPasswordChang =()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast("email send");
           navigate('/login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode.includes('auth')){
                toast("invalid email");
            }
        });
    }


  return (
    <div className='forget'>
        <div>
            <h1>forget password</h1>
                <TextField onChange={(e)=>setEmail(e.target.value)} type='email' id="outlined-basic" label="inter your email" variant="outlined" />
                <div>
                    <Button onClick={handlPasswordChang} variant="contained">Contained</Button>
                </div>
        </div>

    </div>
  )
}

export default ForgetPassword