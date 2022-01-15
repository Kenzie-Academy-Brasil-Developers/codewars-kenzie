import { UlStyle } from './style';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Profile from './../profile'

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

const DevCard = ({dev, position}) => {
  let color = "white"
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Profile user={dev} />
        </Box>
      </Modal>

    <UlStyle color={color} onClick={handleOpen}>
      <li>{position}</li>
      <li>{dev.name.length > 15
      ? dev.name.substring(0, 13) + '...'
      : dev.name
    }</li>
      <li>{dev.current_honor}</li>
    </UlStyle>
    </>
  )
}

export default DevCard;