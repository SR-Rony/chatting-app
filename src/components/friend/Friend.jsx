import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue, remove,push} from "firebase/database";
import { useSelector } from 'react-redux';


const Friend = () => {
    const db = getDatabase();
    const userInfo =useSelector(state=>state.loginSlice.value)
    const [friend,setFriend]=useState([])




    useEffect(()=>{
        // firebase friend request confrim
        const friendRef = ref(db, 'friendConfrim');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push({...item.val(),userId:item.key})
            })
            setFriend(array)
        });
    },[]);

    // handleunfriend button
    const handleBlock = (item) =>{
        set(push(ref(db, 'friendBlock')), {
            ...item
        }).then(()=>{
            remove(ref(db,'friendConfrim/'+item.userId))
        })
    }
  return (
    <div className='box'>
        <Hadding text ='Friends'/>
        {friend.map((item)=>(
             <div className='list'>
             <Images className='list-img' src={img} />
             <div className="text">
                 <Hadding text ={item.sendId==userInfo.uid ? item.reciveName :item.sendName}/>
             </div>
             <Button onClick={()=>handleBlock(item)} variant="contained" color='error'>block</Button>
         </div>
        ))}
    </div>
  )
}

export default Friend