import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  allPedidos,
  crearOrder,
  getAllClients,
  getProducts,
} from "../../redux/thunk";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "60px",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCliente("");
    setProductos([]);
  };

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const products = useSelector((state) => state.products);

  React.useEffect(() => {
    clients.clients.length <= 0 && dispatch(getAllClients());
    products.products.length <= 0 && dispatch(getProducts());
  }, []);
  const [productos, setProductos] = React.useState([]);

  const [cliente, setCliente] = React.useState("");

  const onSubmit = () => {
    const data = [...productos, cliente];
    dispatch(crearOrder(data));
    dispatch(allPedidos());
    handleClose();
  };

  const handleChangeClient = (event) => {
    setCliente(event.target.value);
  };

  const delProduct = (id) => {
    const newProducts = productos.filter((el) => el.id !== id);
    setProductos(newProducts);
  };

  const onQuatityChange = (id, e, index) => {
    setProductos((prevProduct) =>
      prevProduct.map((product) =>
        product.id === id
          ? { ...product, [e.target.name]: e.target.value }
          : product
      )
    );
  };

  const handleChangeProductos = (e) => {
    const productoscopy = [...productos, e.target.value];
    setProductos(productoscopy);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Cargar Pedido
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="client-label">Cliente</InputLabel>
                <Select
                  sx={{ width: "400px" }}
                  labelId="client-label"
                  onChange={handleChangeClient}
                  value={cliente}
                  label="Cliente"
                  autoWidth
                >
                  {clients.clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.nombre + " " + client.apellido}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Producto</InputLabel>
                <Select
                  sx={{ width: "400px" }}
                  onChange={handleChangeProductos}
                  label="Producto"
                  defaultValue=""
                >
                  {products.products.map((el) => (
                    <MenuItem key={el.title} name={el.title} value={el}>
                      {el.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TableContainer sx={{ overflowY: "scroll", maxHeight: 400 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Quitar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productos?.map((el, index) => (
                      <TableRow key={index}>
                        <TableCell>{el.title}</TableCell>
                        <TableCell>{el.price}</TableCell>
                        <TableCell>
                          <TextField
                            name="quantity"
                            onChange={(e) => onQuatityChange(el.id, e, index)}
                            sx={{ width: 60 }}
                          ></TextField>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => delProduct(el.id)}
                            variant="outlined"
                            color="error"
                            size="large"
                          >
                            X
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={onSubmit}
                variant="contained"
                color="success"
                size="large"
              >
                Cargar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
