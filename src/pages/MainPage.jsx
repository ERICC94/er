import Select from "react-select";
import { getSelectOptions } from "../db/database";
import {useState} from 'react'

let options = []

getSelectOptions().then((res) => {
  res.forEach((r)=> {
    r.label = r.cod_producto + " - " + r.nombre
    r.value = r.id
    delete r.nombre
    delete r.descripcion
    delete r.descripcion
    delete r.precio
    delete r.cod_producto
    delete r.id
    options.push(r)
  })
});


export function MainPage() {

 const [selectedOption, setSelectedOption] = useState("")


  return (
    <>
      <h1>Franceschini Main Page</h1>
      <Select options={options} onChange={(choice) => setSelectedOption(choice)}/>
      <button onClick={() => console.log(selectedOption)}>Submit</button>
      <h1>{selectedOption.label}</h1>
    </>
  );
}
