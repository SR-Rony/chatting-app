import React from 'react'
import './messageList.css'
import img from '../../assets/img.png'
import Images from '../images/Images'
import Paragraph from '../paragraph/Paragraph'
import bg from '../../assets/registration.png'
import ModalImage from "react-modal-image";

const MessageList = () => {
  return (
    <div className='message-list'>
        <div className='profile'>
            <Images src={img}/>
            <Paragraph text='SR Rony'/>
        </div>
        <div className='sendmsg'>
            <Paragraph text='goodmorning'/>
        </div>
        <div className='receivmsg'>
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
    </div>
  )
}

export default MessageList