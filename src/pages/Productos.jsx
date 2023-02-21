import "../css/Productos.css";
import {
  getTiposProductos,
  insertProducto,
  getProductos,
} from "../db/database";
import { useEffect, useState, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

let options = [];

getTiposProductos().then((res) => {
  res.forEach((r) => {
    r.label = r.tipo;
    r.value = r.id;
    options.push(r);
  });
});

export function Productos() {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const productCode = useRef();
  const productName = useRef();
  const productDescription = useRef();
  const productPrice = useRef();

  const NewProduct = ({ option }) => (
    <div className="products-product">
      <div className="products-product-remove">❌</div>
      <div className="products-product-code">{option.cod_producto}</div>
      <div className="products-product-product">{option.nombre}</div>
      <div className="products-product-type">{option.tipo}</div>
      <div className="products-product-description">{option.descripcion}</div>
      <div className="products-product-price">${option.precio}</div>
      <div className="products-product-insumos">{}</div>
    </div>
  );

  function init() {
    getProductos().then((res) => {
      setProductList([]);
      res.forEach((el) => {
        setProductList((current) => [...current, <NewProduct option={el} />]);
      });
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div class="products-insert-container">
        <div style={{ width: "8%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Codigo</p>
          <input
            type="text"
            placeholder="Codigo"
            class="products-insert-code"
            ref={productCode}
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ width: "20%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Nombre</p>
          <input
            type="text"
            ref={productName}
            placeholder="Nombre"
            class="products-insert-name"
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ width: "15%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Tipo</p>
          <Autocomplete
            id="combo-box-demo"
            options={options}
            size="small"
            onChange={(event, choice) => {
              setSelectedProduct(choice);
            }}
            placeholder="Tipo de Producto"
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" size="small" />
            )}
          />
        </div>
        <div style={{ width: "20%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Descripcion</p>
          <input
            type="text"
            ref={productDescription}
            placeholder="Descripcion"
            class="products-insert-description"
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ width: "10%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Precio</p>
          <input
            type="text"
            ref={productPrice}
            placeholder="Precio"
            class="products-insert-price"
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#ff9b00", height: "25px" }}
            onClick={() => {
              insertProducto(
                productCode.current.value,
                selectedProduct,
                productName.current.value,
                productDescription.current.value,
                productPrice.current.value
              );
              init();
            }}
          >
            Agregar
          </Button>
        </div>
      </div>
      <div className="products-container">
        <div className="products-box-header">
          <div className="products-header-remove">-</div>
          <div className="products-header-code">Codigo</div>
          <div className="products-header-product">Nombre</div>
          <div className="products-header-type">Tipo</div>
          <div className="products-header-description">Descripcion</div>
          <div className="products-header-price">Precio</div>
          <div className="products-header-insumos">Insumos</div>
        </div>
        <div className="products-box">
          <div className="products-products">{productList}</div>
        </div>
      </div>
    </>
  );
}
