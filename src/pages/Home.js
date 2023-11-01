import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allPedidos, getProducts } from "../redux/thunk/index.js";
import { StadisticGraphic } from "../components/charts/StadisticGraphic";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export const Home = () => {
  let productos = useSelector((state) => state.products);
  let orders = useSelector((state) => state.pedidos);
  const dispatch = useDispatch();

  useEffect(() => {
    productos.products.length <= 0 && dispatch(getProducts());
    orders?.pedidos?.length <= 0 && dispatch(allPedidos());
  });

  let aux = [];
  let count = [];
  if (orders.pedidos.msg !== "no") {
    count = orders?.pedidos?.data?.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value.cliente]: (accumulator[value.cliente] || 0) + 1,
      };
    }, {});
  }

  for (const item in count) {
    aux.push([item, count[item]]);
  }
  aux = aux.sort(function (a, b) {
    return b[1] - a[1];
  });

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              marginTop: "37px",
              marginBottom: "-37px",
              width: "100%",
              marginLeft: "25px",
            }}
            elevation={4}
          >
            <StadisticGraphic />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table
              component={Paper}
              elevation={4}
              sx={{
                width: "35%",
                position: "fixed",
                top: 36,
                right: 50,
              }}
            >
              <TableHead>
                <Typography component="h1" variant="h6" marginTop={2}>
                  Ultimos pedidos
                </Typography>
                <TableRow>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="left">Fecha</TableCell>
                  <TableCell align="left">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.pedidos?.msg === "no" ? (
                  <h2>No hay pedidos</h2>
                ) : (
                  orders?.pedidos?.data
                    ?.toReversed()
                    .slice(0, 8)
                    .map((el) => {
                      let aux = 0;
                      const tabla = (
                        <TableRow key={el.id}>
                          <TableCell align="left">
                            {"N°" + el.id + " | " + el.cliente}
                          </TableCell>
                          <TableCell align="left">
                            {el.productos.map((el) => {
                              let total = 0;
                              total += el.price * el.quantity;
                              aux += total;
                              return (
                                <Chip
                                  key={el.title}
                                  icon={<PaidIcon />}
                                  color="success"
                                  label={aux}
                                  variant="outlined"
                                  sx={{ fontSize: "20px" }}
                                />
                              );
                            })}
                          </TableCell>
                          <TableCell width="30%" align="left">
                            {el.createdDate}
                          </TableCell>
                          <TableCell
                            sx={{ paddingRight: "60px" }}
                            align="center"
                          >
                            <Badge
                              variant="string"
                              badgeContent={el.status.toUpperCase()}
                              color={
                                el.status === "processing"
                                  ? "warning"
                                  : el.status === "success"
                                  ? "success"
                                  : "danger"
                              }
                              size="large"
                            />
                          </TableCell>
                        </TableRow>
                      );
                      return tabla;
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={6}>
          <TableContainer
            component={Paper}
            elevation={5}
            sx={{ marginLeft: 3, marginTop: 10 }}
          >
            <Table>
              <TableHead>
                <TableCell align="left">Perfil</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Pedidos</TableCell>
              </TableHead>
              <TableBody>
                {aux.slice(0, 5).map((el) => (
                  <TableRow key={el[0]}>
                    <TableCell align="center">
                      <Avatar>{el[0][0].toUpperCase()} </Avatar>
                    </TableCell>
                    <TableCell align="center">{el[0]}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <Badge badgeContent={el[1]} color="primary">
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
