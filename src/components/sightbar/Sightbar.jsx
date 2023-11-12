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
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





const Sightbar = () => {
  const [url,setUrl]=useState("home");
  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Button  onClick={handleOpen}><Images className='sightbar-img' src={data.photoURL}/></Button>
        <Hadding text={data.displayName}/>
        <List>
            <ListItem className={url=="home" && 'active'} text={<Link className='link' to='/home'><AiFillHome onClick={()=>setUrl("home")} className='icon'/></Link>}/>
            <ListItem className={url=="messages" && 'active'} text={<Link className='link' to='messages'><AiFillMessage onClick={()=>setUrl("messages")}  className='icon'/></Link>}/>
            <ListItem className={url=="notifiction" && 'active'} text={<Link className='link' to='notifiction'><IoMdNotifications onClick={()=>setUrl("notifiction")} className='icon'/></Link>}/>
            <ListItem className={url=="setting" && 'active'} text={<AiFillSetting onClick={()=>setUrl("setting")} className='icon'/>}/>
            <ListItem className='' text={<AiOutlineLogout className='icon' onClick={handleLogout}/>}/>
        </List>
        {/* modal */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Hadding text='Images uplod'/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type="file" />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Sightbar