import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as Sidebar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SellIcon from "@mui/icons-material/Sell";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Home } from "../../pages/Home";
import Ventas from "../../pages/Ventas";
import Clientes_section from "../clientes/Clientes_section";
import Products from "../../pages/Products";
function Drawer() {
  const [render, setRender] = useState(0);

  return (
    <>
      <Grid container>
        <Grid item md={2} sm={3} xs={3}>
          <Sidebar anchor={"left"} open={true} variant="permanent">
            <Box sx={{ width: "15vw" }}>
              <List>
                {["Home", "Ventas", "Clientes", "Productos"].map(
                  (text, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => setRender(index)}
                    >
                      <ListItemIcon>
                        {text === "Home" ? (
                          <HomeIcon />
                        ) : text === "Ventas" ? (
                          <SellIcon />
                        ) : text === "Clientes" ? (
                          <PersonAddIcon />
                        ) : (
                          <InventoryIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  )
                )}
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="LogOut" />
                </ListItemButton>
              </List>
            </Box>
          </Sidebar>
        </Grid>
        <Grid item xs={9} md={10} sm={9}>
          <Box sx={{ width: "100%", height: "100vh" }}>
            {render === 0 ? (
              <Home />
            ) : render === 1 ? (
              <Ventas />
            ) : render === 2 ? (
              <Clientes_section />
            ) : (
              <Products />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Drawer;
