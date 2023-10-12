import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue,push,remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    const userInfo =useSelector(state=>state.loginSlice.value)
    const [friendRequest,setFriendRequest]=useState([])

    useEffect(()=>{
        // firebase friend request
        const friendReqRef = ref(db, 'friendRequest');
        onValue(friendReqRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().reciveId){
                    array.push({...item.val(),'userId':item.key})
                }
            })
            setFriendRequest(array)
        });
        // friendRequest confrim


    },[])

// friend confrim button
const handleConfrim =(confrim)=>{
        set(push(ref(db, 'friendConfrim')), {
            ...confrim
        }).then(()=>{
            remove(ref(db,'friendRequest/'+confrim.userId))
        })
}
// friend delete button
const handleDelete =(userId)=>{
   remove(ref(db,'friendRequest/'+userId))
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
                <Button className='btn' onClick={()=>handleConfrim(item)} variant="contained">confrim</Button>
                <Button onClick={()=>handleDelete(item.userId)} variant="contained" color='error'>delet</Button>
            </div>
        ))}
    </div>



  )
}

export default FriendRequest