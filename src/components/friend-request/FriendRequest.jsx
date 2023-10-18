import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue,push,remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    const [friendRequest,setFriendRequest]=useState([])
    ///////////////// user all info //////////////
    const userInfo =useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
        ////////////////// firebase friend request data ///////////////
        const friendReqRef = ref(db, 'friendRequest');
        onValue(friendReqRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().reciveId){
                    array.push({...item.val(),freqId:item.key})
                }
            })
            setFriendRequest(array)
        });
    },[])

////////////////// friend confrim button /////////////////
const handleConfrim =(item)=>{
    set(push(ref(db, 'friendConfrim')),{
        ...item
    }).then(()=>{
        remove(ref(db,'friendRequest/'+item.freqId));
    })
}
/////////////////// friend delete button /////////////////
const handleDelete =(freqId)=>{
   remove(ref(db,'friendRequest/'+freqId))
}

return (
    <div className='box'>
    <Hadding text ='Friend  Request'/>
        {friendRequest.map((item)=>(
            <div className='list'>
                <Images className='list-img' src={img} />
                <div className="text">
                    <Hadding text ={item.sendName}/>
                </div>
                <div className="flex">
                    <Button className='btn' onClick={()=>handleConfrim(item)} variant="contained">confrim</Button>
                    <Button className='btn' onClick={()=>handleDelete(item.freqId)} variant="contained" color='error'>delet</Button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default FriendRequest