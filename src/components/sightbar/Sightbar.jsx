import React, { createRef, useState } from 'react'
import './sightbar.css'
import { useSelector,useDispatch } from 'react-redux';
import Images from '../images/Images';
import Hadding from '../hadding/Hadding';
import List from '../list/List'
import ListItem from '../list/ListItem'
import {AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {Link,useNavigate} from 'react-router-dom'
import { userLogin } from '../../slices/loginSlice';
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";



const Sightbar = () => {
  const [url,setUrl]=useState("home");
  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
// images cropper
const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  ////
  const auth = getAuth();
  let navigete=useNavigate()
  const dispatch = useDispatch()

    const data =useSelector(state=>state.loginSlice.value)

    // images cropper
    const handleImg = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };

  // user logout button
    const handleLogout =()=>{
      signOut(auth).then(() => {
        dispatch(userLogin(null));
        localStorage.removeItem('user')
        navigete('/login')
      })
    }

    // ///////////

    const getCropData = () => {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      }
    };


  return (
    <div className='sightbar'>
        <Button  onClick={handleOpen}><Images className='sightbar-img' src={data.photoURL}/></Button>
        <Hadding text={data.displayName}/>
        <List>
            <ListItem className={url=="home" && 'active'} text={<Link className='link' to='/home'><AiFillHome onClick={()=>setUrl("home")} className='icon'/></Link>}/>
            <ListItem className={url=="messages" && 'active'} text={<Link className='link' to='messages'><AiFillMessage onClick={()=>setUrl("messages")}  className='icon'/></Link>}/>
            <ListItem className={url=="notifiction" && 'active'} text={<Link className='link' to='notifiction'><IoMdNotifications onClick={()=>setUrl("notifiction")} className='icon'/></Link>}/>
            <ListItem className={url=="setting" && 'active'} text={<AiFillSetting onClick={()=>setUrl("setting")} className='icon'/>}/>
            <ListItem className='' text={<AiOutlineLogout className='icon' onClick={handleLogout}/>}/>
        </List>
        {/* modal */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Hadding text='Images uplod'/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input onChange={handleImg} type="file" />
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
            <div>
              <div className="croppbox" style={{ width: "50%", float: "right" }}>
                <h1>Preview</h1>
                <div
                  className="img-preview"
                  style={{ width: "100%", float: "left", height: "300px" }}
                />
              </div>
              <div
                className="croppbox"
                style={{ width: "50%", float: "right", height: "300px" }}
              >
                <h1>
                  <span>Crop</span>
                  <button style={{ float: "right" }} onClick={getCropData}>
                    Crop Image
                  </button>
                </h1>
                <img style={{ width: "100%" }} src={cropData} alt="cropped" />
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Sightbar