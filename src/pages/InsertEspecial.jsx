import { useState, useRef } from "react";
import Select from "react-select";
import { customStylesIntercambios } from "../css/Components";
import Button from "@mui/material/Button";
import { getInsumos, getProductos, confirmarEspecial } from "../db/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let optionsInsumos = [];
let optionsTortas = [];

getInsumos().then((res) => {
  res.forEach((r) => {
    r.label = r.nombre;
    r.value = r.id;
    optionsInsumos.push(r);
  });
});

getProductos().then((res) => {
  res.forEach((r) => {
    r.label = r.nombre;
    r.value = r.id;
    optionsTortas.push(r);
  });
});

export function InsertEspecial() {
  const productName = useRef();
  const [selectedTorta, setSelectedTorta] = useState();
  const [selectedInsumo, setSelectedInsumo] = useState();
  const [tortasList, setTortasList] = useState([]);
  const [insumosList, setInsumosList] = useState([]);
  const cantTorta = useRef();
  const cantInsumo = useRef();
  const obseravionesInput = useRef();
  const reservaInput = useRef();
  const precioInput = useRef();

  const NewTorta = ({ option }) => (
    <div className="especiales-torta">
      <div
        className="especiales-torta-remove"
        style={{ fontSize: "10px" }}
        onClick={() => removeProduct(option.id)}
      >
        ❌
      </div>
      <div className="especiales-torta-code">{option.cod_producto}</div>
      <div className="especiales-torta-product">{option.nombre}</div>
      <div className="especiales-torta-quantity">
        {(option.cantidad = cantTorta.current.value)}
      </div>
    </div>
  );

  const NewInsumo = ({ option }) => (
    <div className="especiales-torta">
      <div
        className="especiales-torta-remove"
        style={{ fontSize: "10px" }}
        onClick={() => removeProduct(option.id)}
      >
        ❌
      </div>
      <div className="especiales-torta-code">{option.cod_insumo}</div>
      <div className="especiales-torta-product">{option.nombre}</div>
      <div className="especiales-torta-quantity">
        {(option.cantidad = cantInsumo.current.value)}
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <h4 style={{ width: "80%" }}>Tortas</h4>
      </div>
      <div class="especiales-insert-container">
        <div className="especiales-insert">
          <div className="especiales-insert-product">
            <p>Torta</p>
            <Select
              options={optionsTortas}
              onChange={(choice) => {
                setSelectedTorta(choice);
              }}
              styles={customStylesIntercambios}
              placeholder={"Seleccionar Torta"}
            />
          </div>

          <div className="especiales-insert-quantity">
            <p>Cantidad</p>
            <input
              type="text"
              ref={cantTorta}
              placeholder="Cantidad"
              class="especiales-insert-name"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#ff9b00", height: "25px" }}
              onClick={() => {
                setTortasList((current) => [
                  ...current,
                  <NewTorta option={selectedTorta}></NewTorta>,
                ]);
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
      <div className="especiales-container">
        <div style={{ width: "80%" }}>
          <div className="especiales-box-header">
            <div className="especiales-header-remove">-</div>
            <div className="especiales-header-code">Codigo</div>
            <div className="especiales-header-product">Torta</div>
            <div className="especiales-header-quantity">Cantidad</div>
          </div>
          <div className="especiales-box">
            <div className="especiales-products">{tortasList}</div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "10px",
        }}
      >
        <h4 style={{ width: "80%" }}>Insumos</h4>
      </div>
      <div class="especiales-insert-container">
        <div className="especiales-insert">
          <div className="especiales-insert-product">
            <p>Insumo</p>
            <Select
              options={optionsInsumos}
              onChange={(choice) => {
                setSelectedInsumo(choice);
              }}
              styles={customStylesIntercambios}
              placeholder={"Seleccionar Insumo"}
            />
          </div>

          <div className="especiales-insert-quantity">
            <p>Cantidad</p>
            <input
              type="text"
              ref={cantInsumo}
              placeholder="Cantidad"
              class="especiales-insert-name"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#ff9b00", height: "25px" }}
              onClick={() => {
                setInsumosList((current) => [
                  ...current,
                  <NewInsumo option={selectedInsumo}></NewInsumo>,
                ]);
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
      <div className="especiales-container">
        <div style={{ width: "80%" }}>
          <div className="especiales-box-header">
            <div className="especiales-header-remove">-</div>
            <div className="especiales-header-code">Codigo</div>
            <div className="especiales-header-product">Insumo</div>
            <div className="especiales-header-quantity">Cantidad</div>
          </div>
          <div className="especiales-box">
            <div className="especiales-products">{insumosList}</div>
          </div>
        </div>
      </div>
      <div className="especiales-extras-container">
        <div className="especiales-extras">
          <div className="especiales-observations">
            <p>Observaciones</p>
            <textarea
              type="text"
              className="especiales-ta-observations"
              ref={obseravionesInput}
            ></textarea>
          </div>
          <div>
            <div className="especiales-total">
              <p>Nombre de la Reserva</p>
              <input className="especiales-reservas-input" ref={reservaInput} />
            </div>
            <div className="especiales-total" style={{justifyContent: "flex-end", marginTop: "10px"}}>
              <p>Precio</p>
              <input className="especiales-reservas-input" ref={precioInput} style={{width: "100px", marginLeft: "20px"}} />
            </div>
          </div>
        </div>
      </div>
      <div className="compras-confirm-menu">
        <Button
          className="compras-confirm-btn"
          variant="contained"
          size="small"
          style={{ backgroundColor: "#FF9B00" }}
          onClick={() => {
            confirmarEspecial(
              tortasList,
              insumosList,
              obseravionesInput.current.value,
              reservaInput.current.value,
              precioInput.current.value
            );
            toast.success("Venta realizada con exito!", { theme: "dark" });
          }}
        >
          Confirmar Torta Especial
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
