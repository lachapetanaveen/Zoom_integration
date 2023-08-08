import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BookingCard = () => {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [email,setUserEmail]= useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic here
    if (!eventName.trim()) {
      toast.error('Enter Event Name');
    } else if (!email.trim()) {
      toast.error('Select Date');
    } else {
      console.log(eventName, email, 'datetimemerge');
      handleClose();
    }
  };

  return (
    
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Book
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            maxWidth: 400,
            borderRadius: 4,
          }}
        >
          <IconButton
            edge="end"
            backgroundcolor="inherit"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Bio-Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="User Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <TextField
              type="text"
              label="User Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Button  type="submit" variant="contained" color="primary" fullWidth>
              Book
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingCard;
