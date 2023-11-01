import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Inventory_Table from "../components/Invetory_Table";
import { Alert, Fade, Grid, Pagination } from "@mui/material";
import { getProducts } from "../redux/thunk";
import ProductosModal from "../components/modal/ProductosModal";

function Products() {
  const products = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.products);
  const [productos, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    products?.products.length <= 0 && dispatch(getProducts());
    setProducts(products);
  }, [products]);

  return (
    <>
      <Fade in={true} timeout={1000} appear={toString(false)}>
        <Grid>
          <Grid
            xs={12}
            item
            sx={{
              display: "flex",
              alignItems: "left",
              padding: "20px",
            }}
          >
            <ProductosModal />
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <Alert severity="error">No hay productos cargados!</Alert>
            ) : (
              <>
                <Inventory_Table products={productos} />
              </>
            )}
          </Grid>
        </Grid>
      </Fade>
    </>
  );
}

export default Products;
