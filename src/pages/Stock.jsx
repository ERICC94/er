import React, { useState, useEffect } from "react";
import "../css/Stock.css";
import {
  getStock,
  insertAjuste,
  stockReal,
  getFlagStock,
} from "../db/database";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getTiposProductos } from "../db/database";

let tipos = [];
getTiposProductos().then((t) => {
  tipos = t;
});

export function Stock() {
  const [stockList, setStockList] = useState([]);
  const [tiposList, setTiposList] = useState([]);
  const [flagValue, setFlagValue] = useState([]);
  const input = useRef();

  useEffect(() => {
    getFlagStock().then((f) => {
      setFlagValue(f[0].valor);
    });
  }, []);

  function init() {
    getStock().then((t) => {
      setStockList([]);
      t.forEach((s) => {
        setStockList((current) => [
          ...current,
          <NewStock option={s}></NewStock>,
        ]);
      });
    });
  }

  useEffect(() => {
    init();
  }, [flagValue]);

  useEffect(() => {
    setTiposList([]);
    tipos.forEach((t) => {
      setTiposList((current) => [...current, <NewTipo tipo={t}></NewTipo>]);
    });
  }, [stockList, flagValue]);

  //Tengo que hacer un <NewStock> Por cada producto, ahora me esta mostrando 3 y deberian ser 4 porque hay 4 productos digamo

  const NewStock = ({ option }) => (
    <div className="s-product">
      <div className="s-product-code p-bor">{option.cod_producto}</div>
      <div className="s-product-name p-bor">{option.nombre}</div>
      <div className="s-product-stock p-bor">
        {flagValue == 0 ? option.stock : "-"}
      </div>
      <div className="s-product-compras p-bor">
        {flagValue == 0 ? option.compras : "-"}
      </div>
      <div className="s-product-ventas p-bor">
        {flagValue == 0 ? option.ventas : "-"}
      </div>
      <div className="s-product-intercambios p-bor">
        {flagValue == 0
          ? parseInt(option.ingresos) - parseInt(option.egresos)
          : "-"}
      </div>
      <div className="s-product-desperdicios p-bor">
        {flagValue == 0 ? option.desperdicios : "-"}
      </div>
      <div className="s-product-mix p-bor">
        {flagValue == 0
          ? option.tipo_producto == "3"
            ? option.mix_ingresos
            : option.mix_egresos
          : "-"}
      </div>
      <div className="s-product-ajuste p-bor" style={{ display: "flex" }}>
        <div
          disabled
          type="text"
          defaultValue={0}
          style={{
            backgroundColor: "rgb(240,240,240) ",
            border: "none",
            width: "20%",
            textAlign: "center",
          }}
        >
          {flagValue == 0 ? option.ajuste : "-"}
        </div>
        <button className="s-ajuste-btn"></button>
        <Popup
          trigger={<button className="stock-ajuste-button">±</button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> Ajustar Stock </div>
              <div className="content">
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div>Stock Real</div>
                  <input
                    type="number"
                    ref={input}
                    style={{ width: "40%", height: "80%", textAlign: "center" }}
                  />
                </div>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    insertAjuste(
                      option.id,
                      input.current.value - (option.actual - option.ajuste)
                    );
                    init();
                  }}
                  style={{
                    backgroundColor: "#ff7e3e",
                    height: "25px",
                  }}
                >
                  Confirmar Ajuste
                </Button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="s-product-actual">
        {flagValue == 0
          ? (option.actual =
              parseInt(option.stock) +
              parseInt(option.compras) -
              parseInt(option.ventas) +
              parseInt(option.ingresos) -
              parseInt(option.egresos) -
              parseInt(option.desperdicios) -
              parseInt(option.mix_egresos) +
              parseInt(option.ajuste))
          : option.stock}
      </div>
    </div>
  );

  const NewTipo = ({ tipo, stock }) => (
    <div class="s-container">
      <h4 style={{ marginBottom: "10px" }}>{tipo.tipo}</h4>
      <div class="s-box-header">
        <div class="s-header-code s-bor">Codigo</div>
        <div class="s-header-name s-bor">Nombre</div>
        <div class="s-header-stock s-bor">Stock</div>
        <div class="s-header-compras s-bor">Compras</div>
        <div class="s-header-ventas s-bor">Ventas</div>
        <div class="s-header-intercambios s-bor">Intercambios</div>
        <div class="s-header-desperdicios s-bor">Desperdicios</div>
        <div class="s-header-mix s-bor">Mix</div>
        <div class="s-header-ajuste s-bor">Ajuste</div>
        <div class="s-header-actual">Stock Final</div>
      </div>
      <div class="s-box">
        <div class="s-products">
          {stockList.filter(
            (product) => product.props.option.tipo_producto == tipo.id
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </div>
  );

  const Especiales = () => (
    <>
      <div class="s-container">
        <h4 style={{ marginBottom: "10px" }}>Especiales</h4>
        <div class="s-box-header">
          <div class="s-header-code s-bor">Codigo</div>
          <div class="s-header-name s-bor">Nombre</div>
          <div class="s-header-stock s-bor">Stock</div>
          <div class="s-header-compras s-bor">Compras</div>
          <div class="s-header-ventas s-bor">Ventas</div>
          <div class="s-header-intercambios s-bor">Intercambios</div>
          <div class="s-header-desperdicios s-bor">Desperdicios</div>
          <div class="s-header-mix s-bor">Mix</div>
          <div class="s-header-ajuste s-bor">Ajuste</div>
          <div class="s-header-actual">Stock Final</div>
        </div>
        <div class="s-box">
          <div class="s-products">{especialesList}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
    </>
  );

  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Stock Actual</h2>
      {tiposList}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: "#ff7e3e",
            height: "25px",
            marginTop: "50px",
          }}
          onClick={() => {
            stockList.forEach((stock) => {
              stockReal(stock.props.option.id, stock.props.option.actual);
            });
            init();
            setFlagValue((v) => (v == 0 ? 1 : 0));
          }}
        >
          {flagValue == 0 ? "Cerrar Stock" : "Abrir Stock"}
        </Button>
      </div>
    </>
  );
}
