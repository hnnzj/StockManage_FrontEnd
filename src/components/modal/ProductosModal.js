import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { crearProduct } from "../../redux/thunk";
import {
  FormControl,
  FormGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function ProductosModal(onClientChange, formSubmit, newClient) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const [products, setProducts] = React.useState({
    title: "",
    category: "",
    price: 0,
    image: "",
    quantity: 0,
    description: "",
    autor: "ADMIN",
  });

  const handleSubmit = () => {
    dispatch(crearProduct(products));
    setProducts({
      title: "",
      category: "",
      price: 0,
      image: "",
      quantity: 0,
      description: "",
      autor: "ADMIN",
    });
    handleClose();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setProducts((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Cargar Productos
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormGroup sx={{ width: "80%" }}>
            <FormControl>
              <TextField
                name="title"
                onChange={handleChange}
                value={products.title}
                margin="normal"
                label="Nombre"
                variant="outlined"
              />
              <TextField
                value={products.category}
                onChange={handleChange}
                name="category"
                margin="normal"
                label="Categoria"
                variant="outlined"
              />
              <TextField
                value={products.image}
                onChange={handleChange}
                name="image"
                margin="normal"
                label="Imagen"
                variant="outlined"
              />
              <TextField
                name="price"
                value={products.price}
                onChange={handleChange}
                margin="normal"
                label="Precio"
                variant="outlined"
              />
              <TextField
                value={products.quantity}
                onChange={handleChange}
                name="quantity"
                margin="normal"
                label="Cantidad"
                variant="outlined"
              />
              <TextField
                value={products.description}
                onChange={handleChange}
                name="description"
                margin="normal"
                label="Descripcion"
                variant="outlined"
              />
            </FormControl>
          </FormGroup>
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: "20px" }}
            variant="contained"
          >
            Agregar producto
          </Button>
        </Box>
      </Modal>
    </>
  );
}
