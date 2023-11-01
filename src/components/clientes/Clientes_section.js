import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Swal from "sweetalert2";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Divider, Fade, Grid, Pagination } from "@mui/material";
import ResponsiveAppBar from "../navbar/AppNavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewClient,
  deleteClient,
  getAllClients,
} from "../../redux/thunk";
import ClientesModal from "../modal/ClientesModal";

export default function Clientes_section() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  const [clientes, setClientes] = React.useState();

  const [newClient, setNewClient] = React.useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    ciudad: "",
    pais: "",
    estado: "",
    direccion: "",
  });

  const formSubmit = () => {
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
  };

  const onClientChange = (e) => {
    setNewClient((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Quieres eliminar este cliente?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cliente eliminado correctamente!", "", "success");
        dispatch(deleteClient(id));
      } else if (result.isDenied) {
        Swal.fire("No se elimino el cliente!", "", "warning");
      }
    });
  };

  React.useEffect(() => {
    clients.clients.length <= 0 && dispatch(getAllClients());
    setClientes(clients);
  }, [clients]);

  const [page, setPage] = React.useState(0);
  const client_per_page = 8;
  const limit = clients.clients.length / client_per_page;
  const handleChange = (event, value) => {
    setPage(value - 1);
  };
  return (
    <>
      <Fade in={true} timeout={1000} appear={toString(false)}>
        <Box>
          <Grid container>
            <Grid
              item
              xs={2}
              sm={2}
              md={12}
              sx={{ display: "flex", padding: "20px" }}
            >
              <ClientesModal
                onClientChange={onClientChange}
                formSubmit={formSubmit}
                newClient={newClient}
              />
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
              <TableContainer>
                <Divider />
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Nombre</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Telefono</TableCell>
                      <TableCell align="center">Direccion</TableCell>
                      <TableCell align="center">Ciudad</TableCell>
                      <TableCell align="center">Dar de baja</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientes?.clients
                      .slice(
                        client_per_page * page,
                        client_per_page * (page + 1)
                      )
                      .map((cliente) => (
                        <TableRow
                          key={cliente.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {cliente.nombre} {cliente.apellido}
                          </TableCell>
                          <TableCell align="center">{cliente.email}</TableCell>
                          <TableCell align="center">
                            {cliente.telefono}
                          </TableCell>
                          <TableCell align="center">
                            {cliente.direccion}
                          </TableCell>
                          <TableCell align="center">
                            {cliente.ciudad}{" "}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => handleDelete(cliente.id)}
                              variant="contained"
                              color="error"
                            >
                              BAJA
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(limit)}
                shape="rounded"
                onChange={handleChange}
                size="large"
                color="primary"
              />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </>
  );
}
