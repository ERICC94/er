import { useState, useContext, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { MainPage } from "./pages/MainPage";
import { Ventas } from "./pages/Ventas";
import { invoke } from "@tauri-apps/api";
import { Desperdicios } from "./pages/Desperdicios";
import { Compras } from "./pages/Compras";
import { Mix } from "./pages/Mix";
import Popup from "reactjs-popup";
import Select from "react-select";
import { Prodinsu } from "./pages/Prodinsu";
import { Stock } from "./pages/Stock";
import { Intercambios } from "./pages/Intercambios";
import { Caja } from "./pages/Caja";
import { customStylesIntercambios } from "./css/Components";
import { getEmpleados, getTotalFacturado } from "./db/database";
import { useEmpleado, useUpdateEmpleado } from "./EmpleadoContext";
import {Especiales} from './pages/Especiales'

let options = [];
let facturado = 0;

getEmpleados().then((res) => {
  res.forEach((r) => {
    r.label = r.nombre;
    r.value = r.id;
    options.push(r);
  });
});

function App() {
  const [open, setOpen] = useState(false);

  const [facturado, setFacturado] = useState();

  const { collapseSidebar } = useProSidebar();

  const selectedEmpleado = useEmpleado();
  const definirEmpleado = useUpdateEmpleado();

  useEffect(() => {
    if (selectedEmpleado.id == null || selectedEmpleado.id == undefined) return;
    getTotalFacturado(selectedEmpleado.id).then((res) => {
      setFacturado(res[0].total);
    });
  }, [selectedEmpleado]);

  const btnStyles = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "25px",
    position: "absolute",
    opacity: open ? "1" : "0",
    transitionDelay: open ? "0.6s" : "0s",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Sidebar
        collapsedWidth="0px"
        width="180px"
        transitionDuration={800}
        border
      >
        <Menu>
          <MenuItem
            suffix="X"
            onClick={() => {
              setOpen((o) => !o);
              collapseSidebar();
            }}
          ></MenuItem>
          <div style={{ padding: "10px", fontWeight: "bold" }}>
            Transacciones
          </div>
          <MenuItem component={<Link to="/ventas" />}> Ventas</MenuItem>
          <MenuItem component={<Link to="/compras" />}> Compras</MenuItem>
          <div style={{ padding: "10px", fontWeight: "bold" }}>General</div>
          <MenuItem component={<Link to="/productos" />}> Productos</MenuItem>
          <MenuItem component={<Link to="/desperdicios" />}>
            Desperdicios
          </MenuItem>
          <MenuItem component={<Link to="/intercambios" />}>
            {" "}
            Intercambios
          </MenuItem>{" "}
          <MenuItem component={<Link to="/especiales" />}>
            {" "}
            Especiales
          </MenuItem>
          <MenuItem component={<Link to="/mix" />}> Mix</MenuItem>
          <div style={{ padding: "10px", fontWeight: "bold" }}>Resumenes</div>
          <MenuItem component={<Link to="/caja" />}> Caja Diaria</MenuItem>
          <MenuItem component={<Link to="/stock" />}> Stock</MenuItem>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <div>Empleado: {selectedEmpleado.nombre}</div>
            <Popup
              trigger={
                <button
                  style={{
                    marginRight: "10px",
                    border: "none",
                    cursor: "pointer",
                    background: "rgb(249,249,249,0.7)",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  ⚙️
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="pop-modal">
                  <button className="pop-close" onClick={close}>
                    &times;
                  </button>
                  <div className="pop-header"> Configuracion </div>
                  <div className="pop-content" style={{}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "10px",
                        }}
                      >
                        Empleado
                      </div>
                      <div style={{ width: "200px" }}>
                        <Select
                          className="react-select-product"
                          placeholder="Empleado"
                          styles={customStylesIntercambios}
                          onChange={(value) => definirEmpleado(value)}
                          defaultValue={selectedEmpleado}
                          options={options}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                      >
                        Total Facturado:
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                      >
                        ${facturado || 0} / ${selectedEmpleado.importe}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </Menu>
      </Sidebar>
      <button
        onClick={() => {
          collapseSidebar();
          setOpen((o) => !o);
        }}
        style={btnStyles}
      >
        &#9776;
      </button>
      <div style={{ margin: "30px", width: "100%" }}>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/ventas" element={<Ventas />}></Route>
          <Route path="/desperdicios" element={<Desperdicios />}></Route>
          <Route path="/compras" element={<Compras />}></Route>
          <Route path="/mix" element={<Mix />}></Route>
          <Route path="/productos" element={<Prodinsu />}></Route>
          <Route path="/stock" element={<Stock />}></Route>
          <Route path="/intercambios" element={<Intercambios />}></Route>
          <Route path="/Caja" element={<Caja />}></Route>
          <Route path="/especiales" element={<Especiales />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
