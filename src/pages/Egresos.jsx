import Select from "react-select";
import { useState, useRef } from "react";
import { getFranquicias, getSelectProduct, insertEgreso } from "../db/database";
import {
  customStylesIntercambios,
  customStylesMix,
  buttonStyles,
} from "../css/Components";
import Button from "@mui/material/Button";


let options = [];
let franquicias = [];

getFranquicias().then((res) => {
  res.forEach((r) => {
    r.label = r.nombre;
    r.value = r.id;
    franquicias.push(r);
  });
});

getSelectProduct().then((res) => {
  res.forEach((r) => {
    r.label = r.nombre;
    r.value = r.id;
    options.push(r);
  });
});

export function Egresos() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedFranq, setSelectedFranq] = useState();
  const cantInput = useRef();
  const observacionesInput = useRef();

  return (
    <>
      <div
        className="egresos-title"
        style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "50px" }}
      >
        Nuevo Egreso
      </div>
      <div style={{ display: "flex", gap: "30px", height: "55px"}}>
        <div style={{ width: "25%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <p>Franquicia</p>
          <Select
            styles={customStylesIntercambios}
            className="react-select-product"
            placeholder="Franquicia"
            options={franquicias}
            onChange={(choice) => {
              setSelectedFranq(choice);
            }}
          />
        </div>
        <div style={{ width: "22%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p>Producto</p>
          <Select
            styles={customStylesIntercambios}
            className="react-select-product"
            placeholder="Producto"
            options={options}
            onChange={(choice) => {
              setSelectedProduct(choice);
            }}
          />
        </div>
        <div style={{ width: "12%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p>Cantidad</p>
          <input
            type="text"
            placeholder="Cantidad"
            ref={cantInput}
            style={buttonStyles}
          />
        </div>
        <div style={{ width: "22%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p>Observaciones</p>
          <textarea
            type="text"
            placeholder="Observaciones"
            ref={observacionesInput}
            style={{height: "30px"}}
          ></textarea>
        </div>
        <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "flex-end", marginBottom: "7px"}}>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#FF9B00", height: "25px", display: "flex", justifyContent: "center"}}
            onClick={() => insertEgreso(selectedFranq.id, selectedProduct.id, cantInput.current.value, observacionesInput.current.value)}
          >
            Agregar
          </Button>
        </div>
      </div>
    </>
  );
}
