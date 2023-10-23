import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue, remove,push} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeUser } from '../../slices/activeUserSlice';


const Friend = () => {
    const db = getDatabase();
    const userInfo =useSelector(state=>state.loginSlice.value)
    const [friend,setFriend]=useState([])
    let dispatch=useDispatch()

    useEffect(()=>{
        ///////////////// firebase friend confrim data ///////////////////////
        const friendRef = ref(db, 'friendConfrim');
        onValue(friendRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().sendId || userInfo.uid==item.val().reciveId){
                    array.push({...item.val(),fdId:item.key})
                }
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
                remove(ref(db,'friendConfrim/'+item.fdId))
            })
        }else{
            set(push(ref(db, 'friendBlock')), {
                blockName:item.sendName,
                blockId:item.sendId,
                blockbyName:item.reciveName,
                blockbyId:item.reciveId
            }).then(()=>{
                remove(ref(db,'friendConfrim/'+item.fdId))
            })
        }
    }
    // handle active click
    const handleActive =(item)=>{
        if(userInfo.uid==item.reciveId){
            dispatch(activeUser({
                type:'single',
                activeChatId:item.sendId,
                activeChatName:item.sendName
            }))
        }else{
            dispatch(activeUser({
                type:'single',
                activeChatId:item.reciveId,
                activeChatName:item.reciveName
            }))
        }
        
    }


  return (
    <div className='box'>
        <Hadding text ='Friends'/>
        {friend.map((item)=>(
             <div className='list' onClick={()=>handleActive(item)}>
             <Images className='list-img' src={img} />
             <div className="text">
                 <Hadding text ={item.sendId==userInfo.uid ? item.reciveName :item.sendName}/>
             </div>
             <div className="flex">
                <Button className='btn' onClick={()=>handleBlock(item)} variant="contained" color='error'>block</Button>
             </div>
         </div>
        ))}
    </div>
  )
}

export default Friend