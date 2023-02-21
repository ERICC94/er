import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getEgresos } from "../db/database";

const columns = [
  { field: "id", headerName: "N° Egreso", width: 100 },
  { field: "franquicia", headerName: "Franquicia", width: 150 },
  { field: "cod_producto", headerName: "N° Producto", width: 100 },
  { field: "nombre", headerName: "Producto", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 75 },
  { field: "fecha", headerName: "Fecha", width: 150 },
  { field: "observaciones", headerName: "Observaciones", width: 200 },
];

export function ListaEgresos() {
  const [egresos, setEgresos] = useState([]);

  useEffect(() => {
    getEgresos().then((res) => {
      setEgresos([]);
      res.forEach((r) => {
        setEgresos((old) => [...old, r]);
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
        <h3 style={{display: "flex", justifyContent: "flex-start", marginBottom: "30px"}}>Lista Egresos</h3>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={egresos}
          columns={columns}
          rowsPerPageOptions={[]}
          onRowClick={handleEvent}
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
