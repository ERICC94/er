import Select from "react-select";
import { customStyles, customStylesMetodos } from "../css/Components";
import {
  getSelectOptions,
  getMetodosDePago,
  confirmarVenta,
  getEspecialesVentas,
} from "../db/database";
import { useEffect, useState, useRef } from "react";
import { useEmpleado, useUpdateEmpleado } from "../EmpleadoContext";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
import { VentasNormales } from "./VentasNormales";
import { VentasEspeciales } from "./VentasEspeciales";

export function Ventas() {
  const [especialesButton, setEspecialesButton] = useState(false);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Nueva Venta</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#ff9b00" }}
            onClick={() => setEspecialesButton((current) => !current)}
          >
            Especiales
          </Button>
        </div>
      </div>
      {especialesButton == false ? <VentasNormales /> : <VentasEspeciales />}
      <ToastContainer />
    </>
  );
}
