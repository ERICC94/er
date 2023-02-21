import Select from "react-select";
import { customStyles, customStylesMetodos } from "../css/Components";
import {
  getSelectOptions,
  getMetodosDePago,
  confirmarVenta,
  getEspecialesVentas,
  confirmarVentaEspecial,
} from "../db/database";
import { useEffect, useState, useRef } from "react";
import { useEmpleado, useUpdateEmpleado } from "../EmpleadoContext";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
let especiales = [];
let metodos = [];

getEspecialesVentas().then((res) => {
  res.forEach((r) => {
    r.label = r.nombre_reserva;
    r.value = r.id;
    especiales.push(r);
  });
});

getMetodosDePago().then((res) => {
  res.forEach((r) => {
    r.label = r.metodo;
    r.value = r.id;
    metodos.push(r);
  });
});

export function VentasEspeciales() {
  const [selectedOption, setSelectedOption] = useState("");
  const [productList, setProductList] = useState([]);
  const [metodoPago, setMetodoPago] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const cantInput = useRef();
  const [descuentoInput, setDescuentoInput] = useState(0);
  const [observaciones, setObservaciones] = useState();
  const selectedEmpleado = useEmpleado();

  useEffect(() => {
    setSubTotal(0);
    productList.forEach((el) => {
      setSubTotal((current) => current + parseFloat(el.props.option.precio));
    });
  }, [productList]);

  useEffect(() => {
    setTotal(subTotal - descuentoInput);
  });

  useEffect(() => {
    setInterval(() => {
      especiales = [];
      getEspecialesVentas().then((res) => {
        res.forEach((r) => {
          r.label = r.nombre_reserva;
          r.value = r.id;
          especiales.push(r);
        });
      });
    }, 1000);
  }, []);

  const removeProduct = (sentId) => {
    setProductList((current) =>
      current.filter((fruit) => fruit.props.option.id !== sentId)
    );
  };

  const NewProduct = ({ option }) => (
    <div className="ventas-product">
      <div
        className="ventas-product-remove"
        style={{ fontSize: "10px" }}
        onClick={() => removeProduct(option.id)}
      >
        ❌
      </div>
      <div className="ventas-product-code">-</div>
      <div className="ventas-product-product">{option.nombre_reserva}</div>
      <div className="ventas-product-quantity">1</div>
      <div className="ventas-product-price">${option.precio}</div>
      <div className="ventas-product-total">${option.precio}</div>
    </div>
  );
  return (
    <>
      <div className="ventas-menu-container">
        <div className="ventas-menu">
          <div className="ventas-inserts">
            <div className="ventas-product-input">
              <Select
                options={especiales}
                onChange={(choice) => {
                  setSelectedOption(choice);
                }}
                styles={customStyles}
                placeholder={"Seleccionar Especial"}
              />
            </div>
            <div className="especiales-cb" style={{ display: "flex" }}>
              <Checkbox
                size="small"
                onChange={(value) => console.log(value.target.checked)}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                Tortas Especiales
              </div>
            </div>
          </div>
          <div className="ventas-submit-product">
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#ff9b00" }}
              onClick={() => {
                setProductList((current) => [
                  ...current,
                  <NewProduct option={selectedOption}></NewProduct>,
                ]);
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>

      <div className="ventas-products-menu">
        <div className="ventas-main-table">
          <div className="ventas-table-row">
            <div className="ventas-title-remove">-</div>
            <div className="ventas-title-cod">COD</div>
            <div className="ventas-title-product">PRODUCTO</div>
            <div className="ventas-title-quantity">CANTIDAD</div>
            <div className="ventas-title-price">PRECIO</div>
            <div className="ventas-title-total">TOTAL</div>
          </div>
        </div>
        <div className="ventas-table-body">
          <div className="ventas-products">{productList}</div>
        </div>
        <div className="ventas-total-menu">
          <div className="ventas-container">
            <div className="ventas-extra">
              <div className="ventas-payment-method">
                <p>Metodo de Pago</p>
                <div className="ventas-payment-container">
                  <Select
                    options={metodos}
                    styles={customStylesMetodos}
                    placeholder="Metodo Pago"
                    onChange={(value) => {
                      setMetodoPago(value);
                    }}
                  />
                </div>
              </div>
              <div className="ventas-observations">
                <p>Observaciones</p>
                <textarea
                  type="text"
                  className="ventas-ta-observations"
                  onChange={(value) => setObservaciones(value)}
                ></textarea>
              </div>
            </div>
            <div className="ventas-total-container">
              <div className="ventas-subtotal">
                <p>SUBTOTAL</p>
                <div className="subtotal-price">${subTotal}</div>
              </div>
              <div className="ventas-discount">
                <p>DESCUENTO</p>
                <div style={{ fontSize: "13px" }}>
                  $
                  <input
                    style={{
                      width: "40px",
                      height: "15px",
                      textAlign: "right",
                      borderRadius: "3px",
                      border: "1px solid gray",
                    }}
                    onChange={(value) => setDescuentoInput(value.target.value)}
                  />
                </div>
              </div>
              <div className="ventas-total">
                <p>TOTAL</p>
                <div>${total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ventas-confirm-menu">
        <Button
          className="ventas-confirm-btn"
          variant="contained"
          size="small"
          style={{ backgroundColor: "#FF9B00" }}
          onClick={() => {
            confirmarVentaEspecial(productList);
            toast.success("Venta realizada con exito!", { theme: "dark" });
          }}
        >
          Confirmar Venta
        </Button>
      </div>
    </>
  );
}
