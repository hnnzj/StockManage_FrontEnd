import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usuarios from "./components/clientes/Clientes_section";
import Home from "./Home";
import { Home as AppHome } from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { ProtectedRoute } from "./components/protectedroutes/ProtectedRoute";
import Ventas from "./pages/Ventas";
import Drawer from "./components/drawer/Drawer";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute token={token} />}>
            <Route path="/app" element={<Drawer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
