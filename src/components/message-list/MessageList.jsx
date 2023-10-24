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
import moment from 'moment/moment'

const MessageList = () => {
    const db = getDatabase();
    const [messageLIst,setMessageList]=useState([])
    const [emoji,setEmoji]=useState(false)
    const [sendMessage,setSendMessage]=useState('')
    const active =useSelector(state=>(state.activeUser.value))
    const userInfo =useSelector(state=>state.loginSlice.value)

    useEffect(()=>{
        const singChatRef = ref(db, 'singleChat');
        onValue(singChatRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if((userInfo.uid==item.val().sendId && active.activeChatId==item.val().reciveId) || (userInfo.uid==item.val().reciveId && active.activeChatId==item.val().sendId) ){
                    array.push(item.val())
                }
            })
            setMessageList(array)
        });
    },[])




    // send message button
    const handleMessage =()=>{
        if(active.type=='single'){
            set(push(ref(db, 'singleChat')),{
                sendName:userInfo.displayName,
                sendId:userInfo.uid,
                reciveName:active.activeChatName,
                reciveId:active.activeChatId,
                message:sendMessage,
                date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
              });
        }
    }

  return (
    <div className='message-list'>
         <div className='profile'>
                <Images src={img}/>
                <Paragraph text={active.activeChatName}/>
            </div>
        <div className="messages">
            {messageLIst.map(item=>(
                item.sendId==userInfo.uid
                ?<div className='sendmsg'>
                    <Paragraph text={item.message}/>
                    <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                </div>
                :<div className='receivmsg'>
                    <Paragraph text={item.message}/>
                    <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                </div>
            ))}
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
                <input onChange={(e)=>setSendMessage(e.target.value)} type='text'  />
                <div onClick={()=>setEmoji(!emoji)} className="emoji">
                    <BsFillEmojiSmileFill/>
                    {emoji && <EmojiPicker />}
                </div>
            </div>
            <button onClick={handleMessage} className='button'>send</button>
            {/* <div className='button' onClick={handleMessage}>
            </div> */}
        </div>
    </div>
  )
}

export default MessageList