import React, { useState,useEffect } from 'react'
import './login.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link ,useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getDatabase,} from "firebase/database";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch } from 'react-redux';
import { userLogin } from '../../slices/loginSlice';


const Login = () => {
  // const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  let navigete=useNavigate()
  const [eyeToggle,serEyeToggle]=useState(true)
  const [user,setUser]=useState({email:'',password:''});
  let {email,password}=user
  const [emailError,setEmailError]=useState("")
  const [passwordError,setPasswordError]=useState("")
  const [dataLod,serDataLod]=useState(false)
  const dispatch = useDispatch()

  /////////////////user all data //////////////////
  const data = useSelector(state=>state.loginSlice.value)
  useEffect(()=>{
    if(data){
      navigete('/home')
    }
  },[])
/////////////// handle input change //////////////
  const handleChang=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
    if(e.target.name=='email'){
      setEmailError("")
    }
    if(e.target.name=='password'){
      setPasswordError("")
    }
  }
  /////////////////// handle google sing in button /////////////////////
  const handleGoogle =()=>{
    signInWithPopup(auth, provider).then((user)=>{
      navigete('/home')
      dispatch(userLogin(user.user));
      localStorage.setItem('user',JSON.stringify(user.user))
      updateProfile(auth.currentUser, {
        displayName: fullName, 
        photoURL: "https://firebasestorage.googleapis.com/v0/b/chating-app-5b953.appspot.com/o/rony.jpg?alt=media&token=d0a8339f-2dd5-4405-8720-4b9576c43f34"
      })
    })
  }
  //////////////////// handle login button ///////////////////
  const handleClick =()=>{
    if(!email){
      setEmailError("plase inter your email")
    }
    if(!password){
      setPasswordError("plase inter your password")

    }
    if(email && password){
      serDataLod(true)
      signInWithEmailAndPassword(auth, email, password).then((user)=>{
        if(user.user.emailVerified){
          dispatch(userLogin(user.user));
          navigete('/home')
          localStorage.setItem('user',JSON.stringify(user.user))
        }else{
          toast("plase varify your email");
        }
      serDataLod(false)

      }).catch((error) => {
        const errorCode = error.code;
        if(errorCode.includes('user')){
          toast("invalid email");
        }else{
          toast("invalid password");
        }
        serDataLod(false)
      });
    }

  }

  return (
    <div className='login'>
      <div className="main">
      <h2>Login</h2>
        <TextField className='input' name='email' type='email' id="standard-basic" label="inter your email" variant="standard" onChange={handleChang} value={email}/>
        {emailError &&
          <Alert severity="error">{emailError} !</Alert>
        }
        <div className="password">
        <TextField className='input' name='password' type={eyeToggle?'password':'text'} id="standard-basic" label="inter your password" variant="standard" onChange={handleChang} value={password}/>
        {
          eyeToggle
          ?<FaEyeSlash onClick={()=>serEyeToggle(false)} className='eye'/>
          : <FaEye onClick={()=>serEyeToggle(true)} className='eye'/>
        }
        </div>
        {passwordError &&
           <Alert severity="error">{passwordError} !</Alert>
        }
        <p><Link to='/forget'>forget Password</Link></p>
         {dataLod 
        ?<Button className='btn' variant="contained">
          <RotatingLines
            strokeColor="white"
            strokeWidth="3"
            animationDuration="0.75"
            width="30"
            visible={true}
          />
        </Button>
        :<Button size='small' color='success' onClick={handleClick} className='btn' variant="contained">Sign in</    Button>
        }
        <Button size='small' color='success' onClick={handleGoogle} className='btn' variant="contained">goole Sign in</Button>
        <p>Don't have an acount ? <Link className='focas' to='/'>Sing Up</Link></p>
      </div>
    </div>
  )
}

export default Login