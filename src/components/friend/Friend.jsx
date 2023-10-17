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
        ///////////////// firebase friend confrim data ///////////////////////
        const friendRef = ref(db, 'friendConfrim');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push({...item.val(),userId:item.key})
            })
            setFriend(array)
        });
    },[]);

    ////////////////////// friend block button ///////////////////// 
    const handleBlock = (item) =>{
        if(userInfo.uid==item.sendId){
            set(push(ref(db, 'friendBlock')), {
                blockName:item.reciveName,
                blockId:item.reciveId,
                blockbyName:item.sendName,
                blockbyId:item.sendId
            }).then(()=>{
                remove(ref(db,'friendConfrim/'+item.userId))
            })
        }else{
            set(push(ref(db, 'friendBlock')), {
                blockName:item.sendName,
                blockId:item.sendId,
                blockbyName:item.reciveName,
                blockbyId:item.reciveId
            }).then(()=>{
                remove(ref(db,'friendConfrim/'+item.userId))
            })
        }
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
             <div className="flex">
                <Button className='btn' onClick={()=>handleBlock(item)} variant="contained">message</Button>
                <Button className='btn' onClick={()=>handleBlock(item)} variant="contained" color='error'>block</Button>
             </div>
         </div>
        ))}
    </div>
  )
}

export default Friend