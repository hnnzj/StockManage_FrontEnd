import React from "react";
import { LoginForm } from "../components/login/LoginForm";
import { Box, Container, Grid } from "@mui/material";

function Login() {
  return (
    <>
      <Grid
        spacing={0}
        container
        justifyContent={"center"}
        alignItems={"center"}
        justify={"center"}
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={9} md={4} sm={6}>
          <Box border={2} padding={5} borderRadius={5}>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
