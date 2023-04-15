import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import './ImageDisplayTab.css';
import Container from '@mui/material/Container';
import { experimentalStyled as styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Resizable from 're-resizable';
import Draggable from 'react-draggable';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import FormData from 'form-data'
import { TextField, Typography } from '@mui/material';
import { Buffer } from "buffer";
import Modal from '@mui/material/Modal';
import { ImageModal } from '../modal/ImageModal';
export const ImageDispalyTab = () => {
  const [images, setImages] = useState();
  const [allImages, setAllImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [linear, setLinear] = useState(false)
  const [skeleton, setSkeleton] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [description, setDescription] = useState();
  const [id, setId] = useState();
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

  let dataa = async () => {
    await axios
      .get("http://localhost:5000/images")
      .then((res) => {
        setAllImages(res.data);
        if (res.data) {
          setLinear(false);
          setSkeleton(false);
        }
      })
      .catch((err) => console.log(err, "it has an error"));
  }
  let uploadImage = async () => {
    if (images) {
      var form = new FormData();
      let desc = ''
      form.append('myImage', images);
      form.append('desc', desc);

      await axios.post('http://localhost:5000/uploadImage', form, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        }
      })
        .then((response) => {
          dataa();
          setLinear(true);
          setOpen(true);
          setImages()
        }).catch((error) => {
          console.log(error);
        });
    }
  }

  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setImages(fileUploaded);
    setOpen(false)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const inputHandleChange = (event) => {
    setDescription(event.target.value)
    console.log(event.target.value);
  }
  
  
  useEffect(() => {
    dataa();
  }, [])
  useEffect(() => {
    uploadImage()
  }, [images]);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }} >
        {linear &&
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>}
        <Box sx={{ bgcolor: '#EBEBE3', minHeight: '100vh', width: "100%" }} >
          <Button sx={{ width: "100%", m: 0, }} variant="contained" onClick={handleClick}>
            Upload file
          </Button>
          <input type="file" id="myImage" name="myImage"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }} />
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            style={{ color: "whitesmoke", backgroundColor: "#EBEBE3" }}
            message="uploading....."
          />
          {skeleton && <Skeleton style={{ backgroundColor: "lightgrey" }} variant="rectangular" sx={{ mt: 3, mx: 4 }} width={210} height={500} />}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="main">
            <div className='img-div'>
              {allImages.length > 0 && allImages?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item) => {
                let base64string = Buffer.from(item.img.data.data).toString("base64");
                const imageUrl = `data:image/png;base64,${base64string}`
                return (
                  <>                  <Draggable>
                    <Resizable
                      defaultSize={{
                        width: 200,
                        height: 170,
                      }}
                      onMouseOver={() => {
                        setId(item._id);

                      }}
                      onMouseLeave={() => {
                        setId("")
                      }}
                      style={{
                        background: `url(${imageUrl})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: "cover"
                      }}
                      className="resize"
                      lockAspectRatio={true}
                    >{id === item._id && <EditIcon style={{ color: "whitesmoke", cursor: "pointer" }} onClick={() => {
                      handleOpenModal(true);
                      setShowEdit(item._id)
                    }} />}
                      <div style={{ marginTop: "180px", height: "200px", overflow: "auto", padding: "4px" }}>{item.desc}</div>
                    </Resizable>
                  </Draggable>

                  </>
                );

              })}
            </div>
          </Grid>



        </Box>
        <ImageModal openModal={openModal} handleCloseModal={handleCloseModal} description={description} setDescription={setDescription} showEdit={showEdit} dataa={dataa} />

      </Container>
    </>
  )
}
