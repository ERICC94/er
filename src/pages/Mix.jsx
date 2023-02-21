import "../css/Mix.css";
import Select from "react-select";
import { customStylesMix } from "../css/Components";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";
import { getSelectProduct, insertMix, getSelectMix } from "../db/database";

let options = [];
let mixOptions = [];

getSelectProduct().then((res) => {
  res.forEach((r) => {
    r.label = r.cod_producto + " - " + r.nombre;
    r.value = r.id;
    options.push(r);
  });
});

getSelectMix().then((res) => {
  res.forEach((r) => {
    r.label = r.cod_producto + " - " + r.nombre;
    r.value = r.id;
    mixOptions.push(r);
  });
});


export function Mix() {
  const [productList, setProductList] = useState([]);
  const [mixList, setMixList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedMix, setSelectedMix] = useState();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalMixs, setTotalMixs] = useState(0);
  const cantInputProduct = useRef();
  const cantInputMix = useRef();

  useEffect(() => {
    setTotalProducts(0);
    productList.forEach((el) => {
      setTotalProducts((current) => current + el.props.option.total);
    });
  }, [productList]);

  useEffect(() => {
    setTotalMixs(0);
    mixList.forEach((el) => {
      setTotalMixs((current) => current + el.props.option.total);
    });
  }, [mixList]);

  const removeProduct = (sentId) => {
    setProductList((current) =>
      current.filter((fruit) => fruit.props.option.id !== sentId)
    );
  };

  const removeMix = (sentId) => {
    setMixList((current) =>
      current.filter((fruit) => fruit.props.option.id !== sentId)
    );
  };


  const NewProduct = ({ option }) => (
    <div className="m-product">
      <div
        className="m-product-remove"
        onClick={() => removeProduct(option.id)}
      >
        -
      </div>
      <div className="m-product-code">{option.cod_producto}</div>
      <div className="m-product-name">{option.nombre}</div>
      <div className="m-product-cant">
        {(option.cantidad = parseInt(cantInputProduct.current.value))}
      </div>
      <div className="m-product-price">${option.precio}</div>
      <div className="m-product-total">
        $
        {
          (option.total =
            parseFloat(option.cantidad) * parseFloat(option.precio))
        }
      </div>
    </div>
  );

  const NewMix = ({ option }) => (
    <div className="m-product">
      <div className="m-product-remove" onClick={() => removeMix(option.id)}>
        -
      </div>
      <div className="m-product-code">{option.cod_producto}</div>
      <div className="m-product-name">{option.nombre}</div>
      <div className="m-product-cant">
        {(option.cantidad = parseInt(cantInputMix.current.value))}
      </div>
      <div className="m-product-price">${option.precio}</div>
      <div className="m-product-total">
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
      <div className="mix-containers">
        <div className="left-container">
          <div className="select-product-title">Seleccionar Producto</div>
          <div className="select-product">
            <Select
              styles={customStylesMix}
              className="react-select-product"
              placeholder="Seleccionar Producto"
              options={options}
              onChange={(choice) => {
                setSelectedProduct(choice);
              }}
            />
            <input
              type="text"
              placeholder="Cantidad"
              className="m-cantidad-input"
              ref={cantInputProduct}
            />
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#FF9B00", height: "25px" }}
              onClick={() => {
                setProductList((current) => [
                  ...current,
                  <NewProduct option={selectedProduct}></NewProduct>,
                ]);
              }}
            >
              Agregar
            </Button>
          </div>
          <div className="middle-title">Egresos</div>
          <div className="m-table-header">
            <div className="m-table-row">
              <div className="m-col m-col-remove">-</div>
              <div className="m-col m-col-cod">COD</div>
              <div className="m-col m-col-product">PRODUCTO</div>
              <div className="m-col m-col-cant">CANT</div>
              <div className="m-col m-col-precio">PRECIO</div>
              <div className="m-col m-col-total">TOTAL</div>
            </div>
          </div>
          <div className="m-table-body" id="row-container">
            <div className="m-product-list">
              <div className="m-products">{productList}</div>
            </div>
          </div>
          <div className="m-mix-total">
            <div className="m-total-title">
              <span>Total en Productos:</span>
            </div>
            <div className="m-total-number">${totalProducts}</div>
          </div>
        </div>
        <div className="right-container">
          <div className="select-mix-title">Seleccionar Mix</div>
          <div className="select-product">
            <Select
              styles={customStylesMix}
              className="react-select-product"
              options={mixOptions}
              placeholder="Seleccionar Mix"
              onChange={(choice) => {
                setSelectedMix(choice);
              }}
            />
            <input
              type="text"
              placeholder="Cantidad"
              className="m-cantidad-input"
              ref={cantInputMix}
            />
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#FF9B00", height: "25px" }}
              onClick={() => {
                setMixList((current) => [
                  ...current,
                  <NewMix option={selectedMix}></NewMix>,
                ]);
              }}
            >
              Agregar
            </Button>
          </div>
          <div className="middle-title">Ingresos</div>
          <div className="m-table-header">
            <div className="m-table-row">
              <div className="m-col m-col-remove">-</div>
              <div className="m-col m-col-cod">COD</div>
              <div className="m-col m-col-product">PRODUCTO</div>
              <div className="m-col m-col-cant">CANT</div>
              <div className="m-col m-col-precio">PRECIO</div>
              <div className="m-col m-col-total">TOTAL</div>
            </div>
          </div>
          <div className="m-table-body" id="row-container">
            <div className="m-product-list">
              <div className="m-products">{mixList}</div>
            </div>
          </div>
          <div className="m-mix-total">
            <div className="m-total-title">
              <span>Total en Mix:</span>
            </div>
            <div className="m-total-number">${totalMixs}</div>
          </div>
        </div>
      </div>
      <div className="confirm-container">
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#FF9B00", height: "25px" }}
          onClick={() => {
            insertMix(productList, mixList)
          }}
        >
          Confirmar
        </Button>
      </div>
    </>
  );
}
