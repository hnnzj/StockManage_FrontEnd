import {
  FormControl,
  InputAdornment,
  TextField,
  FormLabel,
  Button,
  Grid,
  Input,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLoggin } from "../../redux/thunk";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitLogin = () => {
    console.log(user);
    dispatch(startLoggin(user));
    return navigate("/app");
  };

  return (
    <>
      <FormControl>
        <Grid marginBottom={2}>
          <FormLabel sx={{ fontSize: "25px", fontWeight: "bold" }}>
            Stock Management
          </FormLabel>
        </Grid>
        <TextField
          margin="normal"
          name="username"
          onChange={handleLoginChange}
          value={user.username}
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          margin="normal"
          name="password"
          onChange={handleLoginChange}
          value={user.password}
          label="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button onClick={submitLogin} variant="contained">
          Login
        </Button>
        <Grid marginTop={1} display={"flex"} gap={2}>
          <Grid item xs={0}>
            <Button variant="text" size="small" sx={{ fontWeight: "bold" }}>
              Registrarse
            </Button>
          </Grid>
          <Grid item xs={0}>
            <Button variant="text" size="small" sx={{ fontWeight: "bold" }}>
              Cambiar contraseña
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};
