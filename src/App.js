import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/protectedroutes/ProtectedRoute";
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
