import React, { useState,useEffect } from 'react'
import './registration.css'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification,updateProfile  } from "firebase/auth";
import { getDatabase, ref, set,push } from "firebase/database";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';



const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
    const [user, setUser]=useState({fullName:'',email:'',password:''});
    let {fullName,email,password}=user
    const [nameError,setNameError]=useState("")
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    const [eyeToggle,serEyeToggle]=useState(true)
    const [dataLod,setDataLod]=useState(false)
    let navigete=useNavigate()
  ///////////////// user all data ///////////////////
    const data = useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
      if(data){
        navigete('/home')
      }
    },[])

    //////////////////// handle input change ///////////////
    const handleChange =(e)=>{
      setUser({ ...user,[e.target.name]:e.target.value });

      if(e.target.name=='fullName'){
        setNameError("");
      }
      if(e.target.name=='email'){
        setEmailError("");
      }
      if(e.target.name=='password'){
        setPasswordError("")
      }
    }
    ////////////////////////// sing in button ////////////////////////////
    const handleClick =()=>{
      if(!fullName){
        setNameError("plase inter your name")
      }
      if(!email){
        setEmailError("plase inter your email")
      }
      if(!password){
        setPasswordError("plase inter your password")
      }
      if(fullName && email && password){
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // let validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/; 
        //////////// valid email chack /////////////// 
        if(!validEmail.test(email)){
          setEmailError('invalid email')

        }else{
          //////////////// valid password chack ///////////////////
          // if(!validPassword.test(password)){
          //   setPasswordError('password not storng')
          // }else{
            setDataLod(true)
            ////////////// user authencation /////////////////
            createUserWithEmailAndPassword(auth, email, password)
            .then((user)=>{
              /////////////// user profile ///////////////
              updateProfile(auth.currentUser, {
                displayName: fullName, 
                photoURL: "https://firebasestorage.googleapis.com/v0/b/chating-app-5b953.appspot.com/o/rony.jpg?alt=media&token=d0a8339f-2dd5-4405-8720-4b9576c43f34"
              }).then(() => {
                ///////////////// email varify ////////////////////
                  sendEmailVerification(auth.currentUser)
                .then(() => {
                  setUser({fullName:'',email:'',password:''})
                  setDataLod(false)
                  toast("please chack your email");
                }).then(()=>{
                  set(ref(db, 'users/'+user.user.uid), {
                    username: fullName,
                    email: email,
                    profile_picture : "https://firebasestorage.googleapis.com/v0/b/chating-app-5b953.appspot.com/o/rony.jpg?alt=media&token=d0a8339f-2dd5-4405-8720-4b9576c43f34"
                  });
                })
              })
              setTimeout(()=>{
                navigete('/login')
              },1000)
            })
            // error
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if(errorCode.includes('auth/email-already-in-use')){
                toast("email alrady exisit");
              }
              setDataLod(false)
            });
          }
        // }
      }
    }

  return (
    <div className='registration'>
      <div className="main">
      <h2>get stared with easily <span>register</span></h2>
          <p>Free register and you can enjoy it</p>
          <TextField className='input' name='fullName' type='text' id="outlined-basic" label="full name" variant="outlined" onChange={handleChange} value={fullName}/>
          { nameError &&
            <Alert severity="error">{nameError}</Alert>
          }
          <TextField className='input' name='email' type='email' id="outlined-basic" label="email" variant="outlined" onChange={handleChange} value={email}/>
          {emailError&&
            <Alert severity="error">{emailError}</Alert>
          }
          <div className="password">
            <TextField className='input' name='password' type={eyeToggle?'password':'text'} id="outlined-basic" label="password" variant="outlined" onChange={handleChange} value={password}/>
            {
            eyeToggle
            ?<FaEyeSlash onClick={()=>serEyeToggle(false)} className='eye'/>
            : <FaEye onClick={()=>serEyeToggle(true)} className='eye'/>
            }
          </div>
          {passwordError&&
            <Alert severity="error">{passwordError}</Alert>
          }

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
          :<Button onClick={handleClick} className='btn' variant="contained">Sign in</    Button>
          }
          <p>Don't have an acount ? <Link className='focas' to='/login'>Sing In</Link></p>
      </div>
    </div>
  )
}

export default Registration