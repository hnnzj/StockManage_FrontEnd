import {
  Badge,
  Button,
  Divider,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Box,
} from "@mui/material";
import React from "react";

export const Pedidos = ({
  pedido,
  handleChange,
  limit,
  page,
  pedidosPerPage,
}) => {
  return (
    <div>
      <TableContainer>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Pedido</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Factura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedido?.pedidos?.data
              ?.slice(pedidosPerPage * page, pedidosPerPage * (page + 1))
              .map((el) => {
                let aux = 0;
                const tabla = (
                  <TableRow key={el.id}>
                    <TableCell align="center">
                      {"N°" + el.id + " | Cliente: " + el.cliente}
                    </TableCell>
                    <TableCell align="center">
                      {el.productos.map((el) => {
                        let total = 0;
                        total += el.price * el.quantity;
                        aux += total;
                        return "$" + aux;
                      })}
                    </TableCell>
                    <TableCell align="center">{el.createdDate}</TableCell>
                    <TableCell align="center">
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
                    <TableCell align="center">
                      <Button variant="contained">Descargar Factura</Button>
                    </TableCell>
                  </TableRow>
                );
                return tabla;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          size="large"
          color="primary"
          shape="rounded"
          count={Math.ceil(limit)}
          onChange={handleChange}
          sx={{ marginTop: 1 }}
        />
      </Box>
    </div>
  );
};
