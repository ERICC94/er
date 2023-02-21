import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getIngresos } from "../db/database";

const columns = [
  { field: "id", headerName: "N° Egreso", width: 100 },
  { field: "franquicia", headerName: "Franquicia", width: 150 },
  { field: "cod_producto", headerName: "N° Producto", width: 100 },
  { field: "nombre", headerName: "Producto", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 75 },
  { field: "fecha", headerName: "Fecha", width: 150 },
  { field: "observaciones", headerName: "Observaciones", width: 200 },
];

export function ListaIngresos() {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    getIngresos().then((res) => {
      setIngresos([]);
      res.forEach((r) => {
        setIngresos((old) => [...old, r]);
      });
    });
  });

  const handleEvent = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    console.log(params.row.id);
  };

  return (
    <>
      <div>
        <h3
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "30px",
          }}
        >
          Lista Ingresos
        </h3>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={ingresos}
          columns={columns}
          rowsPerPageOptions={[]}
          onRowClick={handleEvent}
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
