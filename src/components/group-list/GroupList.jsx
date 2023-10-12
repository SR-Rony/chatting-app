import React from 'react'
import Hadding from '../hadding/Hadding'
import Images from '../images/Images'
import img from '../../assets/img.png'
import Button from '@mui/material/Button';

const GroupList = () => {
  return (
    <div className='box'>
        <Hadding text ='Groups List'/>
        <div className='list'>
            <Images className='list-img' src={img} />
            <div className="text">
                <Hadding text ='Friends Reunion'/>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">join</Button>
        </div>
        <div className='list'>
            <Images className='list-img' src={img} />
            <div className="text">
                <Hadding text ='Friends Reunion'/>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">join</Button>
        </div>
        <div className='list'>
            <Images className='list-img' src={img} />
            <div className="text">
                <Hadding text ='Friends Reunion'/>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">join</Button>
        </div>
        <div className='list'>
            <Images className='list-img' src={img} />
            <div className="text">
                <Hadding text ='Friends Reunion'/>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">join</Button>
        </div>
        <div className='list'>
            <Images className='list-img' src={img} />
            <div className="text">
                <Hadding text ='Friends Reunion'/>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">join</Button>
        </div>
    </div>
  )
}

export default GroupList