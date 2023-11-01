import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createNewClient, getAllClients, getProducts } from "../../redux/thunk";
import {
  Alert,
  FormControl,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "60vh",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 2,
};

export default function ClientesModal() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const products = useSelector((state) => state.products);
  const [errors, setErrors] = React.useState({});

  const [titulo, setTitulo] = React.useState("Cargar Cliente");

  const [newClient2, setNewClient2] = React.useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    ciudad: "",
    pais: "",
    estado: "",
    direccion: "",
  });

  React.useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (newClient2.nombre.length < 2) {
        newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
      }
      if (newClient2.apellido.length < 2) {
        newErrors.apellido = "El apellido debe tener al menos 2 caracteres.";
      }
      if (newClient2.direccion.length < 5) {
        newErrors.direccion = "La dirección debe tener al menos 5 caracteres.";
      }
      if (newClient2.ciudad.length < 3) {
        newErrors.ciudad = "La ciudad debe tener al menos 3 caracteres.";
      }
      if (newClient2.pais.length < 2) {
        newErrors.pais = "El país debe tener al menos 2 caracteres.";
      }
      if (newClient2.estado.length < 2) {
        newErrors.estado = "El estado debe tener al menos 2 caracteres.";
      }
      if (newClient2.telefono.length < 5) {
        newErrors.telefono = "El teléfono debe tener al menos 5 caracteres.";
      }
      if (!/^\S+@\S+\.\S+$/.test(newClient2.email)) {
        newErrors.email = "El email no es válido.";
      }
      setErrors(newErrors);
    };
    validateForm();
  }, [newClient2]);

  const onClientChange2 = (e) => {
    setNewClient2((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (Object.values(errors).every((error) => !error)) {
      dispatch(createNewClient(newClient2));
      setNewClient2({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        ciudad: "",
        pais: "",
        estado: "",
        direccion: "",
      });
      setTitulo("Cargar Cliente");
      setOpen(false);
    } else {
      setTitulo(
        <Alert severity="error">Llena todos los campos para continuar</Alert>
      );
    }
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
        <Paper sx={style} elevation={8}>
          <Typography
            variant="h4"
            sx={{ position: "absolute", top: 10, fontWeight: "bold" }}
          >
            {titulo}
          </Typography>
          <FormGroup>
            <FormControl>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <TextField
                  required
                  error={errors.nombre && true}
                  sx={{ width: "100%" }}
                  name="nombre"
                  margin="normal"
                  label="Nombre"
                  variant="standard"
                  value={newClient2?.name}
                  onChange={onClientChange2}
                  helperText={errors.nombre}
                />
                <TextField
                  required
                  error={errors.apellido && true}
                  sx={{ width: "100%" }}
                  name="apellido"
                  margin="normal"
                  label="Apellido"
                  value={newClient2?.apellido}
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.apellido}
                />
              </Box>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <TextField
                  required
                  sx={{ width: "100%" }}
                  error={errors.direccion && true}
                  name="direccion"
                  value={newClient2?.direccion}
                  margin="normal"
                  label="Direccion"
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.direccion}
                />

                <TextField
                  required
                  error={errors.ciudad && true}
                  sx={{ width: "100%" }}
                  name="ciudad"
                  margin="normal"
                  label="Ciudad"
                  value={newClient2?.ciudad}
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.ciudad}
                />
              </Box>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <TextField
                  required
                  error={errors.estado && true}
                  sx={{ width: "100%" }}
                  name="estado"
                  value={newClient2?.estado}
                  margin="normal"
                  label="Provincia"
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.estado}
                />

                <TextField
                  required
                  error={errors.pais && true}
                  name="pais"
                  value={newClient2?.pais}
                  margin="normal"
                  label="Pais"
                  sx={{ width: "100%" }}
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.pais}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  required
                  error={errors.email && true}
                  name="email"
                  margin="normal"
                  label="Email"
                  value={newClient2?.email}
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.email}
                />
                <TextField
                  required
                  error={errors.telefono && true}
                  name="telefono"
                  margin="normal"
                  value={newClient2?.telefono}
                  label="Telefono"
                  variant="standard"
                  onChange={onClientChange2}
                  helperText={errors.telefono}
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
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="error"
            sx={{ position: "absolute", top: 10, right: 20 }}
          >
            X
          </Button>
        </Paper>
      </Modal>
    </>
  );
}
