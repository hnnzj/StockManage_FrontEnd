import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Divider, Pagination, Tooltip } from "@mui/material";
import UpdateModal from "./modal/UpdateModal";
import { delProduct } from "../redux/thunk/index.js";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Swal from "sweetalert2";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

function Invetory_Table({ products }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const productPerPage = 6;
  const limit = products?.products?.length / productPerPage;
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Quieres eliminar este producto?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Producto eliminado correctamente!", "", "success");
        dispatch(delProduct(id));
      } else if (result.isDenied) {
        Swal.fire("No se elimino el producto!", "", "warning");
      }
    });
  };

  return (
    <Box
      sx={{
        display: "Flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TableContainer>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Autor</TableCell>
              <TableCell align="center">Actualizar</TableCell>
              <TableCell align="center">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.products
              ?.slice(productPerPage * page, productPerPage * (page + 1))
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell align="center">
                    {product.image.length > 1 ? (
                      <img src={product.image} width={70} height={70} />
                    ) : (
                      <ImageNotSupportedIcon fontSize="large" />
                    )}
                  </TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">
                    {product.description.length > 0 ? (
                      <Tooltip title={product.description}>
                        {product.description.slice(0, 10)}...
                      </Tooltip>
                    ) : (
                      <HorizontalRuleIcon fontSize="large" />
                    )}
                  </TableCell>
                  <TableCell align="center">{product.autor}</TableCell>
                  <TableCell align="center">
                    <UpdateModal id={product.id} />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(product.id)}
                      color="error"
                    >
                      Borrar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ marginTop: "20px" }}
        onChange={handleChange}
        count={Math.ceil(limit)}
        size="large"
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}

export default Invetory_Table;
