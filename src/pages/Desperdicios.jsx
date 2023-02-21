import Select from "react-select";
import { customStyles } from "../css/Components";
import {
  getSelectOptions,
  insertDesperdicio,
  getDesperdicios,
} from "../db/database";
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";

let options = [];

getSelectOptions().then((res) => {
  res.forEach((r) => {
    r.label = r.cod_producto + " - " + r.nombre;
    r.value = r.id;
    options.push(r);
  });
});

export function Desperdicios() {
  const [selectedOption, setSelectedOption] = useState();
  const [desperdiciosList, setDesperdiciosList] = useState([]);
  const cantInput = useRef();
  const observacionesInput = useRef();

  function init() {
    setDesperdiciosList([]);
    getDesperdicios().then((res) => {
      res.forEach((el) => {
        setDesperdiciosList((current) => [
          ...current,
          <NewDesperdicio option={el}></NewDesperdicio>,
        ]);
      });
    });
  }

  useEffect(() => {
    init();
  }, []);

  const NewDesperdicio = ({ option }) => (
    <div className="desperdicio">
      <div className="desperdicio-remove">❌</div>
      <div className="desperdicio-code">{option.cod_producto}</div>
      <div className="desperdicio-product">{option.nombre}</div>
      <div className="desperdicio-quantity">{option.cantidad}</div>
      <div className="desperdicio-price">${option.precio}</div>
      <div className="desperdicio-observations">{option.observaciones}</div>
    </div>
  );

  return (
    <>
      <div className="desperdicios-header">
        <h2>Desperdicios</h2>
        <div className="desperdicios-insert-container">
          <Select
            placeholder={"Seleccionar Producto"}
            styles={customStyles}
            options={options}
            onChange={(choice) => {
              setSelectedOption(choice);
            }}
          />
          <input
            type="text"
            placeholder="Cantidad"
            className="desperdicios-insert-cantidad"
            ref={cantInput}
          />
          <textarea
            type="text"
            placeholder="Observaciones"
            className="desperdicios-insert-observaciones"
            ref={observacionesInput}
          ></textarea>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#FF9B00" }}
            onClick={() => {
              insertDesperdicio(
                selectedOption.id,
                cantInput.current.value,
                observacionesInput.current.value
              );
              init();
            }}
          >
            Añadir
          </Button>
        </div>
      </div>

      <div className="desperdicios-container">
        <div className="desperdicios-box-header">
          <div className="desperdicios-header-remove">-</div>
          <div className="desperdicios-header-code">Codigo</div>
          <div className="desperdicios-header-product">Producto</div>
          <div className="desperdicios-header-quantity">Cantidad</div>
          <div className="desperdicios-header-price">Precio</div>
          <div className="desperdicios-header-observations">Observaciones</div>
        </div>
        <div className="desperdicios-box">
          <div className="desperdicios-desperdicios">{desperdiciosList}</div>
        </div>
      </div>
    </>
  );
}
