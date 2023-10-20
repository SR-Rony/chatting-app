import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue,remove ,push } from "firebase/database";
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
    const[groupconfirmList,setGroupconfirmList]=useState([])
    const db = getDatabase();
    const userInfo =useSelector(state=>state.loginSlice.value)
    const [open, setOpen] = React.useState(false);
    const [openMember, setOpenMember] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleCloseMember=()=>setOpenMember(false);
    ////////////////////// group request modal open button //////////////////
    const handleRequestOpen = (gitem) =>{
        setOpen(true)
        const groupRequestRef = ref(db, 'groupRequest' );
        onValue(groupRequestRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().groupAdminId &&gitem.groupId==item.val().groupId){
                    array.push({...item.val(),requestId:item.key})
                }
            })
            setGeoupRequest(array)
        });
    }
    /////////////////////// group confirm modal open button ////////////////////////
    const handleConfirmOpen = (gitem) =>{
        setOpenMember(true)
        const groupRequestRef = ref(db, 'groupRequestConfirem' );
        onValue(groupRequestRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().groupAdminId &&gitem.groupId==item.val().groupId){
                    array.push({...item.val(),requestId:item.key})
                    console.log('group confirm',item.val());
                    }
            })
            setGroupconfirmList(array)
        });
    }
    //////////////////// firebase group information /////////////////////////
    useEffect(()=>{
        const groupRef = ref(db, 'group' );
        onValue(groupRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(item.val().groupAdminId==userInfo.uid){
                    array.push({...item.val(),groupId:item.key})
                }
            })
            setGroupArray(array)
        });
    },[])
    ///////////////////////// group delete button //////////////////
    const handleDelete =(id)=>{
        remove(ref(db,'group/'+id))
    }
    ////////////////// group joyn confriem button /////////////////
    const handleConfirm =(item)=>{
        console.log('confrem',item);
        set(push(ref(db, 'groupRequestConfirem')),{
            ...item
          }).then(()=>{
            remove(ref(db,'groupRequest/'+item.requestId))
          })
    }
    ///////////////////// group member cancel button /////////////////////2
    const handleCancel =(item)=>{
        remove(ref(db,'groupRequest/'+item.requestId))
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
                <div className="flex">
                <Button className='btn' onClick={()=>handleRequestOpen(group)}  variant="contained">Requst</Button>
                <Button className='btn' onClick={()=>handleConfirmOpen(group)} variant="contained">Member</Button>
                <Button className='btn' onClick={()=>handleDelete(group.groupId)} color='error'  variant="contained">delete</Button>
                </div>
            </div>
        ))}
        {/*///////////////////////// group request list modal  //////////////////*/}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                group request list
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
                             <div className="flex">
                                fgskdkjf
                                <Button className='btn' onClick={()=>handleConfirm(item)}  variant="contained">confirm</Button>
                                <Button className='btn' onClick={()=>handleCancel(item)}  color='error' variant="contained">cancel</Button>
                             </div>
                        </Typography>
                        </React.Fragment>
                    }
                    />
                </ListItem>
                ))}
            </List>
            </Typography>
            </Box>
      </Modal>
      {/*///////////////////////// group member list modal ////////////////////////*/}
      <Modal
            open={openMember}
            onClose={handleCloseMember}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                group request list
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {groupconfirmList.map((item)=>(
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
                             <div className="flex">
                                fgskdkjf
                                <Button className='btn'  color='error' variant="contained">remove</Button>
                             </div>
                        </Typography>
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