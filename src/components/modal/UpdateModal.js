import {
  Box,
  Button,
  FormGroup,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function UpdateModal({ id }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button color="success" variant="contained" onClick={handleOpen}>
        Actualizar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Actualizar producto
          </Typography>
          <Grid>
            <FormGroup>
              <TextField margin="normal" label="Nombre" variant="outlined" />
              <TextField margin="normal" label="Precio" variant="outlined" />
              <TextField margin="normal" label="Cantidad" variant="outlined" />
              <Button
                variant="contained"
                margin="normal"
                onClick={() => handleClose()}
              >
                Actualizar
              </Button>
            </FormGroup>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default UpdateModal;
