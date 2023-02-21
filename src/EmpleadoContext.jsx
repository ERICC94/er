import React, { useContext, useState } from "react";

const EmpleadoContext = React.createContext();
const EmpleadoUpdateContext = React.createContext();

export function useEmpleado(){
  return useContext(EmpleadoContext)
}

export function useUpdateEmpleado(){
  return useContext(EmpleadoUpdateContext)
}

export function EmpleadoProvider({ children }) {
  const [empleado, setEmpleado] = useState("acaca");

  function definirEmpleado(nombre) {
    setEmpleado(nombre);
  }

  return (
    <EmpleadoContext.Provider value={empleado}>
      <EmpleadoUpdateContext.Provider value={definirEmpleado}>
        {children}
      </EmpleadoUpdateContext.Provider>
    </EmpleadoContext.Provider>
  );
}
