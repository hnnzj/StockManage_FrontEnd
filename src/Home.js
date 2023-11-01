import React from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const register = () => {
    axios.post(`${process.env.API_URL}/api/register`, {
      username: "yowixd",
      email: "yowi@yowi.com",
      password: "241295",
    });
  };
  const login = async () => {
    const data = await axios.post(`${process.env.API_URL}/api/login`, {
      email: "yowi@yowi.com",
      password: "241295",
    });
    localStorage.setItem("token", data.data.token);
  };

  const test = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const data = await axios.get(`${process.env.API_URL}/api/`, config);
      navigate("/usuarios");
      localStorage.setItem("user", data.data.user_info.username);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="App">
      <button onClick={() => register()}>Registrarse</button>
      <button onClick={() => login()}>login</button>
      <button onClick={() => test()}>test</button>
    </div>
  );
}

export default Home;
