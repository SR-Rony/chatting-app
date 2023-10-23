import React, { useEffect, useState } from 'react'
import './messageList.css'
import img from '../../assets/img.png'
import Images from '../images/Images'
import Paragraph from '../paragraph/Paragraph'
import bg from '../../assets/registration.png'
import ModalImage from "react-modal-image";
import {BsFillEmojiSmileFill} from 'react-icons/bs'
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, set,onValue  } from "firebase/database";

const MessageList = () => {
    const db = getDatabase();
    const [emoji,setEmoji]=useState(false)
    const [message,setMessage]=useState('')
    const active =useSelector(state=>(state.activeUser.value))
    const userInfo =useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
        const singChatRef = ref(db, 'singChat');
        onValue(singChatRef, (snapshot) => {
            snapshot.forEach((item)=>{
                if((userInfo.uid==item.val().sendId && active.activeChatId==item.val().reciveId) || (userInfo.uid==item.val().reciveId && active.activeChatId==item.val().sendId) ){
                    console.log('pfgr9t',item.val());
                    
                }
            })
        });
    },[])




    // send message button
    const handleMessage =()=>{
        if(active.type=='single'){
            set(push(ref(db, 'singChat')),{
                sendName:userInfo.displayName,
                sendId:userInfo.uid,
                reciveName:active.activeChatName,
                reciveId:active.activeChatId,
                sendMessage:message
              });
        }else{
            console.log('group');
        }
    }





  return (
    <div className='message-list'>
         <div className='profile'>
                <Images src={img}/>
                <Paragraph text={active.activeChatName}/>
            </div>
        <div className="messages">
            <div className='sendmsg'>
                <Paragraph text='goodmorning'/>
            </div>
            {/* <div className='receivmsg'>
                <Paragraph text='goodmorning'/>
            </div>
            <div className='sendmsg'>
                <div className='imgdiv'>
                    <ModalImage
                        small={bg}
                        large={bg}
                        alt="Hello World!"
                    />;
                </div>
            </div>
            <div className='receivmsg'>
                <div className='imgdiv'>
                    <ModalImage
                        small={bg}
                        large={bg}
                    />;
                </div>
            </div>
            <div className='sendmsg'>
                <audio controls></audio>
            </div>
            <div className='receivmsg'>
                <audio controls></audio>
            </div>
            <div className='sendmsg'>
                <video width="320" height="240" controls></video>
            </div>
            <div className='receivmsg'>
                <video width="320" height="240" controls></video>
            </div>
            */}
        </div>
        <div className="write-message">
            <div className="input">
                <input onChange={(e)=>setMessage(e.target.value)} type='text'  />
                <div onClick={()=>setEmoji(!emoji)} className="emoji">
                    <BsFillEmojiSmileFill/>
                    {emoji && <EmojiPicker />}
                </div>
            </div>
            <div className='button' onClick={handleMessage}>
                <BsFillEmojiSmileFill/>
            </div>
        </div>
    </div>
  )
}

export default MessageList