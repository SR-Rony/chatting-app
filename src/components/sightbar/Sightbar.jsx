import React, { useState } from 'react'
import './sightbar.css'
import { useSelector,useDispatch } from 'react-redux';
import Images from '../images/Images';
import Hadding from '../hadding/Hadding';
import List from '../list/List'
import ListItem from '../list/ListItem'
import {AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {Link,useNavigate} from 'react-router-dom'
import { userLogin } from '../../slices/loginSlice';
import { getAuth, signOut } from "firebase/auth";

const Sightbar = () => {
  const [url,setUrl]=useState("home");
  const auth = getAuth();
  let navigete=useNavigate()
  const dispatch = useDispatch()

    const data =useSelector(state=>state.loginSlice.value)

  // user logout button
    const handleLogout =()=>{
      signOut(auth).then(() => {
        dispatch(userLogin(null));
        localStorage.removeItem('user')
        navigete('/login')
      })
    }

  return (
    <div className='sightbar'>
        <Images className='sightbar-img' src={data.photoURL}/>
        <Hadding text={data.displayName}/>
        <List>
            <ListItem className={url=="home" && 'active'} text={<Link className='link' to='/home'><AiFillHome onClick={()=>setUrl("home")} className='icon'/></Link>}/>
            <ListItem className={url=="messages" && 'active'} text={<Link className='link' to='messages'><AiFillMessage onClick={()=>setUrl("messages")}  className='icon'/></Link>}/>
            <ListItem className={url=="notifiction" && 'active'} text={<Link className='link' to='notifiction'><IoMdNotifications onClick={()=>setUrl("notifiction")} className='icon'/></Link>}/>
            <ListItem className={url=="setting" && 'active'} text={<AiFillSetting onClick={()=>setUrl("setting")} className='icon'/>}/>
            <ListItem className='' text={<AiOutlineLogout className='icon' onClick={handleLogout}/>}/>
        </List>
    </div>
  )
}

export default Sightbar