import { useState } from "react";
import { Ingresos } from "./Ingresos";
import { Egresos } from "./Egresos";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ListaIngresos } from "./ListaIngresos";
import { ListaEgresos } from "./ListaEgresos";

export function Intercambios() {
  const [example, setExample] = useState(true);
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
  };

  return (
    <>
      <div className="toggle-intercambio" style={{ height: "10%", width: "100%"}}>
        <ToggleButtonGroup
          color="standard"
          value={alignment}
          exclusive
          fullWidth
          size="small"
          onChange={handleChange}
          aria-label="Platform"
          style={{ backgroundColor: "#FF9B00", color: "white" }}
        >
          <ToggleButton value="ingresos">Ingresos</ToggleButton>
          <ToggleButton value="egresos">Egresos</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div
        className="nuevo-intercambio"
        style={{ width: "100%", height: "25%" }}
      >
        {alignment == "ingresos" ? <Ingresos /> : <Egresos />}
      </div>
      <div
        className="lista-intercambios"
        style={{ width: "100%", height: "65%" }}
      >
        {alignment == "ingresos" ? <ListaIngresos /> : <ListaEgresos />}
      </div>
    </>
  );
}
