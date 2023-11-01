import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Usuarios() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  const user = localStorage.getItem("user");
  console.log(user);
  return (
    <div>
      usuarios
      <h2>Nombre: {user}</h2>
    </div>
  );
}

export default Usuarios;
