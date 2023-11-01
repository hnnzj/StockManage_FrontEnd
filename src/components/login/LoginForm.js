import {
  FormControl,
  InputAdornment,
  TextField,
  FormLabel,
  Button,
  Grid,
  Input,
  Box,
  Paper,
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
    dispatch(startLoggin(user));
    return navigate("/app");
  };

  return (
    <FormControl
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
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
    </FormControl>
  );
};
