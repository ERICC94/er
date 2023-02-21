import "../css/Productos.css";
import { getUnidades, getInsumos, insertInsumo } from "../db/database";
import { useEffect, useState, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


let unidades = [];

getUnidades().then((res) => {
  res.forEach((r) => {
    r.label = r.unidad;
    r.value = r.id;
    unidades.push(r);
  });
});

export function Insumos() {
  const [insumosList, setInsumosList] = useState([]);
  const [selectedUnidad, setSelectedUnidad] = useState([]);
  const insumoCode = useRef();
  const insumoName = useRef();
  const insumoDescription = useRef();
  const insumoPrice = useRef();
  function init() {
    getInsumos().then((res) => {
      setInsumosList([]);
      res.forEach((el) => {
        setInsumosList((current) => [...current, <NewInsumo option={el} />]);
      });
    });
  }

  useEffect(() => {
    init();
  }, []);

  const NewInsumo = ({ option }) => (
    <div className="products-product">
      <div className="products-product-remove">❌</div>
      <div className="products-product-code">{option.cod_insumo}</div>
      <div className="products-product-product">{option.nombre}</div>
      <div className="products-product-type">{option.unidad}</div>
      <div className="products-product-description">{option.descripcion}</div>
      <div className="products-product-price">${option.precio}</div>
    </div>
  );

  return (
    <>
      <div class="products-insert-container">
        <div style={{ width: "8%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Codigo</p>
          <input
            type="text"
            placeholder="Codigo"
            class="products-in products-insert-code"
            ref={insumoCode}
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ width: "20%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Insumo</p>
          <input
            type="text"
            ref={insumoName}
            placeholder="Nombre"
            class="products-in products-insert-name"
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ width: "20%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Descripcion</p>
          <input
            type="text"
            ref={insumoDescription}
            placeholder="Descripcion"
            class="products-in products-insert-description"
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>
        <div style={{ width: "15%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Unidad</p>
          <Autocomplete
            id="combo-box-insumo"
            options={unidades}
            size="small"
            onChange={(event, choice) => {
              setSelectedUnidad(choice);
            }}
            placeholder="Unidad"
            style={{ width: "100%" }}
            renderInput={(params) => (
              console.log(params),
              (<TextField {...params} variant="standard" size="small" />)
            )}
          />
        </div>
        <div style={{ width: "10%", position: "relative" }}>
          <p style={{ fontSize: "12px" }}>Precio</p>
          <input
            type="text"
            ref={insumoPrice}
            placeholder="Precio"
            class="products-in products-insert-price"
            style={{ width: "100%", position: "absolute", bottom: "0" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#FF9B00", height: "25px" }}
            onClick={() => {
              insertInsumo(
                parseInt(insumoCode.current.value),
                insumoName.current.value,
                selectedUnidad.id,
                insumoDescription.current.value,
                parseFloat(insumoPrice.current.value)
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
          <div className="products-header-type">Unidad</div>
          <div className="products-header-description">Descripcion</div>
          <div className="products-header-price">Precio</div>
        </div>
        <div className="products-box">
          <div className="products-products">{insumosList}</div>
        </div>
      </div>
    </>
  );
}
