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
    ////////////////// user all info ////////////////
    const userInfo =useSelector(state=>state.loginSlice.value)
    
    useEffect(()=>{
        ////////////// firebase friend block data //////////////////
        const friendBlockRef = ref(db, 'friendBlock');
        onValue(friendBlockRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().blockbyId){
                    array.push({...item.val(),userId:item.key})
                }
            });
            setBlock(array)
        });
    },[])

    ////////////////// friend add button ///////////////////
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
                {item.block}
                <Button className='btn' onClick={()=>handleAddFriend(item)} color='error' variant="contained">unblock</Button>
            </div>
        ))}
    </div>
  )
}

export default BlockedUser