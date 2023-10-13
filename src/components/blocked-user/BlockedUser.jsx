import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue,push,remove} from "firebase/database";
import { useSelector } from 'react-redux';


const BlockedUser = () => {
    const db = getDatabase();
    const [block,setBlock]=useState([])
    const userInfo =useSelector(state=>state.loginSlice.value)
    
    useEffect(()=>{
        const friendBlockRef = ref(db, 'friendBlock');
        onValue(friendBlockRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().blockbyId)
                array.push({...item.val(),userId:item.key})
            });
            setBlock(array)
        });
    },[])

    // handle add firend
    const handleAddFriend =(item)=>{
       console.log(item);
       set(push(ref(db, 'friendConfrim')),{
            reciveName:item.blockbyName,
            reciveId:item.blockbyId,
            sendName:item.blockName,
            sendId:item.blockId ,
        }).then(()=>{
            remove(ref(db,'friendBlock/'+item.userId));
        })
    }

  return (
    <div className='box'>
        <Hadding text ='Blocked Users'/>
        {block.map((item)=>(
            <div className='list'>
                <Images className='list-img' src={img} />
                <div className="text">
                    <Hadding text ={item.blockName}/>
                </div>
                <Button onClick={()=>handleAddFriend(item)} variant="contained">+</Button>
            </div>
        ))}
    </div>
  )
}

export default BlockedUser