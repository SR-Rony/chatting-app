import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paragraph from '../paragraph/Paragraph';
import TextField from '@mui/material/TextField';
import { getDatabase, push, ref, set,onValue, remove} from "firebase/database";
import { useSelector } from 'react-redux';
import './group-list.css'


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

const GroupList = () => {
    const db = getDatabase();
    const [group,setGroup]=useState({gname:'',gtitle:''})
    const [groupArray,setGroupArray]=useState([])
    const [groupId,setGroupID]=useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    ////////////////// user all information //////////////////
    const userInfo =useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
        const starCountRef = ref(db, 'group');
        onValue(starCountRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid!=item.val().groupAdminId){
                    array.push({...item.val(),groupId:item.key})
                    console.log('gid',item.val());
                }
            })
            setGroupArray(array)
        });
        /////////////////// group id ////////////////
        const groupRef = ref(db, 'groupRequest' );
        onValue(groupRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
              if(item.val().groupRequestId==userInfo.uid){
                array.push({...item.val(),gid:item.key})
              }
            })
            setGroupID(array)
        });
    },[])

    ////////////// group input change /////////////////////
    const handleChang =(e)=>{
        setGroup({...group,[e.target.name]:e.target.value})
    }

    //////////// add new group button/////////////////////
    const handleGroupAdd =()=>{
        set(push(ref(db, 'group')),{
            groupName: group.gname,
            groupTitle: group.gtitle,
            groupAdmin:userInfo.displayName,
            groupAdminId:userInfo.uid
          }).then(()=>{
            setOpen(false);
          })
    }

    ////////////////// user group join//////////////////////
    const handleGroupJoin =(group)=>{
        set(push(ref(db, 'groupRequest')),{
            ...group,
            groupRequestName:userInfo.displayName,
            groupRequestId:userInfo.uid
          })
    }

    ////////////////// group request cancle button //////////////
    const handleGroupCancel =(group)=>{
      groupId.map((item)=>{
        if(item.groupId==group.groupId&&item.groupRequestId){
          remove(ref(db,'groupRequest/'+item.gid))
        }
      })
    }

  return (
    <div className='box'>
        <div className="flex">
            <Hadding text ='Groups List'/>
            <Button className='btn' onClick={handleOpen} variant="contained">create group</Button>
        </div>
        {groupArray.map((group)=>(
             <div className='list'>
             <Images className='list-img' src={img} />
             <div className="text">
                 <Hadding text ={group.groupName}/>
             </div>
             {groupId.find((e)=>e.groupId==group.groupId)
              ?<Button className='btn' onClick={()=>handleGroupCancel(group)} color='error' variant="contained">cancel</Button>
              :<Button className='btn' onClick={()=>handleGroupJoin(group)} variant="contained">join</Button>
             }
            {/* <Button className='btn' onClick={()=>handleGroupJoin(group)} variant="contained">join</Button> */}

         </div>
        ))}
        {/*//////////////////////// create group modal ///////////////////*/}
        <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Hadding className='hadding' text='Create New Group'/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Paragraph  text='Group Name :'/>
            <TextField className='input' onChange={handleChang} name='gname'id="outlined-basic" label="group name" variant="outlined" />
            <Paragraph text='Group Title :'/>
            <TextField className='input' onChange={handleChang} name='gtitle' id="outlined-basic" label="group title" variant="outlined" />
          </Typography>
          <Button className='btn' onClick={handleGroupAdd} variant="contained">Add Group</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupList