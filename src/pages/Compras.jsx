import { useRef, useState, useEffect } from "react";
import { getSelectOptions, confirmarCompra } from "../db/database";
import Select from "react-select";
import { customStyles } from "../css/Components";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let options = [];

getSelectOptions().then((res) => {
  res.forEach((r) => {
    r.label = r.cod_producto + " - " + r.nombre;
    r.value = r.id;
    options.push(r);
  });
});

export function Compras() {
  const [selectedOption, setSelectedOption] = useState();
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);
  const [observaciones, setObservaciones] = useState();

  const cantInput = useRef();

  useEffect(() => {
    setTotal(0);
    productList.forEach((el) => {
      setTotal((current) => current + el.props.option.total);
    });
  }, [productList]);

  const removeProduct = (sentId) => {
    setProductList((current) =>
      current.filter((fruit) => fruit.props.option.id !== sentId)
    );
  };

  const NewProduct = ({ option }) => (
    <div className="compras-product">
      <div
        className="compras-product-remove"
        style={{ fontSize: "10px" }}
        onClick={() => removeProduct(option.id)}
      >
        ❌
      </div>
      <div className="compras-product-code">{option.cod_producto}</div>
      <div className="compras-product-product">{option.nombre}</div>
      <div className="compras-product-quantity">
        {(option.cantidad = cantInput.current.value)}
      </div>
      <div className="compras-product-price">${option.precio}</div>
      <div className="compras-product-total">
        $
        {
          (option.total =
            parseFloat(option.cantidad) * parseFloat(option.precio))
        }
      </div>
    </div>
  );

  return (
    <>
      <h2>Nueva Compra</h2>
      <div className="compras-menu-container">
        <div className="compras-menu">
          <div className="compras-inserts">
            <div className="compras-product-input">
              <Select
                options={options}
                onChange={(choice) => {
                  setSelectedOption(choice);
                }}
                styles={customStyles}
                placeholder={"Seleccionar Producto"}
              />
            </div>
            <div className="compras-quantity-container">
              <input
                type="text"
                className="compras-quantity-input"
                placeholder="Cantidad"
                ref={cantInput}
              />
            </div>
          </div>
          <div className="compras-submit-product">
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#FF9B00" }}
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

      <div className="compras-products-menu">
        <div className="compras-main-table">
          <div className="compras-table-row">
            <div className="compras-title-remove">-</div>
            <div className="compras-title-cod">COD</div>
            <div className="compras-title-product">PRODUCTO</div>
            <div className="compras-title-quantity">CANTIDAD</div>
            <div className="compras-title-price">PRECIO</div>
            <div className="compras-title-total">TOTAL</div>
          </div>
        </div>
        <div className="compras-table-body">
          <div className="compras-products">{productList}</div>
        </div>
        <div className="compras-total-menu">
          <div className="compras-container">
            <div className="compras-extra">
              <div className="compras-observations">
                <p>Observaciones</p>
                <textarea
                  type="text"
                  className="compras-ta-observations"
                  onChange={(value) => setObservaciones(value)}
                ></textarea>
              </div>
            </div>
            <div className="compras-total-container">
              <div className="compras-total">
                <p>TOTAL</p>
                <div>${total}</div>
              </div>
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
            confirmarCompra(productList, observaciones);
            toast.success("Venta realizada con exito!", { theme: "dark" });
          }}
        >
          Confirmar Venta
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}

//Crear tabla compras con precio y total, terminar el confirmarCompra()
