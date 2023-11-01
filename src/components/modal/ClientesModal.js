import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createNewClient, getAllClients, getProducts } from "../../redux/thunk";
import { FormControl, FormGroup, FormLabel, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function ClientesModal({
  onClientChange,
  newClient,
  setNewClient,
}) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const products = useSelector((state) => state.products);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(createNewClient(newClient));
    setNewClient({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      ciudad: "",
      pais: "",
      estado: "",
      direccion: "",
    });
    setOpen(false);
  };

  React.useEffect(() => {
    clients?.clients?.length <= 0 && dispatch(getAllClients());
    products.products.length <= 0 && dispatch(getProducts());
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Cargar Cliente
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormGroup>
            <FormControl>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <TextField
                  sx={{ width: "100%" }}
                  name="nombre"
                  margin="normal"
                  label="Nombre"
                  variant="outlined"
                  value={newClient?.nombre}
                  onChange={onClientChange}
                />
                <TextField
                  sx={{ width: "100%" }}
                  name="apellido"
                  margin="normal"
                  label="Apellido"
                  value={newClient?.apellido}
                  variant="outlined"
                  onChange={onClientChange}
                />
              </Box>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <TextField
                  sx={{ width: "100%" }}
                  name="direccion"
                  value={newClient?.direccion}
                  margin="normal"
                  label="Direccion"
                  variant="outlined"
                  onChange={onClientChange}
                />
                <TextField
                  sx={{ width: "100%" }}
                  name="ciudad"
                  margin="normal"
                  label="Ciudad"
                  value={newClient?.ciudad}
                  variant="outlined"
                  onChange={onClientChange}
                />
              </Box>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <TextField
                  sx={{ width: "100%" }}
                  name="estado"
                  value={newClient?.estado}
                  margin="normal"
                  label="Provincia"
                  variant="outlined"
                  onChange={onClientChange}
                />

                <TextField
                  name="pais"
                  value={newClient?.pais}
                  margin="normal"
                  label="Pais"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  onChange={onClientChange}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  name="email"
                  margin="normal"
                  label="Email"
                  value={newClient?.email}
                  variant="outlined"
                  onChange={onClientChange}
                />
                <TextField
                  name="telefono"
                  margin="normal"
                  value={newClient?.telefono}
                  label="Telefono"
                  variant="outlined"
                  onChange={onClientChange}
                />
              </Box>
            </FormControl>
          </FormGroup>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ marginTop: "20px" }}
          >
            Agregar cliente
          </Button>
        </Box>
      </Modal>
    </>
  );
}
