import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  SwipeableDrawer,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { crearProduct } from "../../redux/thunk";
import { useDispatch, useSelector } from "react-redux";

function CreateProduct({ msg }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState({
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
      <FormGroup>
        <FormLabel>Agregar Producto</FormLabel>
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
          <TextareaAutosize
            minRows={5}
            value={products.description}
            onChange={handleChange}
            name="description"
            margin="normal"
            label="Descripcion"
            variant="outlined"
          />
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: "20px" }}
            variant="contained"
          >
            Crear
          </Button>
        </FormControl>
      </FormGroup>
    </>
  );
}

export default CreateProduct;
