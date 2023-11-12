import React, { useEffect, useState } from 'react'
import './messageList.css'
import img from '../../assets/img.png'
import Images from '../images/Images'
import Paragraph from '../paragraph/Paragraph'
import bg from '../../assets/registration.png'
import ModalImage from "react-modal-image";
import {BsFillEmojiSmileFill,BsImages} from 'react-icons/bs'
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, set,onValue  } from "firebase/database";
import { getStorage, ref as imgref, uploadBytes,getDownloadURL} from "firebase/storage";
import moment from 'moment/moment'
import { Button } from '@mui/material'
import { AudioRecorder } from 'react-audio-voice-recorder';
import Hadding from '../hadding/Hadding'

const MessageList = () => {
    const db = getDatabase();
    const storage = getStorage();
    const [singlemessageLIst,setSingleMessageList]=useState([])
    const [groupMessageList,setGroupMessageList]=useState([])
    // const [blockbyid ,setBlockbyid]=useState('')
    const [emoji,setEmoji]=useState(false)
    // const [blockid,setBlockid]=useState([])
    const [sendMessage,setSendMessage]=useState('')
    // const [audio,setAudio]=useState('')
    const active =useSelector(state=>(state.activeUser.value))
    const userInfo =useSelector(state=>state.loginSlice.value)
    // audio message 
    const addAudioElement = (blob) => {
        // const url = URL.createObjectURL(blob);
        if(active.type=='single'){
            set(push(ref(db, 'singleChat')),{
                sendName:userInfo.displayName,
                sendId:userInfo.uid,
                reciveName:active.activeChatName,
                reciveId:active.activeChatId,
                audio:URL.createObjectURL(blob),
                date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
            })
        }
      };

    useEffect(()=>{
        const singleChatRef = ref(db, 'singleChat');
        onValue(singleChatRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if((userInfo.uid==item.val().sendId && active.activeChatId==item.val().reciveId) || (userInfo.uid==item.val().reciveId && active.activeChatId==item.val().sendId) ){
                    array.push(item.val())
                }
            })
            setSingleMessageList(array)
        });
        const groupChatRef = ref(db, 'groupChat');
        onValue(groupChatRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if((userInfo.uid==item.val().sendId && active.activeChatId==item.val().reciveId) || (userInfo.uid==item.val().reciveId && active.activeChatId==item.val().sendId) ){
                    array.push(item.val())
                }
            })
            setGroupMessageList(array)
        });
        /////friend block data/////////
        const friendBlockRef = ref(db, 'friendBlock');
        onValue(friendBlockRef, (snapshot) => {
            // let array =[]
            snapshot.forEach((item)=>{
                setBlockid(item.val().blockId)
                setBlockbyid(item.val().blockbyId)
            });
            // setBlockbyid(array)
        });
    },[active.activeChatId])

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
            }).then(()=>{
                setSendMessage('')
            })
        }else{
            set(push(ref(db, 'groupChat')),{
                sendName:userInfo.displayName,
                sendId:userInfo.uid,
                reciveName:active.activeChatName,
                reciveId:active.activeChatId,
                message:sendMessage,
                date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
            }).then(()=>{
                setSendMessage('')
            })
        }
    }
    // handle ing uplod
    const handleImgUplod =(e)=>{
        const storageRef = imgref(storage,e.target.files[0].name);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                if(active.type=='single'){
                    set(push(ref(db, 'singleChat')),{
                        sendName:userInfo.displayName,
                        sendId:userInfo.uid,
                        reciveName:active.activeChatName,
                        reciveId:active.activeChatId,
                        img:downloadURL,
                        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                    })
                }
              });
        });
    }

  return (
    <div className='message-list'>
         <div className='profile'>
                <Images src={img}/>
                <Paragraph text={active.activeChatName}/>
            </div>
        <div className="messages">
            {active.type=='single'
            ?singlemessageLIst.map(item=>(
                item.message
                ?
                    item.sendId==userInfo.uid
                    ?<div key={item.key} className='sendmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    :<div key={item.key} className='receivmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                :
                    item.img
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />;
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        :<div className='receivmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />;
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.audio
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        : <div className='receivmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.sendId==userInfo.uid
                    ?<div className='sendmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    : <div className='receivmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
            ))
            :groupMessageList.map(item=>(
                item.message
                ?
                    item.sendId==userInfo.uid
                    ?<div key={item.key} className='sendmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    :<div key={item.key} className='receivmsg'>
                        <Paragraph text={item.message}/>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                :
                    item.img
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />;
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        :<div className='receivmsg'>
                            <div className='imgdiv'>
                                <ModalImage
                                    small={item.img}
                                    large={item.img}
                                />;
                            </div>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.audio
                    ?
                        item.sendId==userInfo.uid
                        ?<div className='sendmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                        : <div className='receivmsg'>
                            <audio src={item.audio} controls></audio>
                            <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                        </div>
                    :item.sendId==userInfo.uid
                    ?<div className='sendmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                    : <div className='receivmsg'>
                        <video width="320" height="240" controls></video>
                        <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                )) 
            }
        </div>
        
        {/* {blockid.includes(active.activeChatId)&&blockbyid==userInfo.uid
        
        ?<Hadding className='user-block' text='user is block'/>

        :
        <div className="write-message">
        <div className="input">
            <input onChange={(e)=>setSendMessage(e.target.value)} type='text' value={sendMessage}  />
            <div className='emoji' >
                <BsFillEmojiSmileFill onClick={()=>setEmoji(!emoji)} />
                {emoji && <EmojiPicker onEmojiClick={(e)=>setSendMessage(sendMessage+e.emoji)} />}
            </div>
            <label>
                <input type="file" hidden onChange={handleImgUplod} accept="image/*" />
                <BsImages className='imgIcon'/>
            </label>
            <div className='audio'>
            <React.StrictMode>
                <AudioRecorder 
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }} 
                downloadOnSavePress={false}
                downloadFileExtension="webm"
                />
            </React.StrictMode>
            </div>
        </div>
        <button onClick={handleMessage} className='button'>send</button>
        </div>
        } */}
        
    <div className="write-message">
        <div className="input">
            <input onChange={(e)=>setSendMessage(e.target.value)} type='text' value={sendMessage}  />
            <div className='emoji' >
                <BsFillEmojiSmileFill onClick={()=>setEmoji(!emoji)} />
                {emoji && <EmojiPicker onEmojiClick={(e)=>setSendMessage(sendMessage+e.emoji)} />}
            </div>
            <label>
                <input type="file" hidden onChange={handleImgUplod} accept="image/*" />
                <BsImages className='imgIcon'/>
            </label>
            <div className='audio'>
            <React.StrictMode>
                <AudioRecorder 
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }} 
                downloadOnSavePress={false}
                downloadFileExtension="webm"
                />
            </React.StrictMode>
            </div>
        </div>
        <button onClick={handleMessage} className='button'>send</button>
        </div>
    </div>
  )
}

export default MessageList