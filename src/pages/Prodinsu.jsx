import { useState } from "react";
import Button from "@mui/material/Button";
import { Productos } from "./Productos";
import { Insumos } from "./Insumos";

export function Prodinsu() {
  const [insumosBtn, setInsumosBtn] = useState(false);

  return (
    <>
      <div className="products-header">
        <div className="products-new-title">
          <h2>{insumosBtn == false ? "Productos" : "Insumos"}</h2>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#ff9b00", height: "25px" }}
            onClick={() => {
              setInsumosBtn((current) => !current);
            }}
          >
            {insumosBtn == false ? "Insumos" : "Productos"}
          </Button>
        </div>
        {insumosBtn == false ? <Productos /> : <Insumos />}
      </div>
    </>
  );
}
