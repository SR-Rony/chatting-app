import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

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

const MyGroups = () => {
    const[groupArray,setGroupArray]=useState([])
    const[groupRequest,setGeoupRequest]=useState([])
    const db = getDatabase();
    const userInfo =useSelector(state=>state.loginSlice.value)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () =>{
        setOpen(true)
        const groupRequestRef = ref(db, 'groupRequest' );
        onValue(groupRequestRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                    array.push(item.val())
            })
            setGeoupRequest(array)
        });
    }
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        const groupRef = ref(db, 'group' );
        onValue(groupRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(item.val().groupAdminId==userInfo.uid){
                    array.push(item.val())
                }
            })
            setGroupArray(array)
        });
    },[])

    // group member button
    const handleGroupMember =()=>{
        console.log('member');
    }

  return (
    <div className='box'>
        <Hadding text ='My Groups'/>

        {groupArray.map((group)=>(
            <div className='list'>
                <Images className='list-img' src={img} />
                <div className="text">
                    <Hadding text ={group.groupName}/>
                </div>
                <Button onClick={handleGroupMember} variant="contained">Ml</Button>
                <Button onClick={handleOpen}  variant="contained">Rl</Button>
                <Button color='error'  variant="contained">d</Button>
            </div>
        ))}



        {/* group request list  */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                people wants to join my group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {groupRequest.map((item)=>(
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={item.groupRequestName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                ))}
            </List>
            </Typography>
            </Box>
      </Modal>
    </div>
  )
}

export default MyGroups