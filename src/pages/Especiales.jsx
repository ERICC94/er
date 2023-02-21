import { useState } from "react";
import { InsertEspecial } from "./InsertEspecial";
import Button from "@mui/material/Button";
import { ListaEspeciales } from "./ListaEspeciales";

export function Especiales() {
  const [listaEspeciales, setListaEspeciales] = useState(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {listaEspeciales == false ? (
          <h2>Tortas Especiales - Nueva Especial</h2>
        ) : (
          <h2>Tortas Especiales - Lista Especiales</h2>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setListaEspeciales((prev) => !prev)}
            style={{ backgroundColor: "#ff9b00" }}
          >
            {listaEspeciales == false ? "Lista Especiales" : "Nueva Especial"}
          </Button>
        </div>
      </div>
      {listaEspeciales == false ? <InsertEspecial /> : <ListaEspeciales />}
    </>
  );
}
