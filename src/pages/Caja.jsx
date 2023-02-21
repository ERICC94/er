import "../css/Caja.css";
import { useState, useEffect } from "react";
import { getCaja, getListaCaja } from "../db/database";

let response = [];

getCaja().then((res) => {
  response = [];
  res.forEach((r) => {
    response.push(r);
  });
});

export function Caja() {
  const [listaCaja, setListaCaja] = useState([]);

  const NewProduct = ({ option }) => (
    <div className="c-product">
      <div className="c-product-code">{option.cod_producto}</div>
      <div className="c-product-name">{option.nombre}</div>
      <div className="c-product-cant">{option.cantidad}</div>
      <div className="c-product-total">${option.total}</div>
    </div>
  );

  function init() {
    setListaCaja([]);
    getListaCaja().then((res) => {
      res.forEach((el) => {
        setListaCaja((current) => [
          ...current,
          <NewProduct option={el}></NewProduct>,
        ]);
      });
    });
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getCaja().then((res) => {
      response = [];
      res.forEach((r) => {
        response.push(r);
      });
    });
  });

  return (
    <div className="c-container">
      <div className="c-izq">
        <div className="c-caja">
          <div className="c-box-header">
            <div className="c-header-code bor">Codigo</div>
            <div className="c-header-name bor">Nombre</div>
            <div className="c-header-cant bor">Cantidad</div>
            <div className="c-header-total">Total</div>
          </div>
          <div className="c-box">
            <div className="c-products">{listaCaja}</div>
          </div>
        </div>
      </div>
      <div className="c-divider"></div>
      <div className="c-der">
        <div className="c-totales-cont">
          <div className="c-totales">
            <div className="c-title c-metodo">
              <div className="c-metodo c-name">Metodo de Pago</div>
              <div className="c-metodo c-value">Total</div>
            </div>
            <div className="c-title c-efectivo">
              <div className="c-efect c-name">Efectivo</div>
              <div className="c-efect c-value">
                ${response[0].efectivo || 0}
              </div>
            </div>
            <div className="c-title c-tarjeta">
              <div className="c-tarj c-name">Tarjeta</div>
              <div className="c-tarj c-value">${response[0].tarjeta || 0}</div>
            </div>
            <div className="c-title c-transferencia">
              <div className="c-transf c-name">Transferencia</div>
              <div className="c-transf c-value">
                ${response[0].transferencia || 0}
              </div>
            </div>
            <div className="c-title c-suma-metodos">
              <div className="c-suma-total">
                $
                {parseInt(
                  response[0].efectivo == null ? 0 : response[0].efectivo
                ) +
                  parseInt(
                    response[0].tarjeta == null ? 0 : response[0].tarjeta
                  ) +
                  parseInt(
                    response[0].transferencia == null
                      ? 0
                      : response[0].transferencia
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
