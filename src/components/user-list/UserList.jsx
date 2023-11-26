import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set, push  } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const db = getDatabase();
    const [userArray,setUserArray]=useState([])
    const [friendReqId,setFriendReqId]=useState([])
    const [confrimFriendId,setConfrimFriendId]=useState([])
    const [friendBlockId,setFriendBlockId]=useState([])
    const [searchName,setSearchName]=useState([])
    const [inputValue,setInputValue]=useState('')
     ///////////// user info /////////////
     const userInfo =useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
        ///////////// firebase user info ///////////////
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid!=item.key){
                    array.push({...item.val(),userId:item.key})
                }
            })
            setUserArray(array)
        });
        ///////////////// firebase  friend request id ////////////////
        const friendReqRef = ref(db, 'friendRequest');
        onValue(friendReqRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push(item.val().reciveId+item.val().sendId)
            })
            setFriendReqId(array)
        });
        //////////////////// firebase friend request confrim id //////////////
        const friendRef = ref(db, 'friendConfrim');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push(item.val().reciveId+item.val().sendId)
            })
            setConfrimFriendId(array)
        });
        ///////////////// firebase friend block id ///////////////
        const friendBlockRef = ref(db, 'friendBlock');
        onValue(friendBlockRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push(item.val().blockId+item.val().blockbyId)
            })
            setFriendBlockId(array)
        });

    },[])

//////////////////// friend request button ////////////////
const handleFriendRequest =(user)=>{
    set(push(ref(db, 'friendRequest')), {
        sendName:userInfo.displayName,
        sendId:userInfo.uid,
        reciveName:user.username,
        reciveId:user.userId,
    });
}

// handleNameSearce
const handleNameSearce =(e)=>{
    let inputValue=e.target.value;
    let searchName = userArray.filter(item=>item.username.toLowerCase().includes(inputValue.toLowerCase()))
    setSearchName(searchName);
    setInputValue(inputValue)
}
  return (
    <div className='box'>
        <Hadding text ='User List'/>
        <input onChange={handleNameSearce} type="text" />

        {searchName.length>0
        ?
        searchName.map((user)=>(
            // inputValue.toLowerCase()==user.username.toLowerCase()
            // ?
            <div className='list'>
                <Images className='list-img' src={user.profile_picture} />
                <div className="text">
                    <Hadding text ={user.username}/>
                </div>
                {friendReqId.includes(user.userId+userInfo.uid) || friendReqId.includes(userInfo.uid+user.userId)
                ? <Button className='btn' variant="contained" color='error'>panding</Button>
                :confrimFriendId.includes(user.userId+userInfo.uid)||confrimFriendId.includes(userInfo.uid+user.userId)
                ?<Button className='btn' variant="contained" color='success'>friend</Button>
                :friendBlockId.includes(user.userId+userInfo.uid)||friendBlockId.includes(userInfo.uid+user.userId)
                ?<Button className='btn' variant="contained" color='error'>block</Button>
                :<Button className='btn' onClick={()=>handleFriendRequest(user)} variant="contained">F request</Button>
            }   
            </div>
            // :<p>no search found</p>
        ))
        : userArray.map((user)=>(
            <div className='list'>
                <Images className='list-img' src={user.profile_picture} />
                <div className="text">
                    <Hadding text ={user.username}/>
                </div>
                {friendReqId.includes(user.userId+userInfo.uid) || friendReqId.includes(userInfo.uid+user.userId)
                ? <Button className='btn' variant="contained" color='error'>panding</Button>
                :confrimFriendId.includes(user.userId+userInfo.uid)||confrimFriendId.includes(userInfo.uid+user.userId)
                ?<Button className='btn' variant="contained" color='success'>friend</Button>
                :friendBlockId.includes(user.userId+userInfo.uid)||friendBlockId.includes(userInfo.uid+user.userId)
                ?<Button className='btn' variant="contained" color='error'>block</Button>
                :<Button className='btn' onClick={()=>handleFriendRequest(user)} variant="contained">F request</Button>
            }   
            </div>
        ))
        }
    </div>
  )
}

export default UserList