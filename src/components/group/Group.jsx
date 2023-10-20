import React, { useEffect, useState } from 'react'
import Images from '../images/Images'
import Hadding from '../hadding/Hadding'
import Button from '@mui/material/Button';
import img from '../../assets/img.png'
import { getDatabase, ref,set, onValue,remove ,push } from "firebase/database";
import { useSelector } from 'react-redux';

const Group = () => {
    const db = getDatabase();
    const [group,setGroup]=useState([])

    const userInfo =useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
        let array=[]
        setGroup(array)
        const groupRef = ref(db, 'group' );
        onValue(groupRef, (snapshot) => {
            snapshot.forEach((item)=>{
                if(item.val().groupAdminId==userInfo.uid){
                    array.push({...item.val(),groupId:item.key})
                }
            })
        });
        //////////////// add group//////////////
        const groupRequestRef = ref(db, 'groupRequestConfirem' );
        onValue(groupRequestRef, (snapshot) => {
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().groupRequestId){
                    array.push(item.val())
                }
            })
        });

    },[])


  return (
    <div className='box'>
        <Hadding text ='My Groups'/>
        {group.map((item)=>(
            <div className='list'>
                <Images className='list-img' src={img} />
                <div className="text">
                    <Hadding text ={item.groupName}/>
                </div>
                {/* {item.groupRequestId==userInfo.uid
                    ?<div className="flex">
                        <Button className='btn' onClick={()=>handleRequestOpen(group)}  variant="contained">Requst</Button>
                        <Button className='btn' onClick={()=>handleConfirmOpen(group)} variant="contained">Member</Button>
                        <Button className='btn' onClick={()=>handleDelete(group.groupId)} color='error'  variant="contained">delete</Button>
                    </div>
                    :<Button className='btn' onClick={()=>handleGroupCancel(group)} color='error' variant="contained">cancel</Button>
                } */}
                <Button className='btn' variant="contained">join</Button>
            </div>
        ))}
    </div>
  )
}

export default Group