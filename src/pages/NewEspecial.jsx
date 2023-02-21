import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { getInsumosEspeciales, getTortasEspeciales } from "../db/database";
import { useEffect } from "react";

let insumos = [];
let tortas = [];

export function NewEspecial(option) {
  const [open, setOpen] = useState(false);
  const [listaTortas, setListaTortas] = useState([]);
  const [listaInsumos, setListaInsumos] = useState([]);

  getTortasEspeciales(option.option.id).then((res) => {
    tortas = res;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const NewTorta = ({ option }) => (
    <div className="desperdicio">
      <div
        style={{
          width: "5%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "0",
          fontSize: "10px",
        }}
      >
        ❌
      </div>
      <div style={{ width: "15%" }}>{option.cod_producto}</div>
      <div style={{ width: "50%" }}>{option.nombre}</div>
      <div style={{ width: "30%" }}>{option.cantidad}</div>
    </div>
  );

  const NewInsumo = ({ option }) => (
    <div className="desperdicio">
      <div
        style={{
          width: "5%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "0",
          fontSize: "10px",
        }}
      >
        ❌
      </div>
      <div style={{ width: "15%" }}>{option.cod_insumo}</div>
      <div style={{ width: "50%" }}>{option.nombre}</div>
      <div style={{ width: "30%" }}>{option.cantidad}</div>
    </div>
  );

  function init() {
    setListaTortas([]);
    getTortasEspeciales(option.option.id).then((res) => {
      res.forEach((t) => {
        setListaTortas((current) => [...current, <NewTorta option={t} />]);
      });
    });

    setListaInsumos([]);
    getInsumosEspeciales(option.option.id).then((res) => {
      res.forEach((i) => {
        setListaInsumos((current) => [...current, <NewInsumo option={i} />]);
      });
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="lespeciales">
      <div className="lespeciales-reserva">{option.option.nombre_reserva}</div>
      <div className="lespeciales-date">{option.option.fecha}</div>
      <div className="lespeciales-observations">
        {option.option.observaciones}
      </div>
      <div className="lespeciales-price">{option.option.precio}</div>
      <div
        className="lespeciales-detalles"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          onClick={() => {
            handleClickOpen();
            init();
          }}
          style={{ padding: "0" }}
        >
          Detalle
        </Button>
        <Dialog
          open={open}
          fullWidth={"sm"}
          maxWidth={"sm"}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Detalle de {option.option.nombre_reserva}
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div style={{ marginBottom: "10px" }}>Tortas Utilizadas:</div>
            <div className="desperdicios-container">
              <div className="desperdicios-box-header">
                <div
                  style={{
                    width: "5%",
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "0",
                  }}
                >
                  -
                </div>
                <div style={{ width: "15%" }}>Codigo</div>
                <div style={{ width: "50%" }}>Producto</div>
                <div style={{ width: "30%" }}>Cantidad</div>
              </div>
              <div className="desperdicios-box">
                <div className="desperdicios-desperdicios">{listaTortas}</div>
              </div>
            </div>

            <div style={{ marginBottom: "10px", marginTop: "10px" }}>
              Insumos Utilizados:
            </div>
            <div className="desperdicios-container">
              <div className="desperdicios-box-header">
                <div
                  style={{
                    width: "5%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  -
                </div>
                <div style={{ width: "15%" }}>Codigo</div>
                <div style={{ width: "50%" }}>Producto</div>
                <div style={{ width: "30%" }}>Cantidad</div>
              </div>
              <div className="desperdicios-box">
                <div className="desperdicios-desperdicios">{listaInsumos}</div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
