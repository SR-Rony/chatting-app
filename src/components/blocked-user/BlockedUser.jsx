import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';
import { getDatabase, ref,set, onValue, remove,push} from "firebase/database";
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
                if(userInfo.uid==item.val().reciveId){
                    array.push({...item.val(),'userId':item.key})
                    console.log(item.val());
                }
            })
            setBlock(array)
        });
    })






  return (
    <div className='box'>
        <Hadding text ='Blocked Users'/>
        {block.map((item)=>(
            <div className='list'>
                <Images className='list-img' src={img} />
                <div className="text">
                    <Hadding text ={item.sendName}/>
                </div>
                <Button variant="contained">uf</Button>
            </div>
        ))}
    </div>
  )
}

export default BlockedUser