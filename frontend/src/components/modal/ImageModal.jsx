import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { TextField, Typography } from '@mui/material';
export const ImageModal = ({openModal ,handleCloseModal,description ,setDescription,showEdit,dataa}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:200,  
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

      const updateImageDesc = async () => {
        await axios.put(`http://localhost:5000/uploadImageDesc/${showEdit}`, { "desc": description })
          .then(response => {
            if (response.data) {
              dataa();
            }
    
          })
          .catch(error => {
            console.error(error);
          });
      }
    

  return (
    <Modal
    open={openModal}
    onClose={handleCloseModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Image description
      </Typography>
      <TextField id="standard-basic" label="Add" variant="standard" value={description} onChange={(e) => {
        setDescription(e.target.value)
      }} />
      <Button onClick={() => {
        handleCloseModal(false);
        updateImageDesc()
      }}>Save</Button>
    </Box>
  </Modal>
  )
}
