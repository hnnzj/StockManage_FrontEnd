import React from "react";
import { LoginForm } from "../components/login/LoginForm";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

function Login() {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={9} md={2} sm={12}>
          <Paper
            elevation={5}
            sx={{
              padding: "40px",
              textAlign: "center",
            }}
            square={false}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Stock Management
            </Typography>
            <LoginForm />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
