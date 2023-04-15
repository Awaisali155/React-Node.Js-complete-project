import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import './VideoDisplayTab.css'
import Container from '@mui/material/Container';
import { experimentalStyled as styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios"
import Typography from '@mui/material/Typography';
import FormData from 'form-data'
import { Buffer } from "buffer";
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Resizable from 're-resizable';
import Draggable from 'react-draggable';
import { VideoModal } from '../modal/VideoModal';
export const VedioDisplayTab = () => {
  const [editIconToggle, setEditIconToogle] = useState(false);
  const [id,setId]=useState();
  const [allVedios, setAllVedios] = useState([])
  const [vedio, setVedio] = useState();
  const [open, setOpen] = useState(false);
  const [linear, setLinear] = useState(false)
  const [skeleton, setSkeleton] = useState(true)
  const [videoId, setVideoId] = useState()
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  
  const handleCloseModal = () => setOpenModal(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  let dataa = async() => {
  await  axios
      .get("http://localhost:5000/vedios")
      .then((res) => {
        setAllVedios(res.data)
        setLinear(false);
        setSkeleton(false);
        setVedio()
      }
      )
      .catch((err) => console.log(err, "it has an error"));
  }
  let uploadVedio = async () => {
    var form = new FormData();
    if (vedio) {
    form.append('vedio', vedio);
    form.append('desc', "");
    await axios.post('http://localhost:5000/uploadVedio', form, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      }
    })
      .then((response) => {
         dataa();
        setOpen(true);
        setLinear(true);
        setVedio()
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  const hiddenFileInput = useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setVedio(fileUploaded)
    setOpen(false)
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dataa();
  }, [])
  useEffect(() => {
   uploadVedio()
  }, [vedio])
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}   >
      {linear &&
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}
      <Box sx={{ bgcolor: '#EBEBE3', minHeight: '100vh', width: "100%" }} >
        <Button sx={{ width: "100%", m: 0, }} variant="contained" onClick={handleClick}>
          chose a file
        </Button>
        <input type="file" id="vedio" name="vedio"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }} />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          style={{ color: "whitesmoke", backgroundColor: "#EBEBE3" }}
          message="Uploading...."
        />
      
          {skeleton && <Skeleton style={{ backgroundColor: "lightgrey" }} variant="rectangular" sx={{ mt: 3, mx: 4 }} width={210} height={500} />}
          <div className='video-div'>
            {allVedios.length > 0 && allVedios?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, index) => {
            let base64string = Buffer.from(item.vedio.data.data).toString("base64");
            const vedioURL = `data:image/png;base64,${base64string}`
            return (
              <Draggable>
              <Resizable
                defaultSize={{
                  width: "30%",
                  height: "60%",
                }}
                onMouseOver={() => {
                  setId(item._id);
                }}
                onMouseLeave={() => {
                  setId("")
                }}
                style={{
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize:"cover",
                }}
                lockAspectRatio={true}
              >
                <div style={{height:"100%"}}>
                  <div style={{height:"15%"}}>
                {id ===item._id && <EditIcon style={{color:"blue",cursor:"pointer"}} onClick={() => {
                handleOpenModal(true)
                setVideoId(item._id)
              }} />}
             </div>
             <div style={{height:"100%"}}>
              <video className='video' controls preload="none" >
                       <source src={vedioURL} type="video/mp4" />
                    </video>
                    </div>
                    </div>
                    <div className='desc-div'>{item.desc}</div>
                    </Resizable>
            </Draggable>
            )
          })} 
          </div>
      </Box>
      <VideoModal openModal={openModal} handleCloseModal={handleCloseModal} videoId={videoId}  dataa={dataa}/>
    </Container>
  )
}
