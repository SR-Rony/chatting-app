import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set, push  } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const db = getDatabase();
    // redux user info
    const userInfo =useSelector(state=>state.loginSlice.value)
    // user array state
    const [userArray,setUserArray]=useState([])
    // friend request id state
    const [friendReqId,setFriendReqId]=useState([])
    const [confrimFriendId,setConfrimFriendId]=useState([])
    const [friendBlockId,setFriendBlockId]=useState([])

    useEffect(()=>{
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid!=item.key){
                    array.push({...item.val(),'userId':item.key})
                }
            })
            setUserArray(array)
        });
        // friend request id
        const friendReqRef = ref(db, 'friendRequest');
        onValue(friendReqRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push(item.val().reciveId+item.val().sendId)
            })
            setFriendReqId(array)
        });
        // firebase friend request confrim id
        const friendRef = ref(db, 'friendConfrim');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push(item.val().reciveId+item.val().sendId)
            })
            setConfrimFriendId(array)
        });
        // friend block id
        const friendBlockRef = ref(db, 'friendBlock');
        onValue(friendBlockRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push(item.val().blockId+item.val().blockbyId)
            })
            setFriendBlockId(array)
        });

    },[])
    // [friendReqId,userArray,confrimFriendId,friendBlockId]

// handle friend request button
const handleFriendRequest =(user)=>{
    set(push(ref(db, 'friendRequest')), {
        sendName:userInfo.displayName,
        sendId:userInfo.uid,
        reciveName:user.username,
        reciveId:user.userId,
      });
}

  return (
    <div className='box'>
        <Hadding text ='User List'/>
        {userArray.map((user)=>(
            <div className='list'>
                <Images className='list-img' src={user.profile_picture} />
                <div className="text">
                    <Hadding text ={user.username}/>
                </div>
                {friendReqId.includes(user.userId+userInfo.uid) || friendReqId.includes(userInfo.uid+user.userId)
                ? <Button variant="contained" color='error'>panding</Button>
                :confrimFriendId.includes(user.userId+userInfo.uid)||confrimFriendId.includes(userInfo.uid+user.userId)
                ?<Button variant="contained" color='success'>friend</Button>
                :friendBlockId.includes(user.userId+userInfo.uid)||friendBlockId.includes(userInfo.uid+user.userId)
                ?<Button variant="contained" color='error'>block</Button>
                :<Button onClick={()=>handleFriendRequest(user)} variant="contained">+</Button>
            }   
            </div>
        ))}
    </div>
  )
}

export default UserList