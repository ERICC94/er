import { useState, useRef, useEffect } from "react";
import { getEspeciales } from "../db/database";
import { NewEspecial } from "./NewEspecial";

let especiales = [];

getEspeciales().then((res) => {
  especiales = res;
});

export function ListaEspeciales() {
  const [listaStock, setListaStock] = useState([]);
  const [listaVendida, setListaVendida] = useState([]);

  useEffect(() => {

      setListaStock([]);
      setListaVendida([]);
      getEspeciales().then((res) => {
          res.forEach((es) => {
            if (es.flagVendida == false) {
              setListaStock((current) => [
                ...current,
                <NewEspecial option={es}></NewEspecial>,
              ]);
            } else {
              setListaVendida((current) => [
                ...current,
                <NewEspecial option={es}></NewEspecial>,
              ]);
            }
          });
        })
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h4>En stock</h4>
        <div className="lespeciales-container">
          <div className="lespeciales-box-header">
            <div className="lespeciales-header-reserva">Nombre Reserva</div>
            <div className="lespeciales-header-date">Fecha</div>
            <div className="lespeciales-header-observations">Observaciones</div>
            <div className="lespeciales-header-price">Precio</div>
            <div className="lespeciales-header-detalles">Detalle</div>
          </div>
          <div className="lespeciales-box">{listaStock}</div>
        </div>
        <h4 style={{ marginTop: "30px" }}>Vendidas</h4>
        <div className="lespeciales-container">
          <div className="lespeciales-box-header">
            <div className="lespeciales-header-reserva">Nombre Reserva</div>
            <div className="lespeciales-header-date">Fecha</div>
            <div className="lespeciales-header-observations">Observaciones</div>
            <div className="lespeciales-header-price">Precio</div>
            <div className="lespeciales-header-detalles">Detalle</div>
          </div>
          <div className="lespeciales-box">{listaVendida}</div>
        </div>
      </div>
    </div>
  );
}
