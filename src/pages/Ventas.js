import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  debounce,
} from "@mui/material";
import BasicModal from "../components/modal/VentasModal";
import { useDispatch, useSelector } from "react-redux";
import { allPedidos } from "../redux/thunk";
import { Pedidos } from "../components/Ventas_Section/Pedidos";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Ventas() {
  const dispatch = useDispatch();
  const pedido = useSelector((state) => state.pedidos);
  useEffect(() => {
    pedido?.pedidos?.data?.length <= 0 && dispatch(allPedidos());
  }, [pedido, dispatch]);
  const [page, setPage] = useState(0);
  const [searchName, setSearchName] = useState({ nombre: "" });
  const pedidosPerPage = 8;
  const limit = 2;
  let [fecha, setFecha] = useState();
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    dispatch(allPedidos(searchName, fecha));
    setPage(0);
    return () => {
      dispatch(allPedidos());
    };
  }, [searchName, fecha, dispatch]);
  const handleSearchChange = debounce((e) => {
    setSearchName({ [e.target.name]: e.target.value });
    setPage(0);
  }, 500);

  const handleCalendarChange = (newValue) => {
    setFecha(dayjs(newValue));
  };
  return (
    <Fade in={true} timeout={1000} appear={toString(false)}>
      <Grid>
        <Grid
          xs={12}
          item={true}
          width={"100%"}
          sx={{
            padding: "20px",
          }}
        >
          <Grid sx={{ display: "flex", gap: 2 }}>
            <Grid md={3} item>
              <BasicModal />
            </Grid>
            <Grid md={3} item>
              <TextField
                name="nombre"
                variant="standard"
                label="Buscar"
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid md={3} item>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select variant="standard" label="Estado">
                  <MenuItem>Completed</MenuItem>
                  <MenuItem>Processing</MenuItem>
                  <MenuItem>Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid md={3} item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  variant="standard"
                  views={["month", "day"]}
                  value={fecha}
                  onChange={(newValue) => handleCalendarChange(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={2}
          sm={6}
          md={12}
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {pedido?.pedidos?.data === "undefined" ? (
            <Alert variant="outlined" severity="error">
              <strong>No existen pedidos</strong>
            </Alert>
          ) : (
            <Box>
              {pedido?.pedidos?.msg === "no" ? (
                <Alert variant="outlined" severity="error">
                  <strong>{pedido.pedidos.data} </strong>
                </Alert>
              ) : (
                <Box width={"100%"}>
                  <Pedidos
                    pedido={pedido}
                    page={page}
                    pedidosPerPage={pedidosPerPage}
                    handleChange={handleChange}
                    limit={limit}
                  />
                </Box>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Fade>
  );
}

export default Ventas;
