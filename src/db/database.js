import Database from "tauri-plugin-sql-api";

const db = await Database.load(
  "mysql://root:password@localhost:3306/electrondb"
);

//GENERALES
//GENERALES
//GENERALES

export async function getSelectOptions() {
  return await db.select(
    `SELECT id, cod_producto, nombre, descripcion, CONVERT(precio,char) as precio FROM PRODUCTOS`
  );
}

export async function getMetodosDePago() {
  return await db.select(`select * from metodos_pago`);
}

export async function getTiposProductos() {
  return await db.select("SELECT * FROM TIPO_PRODUCTO");
}

//VENTAS
//VENTAS
//VENTAS

export async function confirmarVenta(
  lista,
  descuentoInput,
  metodoPago,
  empleado,
  observaciones
) {
  const response = await db.execute(
    `INSERT INTO ventas (fecha, metodo_pago, empleado, observaciones ,descuento) VALUES (now(), ${
      metodoPago.id
    }, ${empleado} ,"${
      observaciones == undefined ? null : observaciones.target.value
    }", ${descuentoInput})`
  );

  lista.forEach(async (el) => {
    await db.execute(
      `INSERT INTO detalle_ventas (cod_venta, id_producto, cantidad, precio_unitario) values (${
        response.lastInsertId
      }, ${el.props.option.id}, ${parseInt(
        el.props.option.cantidad
      )}, ${parseFloat(el.props.option.precio)})`
    );
  });
}

//COMPRAS
//COMPRAS
//COMPRAS

export async function confirmarCompra(lista, observaciones) {
  const response = await db.execute(
    `INSERT INTO compras (cod_sucursal, fecha, observaciones) VALUES (1, now(), "${
      observaciones == undefined ? null : observaciones.target.value
    }")`
  );

  lista.forEach(async (el) => {
    await db.execute(
      `INSERT INTO detalle_compras (cod_compra, id_producto, cantidad, precio_unitario) values (${
        response.lastInsertId
      }, ${el.props.option.id}, ${parseInt(
        el.props.option.cantidad
      )}, ${parseFloat(el.props.option.precio)})`
    );
  });
}

//DESPERDICIOS
//DESPERDICIOS
//DESPERDICIOS

export async function getDesperdicios() {
  return await db.select(
    "SELECT p.cod_producto , p.nombre, d.cantidad, convert(p.precio,char) as precio, d.observaciones FROM DESPERDICIOS D JOIN PRODUCTOS P ON P.ID = D.id_producto"
  );
}

export async function insertDesperdicio(id, cantidad, observaciones) {
  return await db.execute(
    `INSERT INTO DESPERDICIOS (id_producto, cantidad, observaciones, fecha) VALUES (${id}, ${parseInt(
      cantidad
    )}, '${observaciones}', curdate())`
  );
}

//MIX
//MIX
//MIX

export async function getSelectProduct() {
  //sin los mixs
  return await db.select(
    "SELECT id, cod_producto, nombre, descripcion, CONVERT(precio,char) as precio FROM PRODUCTOS WHERE TIPO_PRODUCTO != 3"
  );
}

export async function getSelectMix() {
  return await db.select(
    "SELECT id, cod_producto, nombre, descripcion, CONVERT(precio,char) as precio FROM PRODUCTOS WHERE TIPO_PRODUCTO = 3"
  );
}

export async function insertMix(listaProductos, listaMix) {
  const insert = await db.execute(`INSERT INTO MIX (fecha) VALUES (curdate())`);

  listaProductos.forEach(async (el) => {
    await db.execute(
      `INSERT INTO MIX_EGRESOS (id_mix, id_producto, cantidad) VALUES (${insert.lastInsertId}, ${el.props.option.id}, ${el.props.option.cantidad})`
    );
  });

  listaMix.forEach(async (el2) => {
    await db.execute(
      `INSERT INTO MIX_INGRESOS (id_mix, id_producto, cantidad) VALUES (${insert.lastInsertId}, ${el2.props.option.id}, ${el2.props.option.cantidad})`
    );
  });
}

//PRODUCTOS
//PRODUCTOS
//PRODUCTOS

export async function insertProducto(
  codigo,
  tipo,
  nombre,
  descripcion,
  precio
) {
  return await db.execute(
    `INSERT INTO PRODUCTOS (cod_producto, tipo_producto, nombre, descripcion, precio) VALUES (${parseInt(
      codigo
    )}, ${tipo.id}, '${nombre}', '${descripcion}', ${parseFloat(precio)})`
  );
}

export async function getProductos() {
  return await db.select(
    `SELECT p.id, cod_producto, nombre, tp.tipo, descripcion, CONVERT(precio,char) as precio FROM PRODUCTOS P JOIN TIPO_PRODUCTO TP ON tp.id = p.tipo_producto`
  );
}

export async function getInsumos() {
  return await db.select(
    `SELECT i.id, cod_insumo, nombre, u.unidad, descripcion, CONVERT(precio,char) as precio FROM INSUMOS I JOIN UNIDADES U ON u.id = i.cod_unidad`
  );
}

export async function insertInsumo(
  codigo,
  nombre,
  unidad,
  descripcion,
  precio
) {
  return await db.execute(
    `INSERT INTO INSUMOS (cod_insumo, nombre, cod_unidad, descripcion, precio) VALUES (${codigo}, "${nombre}", ${unidad}, "${descripcion}", ${precio})`
  );
}

//STOCK
//STOCK
//STOCK

export async function getStock() {
  return await db.select(`SELECT id, cod_producto,nombre, tipo_producto, CONVERT(COALESCE(ajuste,0),char) as ajuste,CONVERT(COALESCE(stock,0),char) as stock,CONVERT((SELECT COALESCE(sum(cantidad),0) from detalle_compras c WHERE c.id_producto = Productos.id),char) as compras,CONVERT((SELECT COALESCE(sum(cantidad),0) from detalle_ventas v WHERE v.id_producto = Productos.id),char) as ventas, CONVERT((SELECT COALESCE(sum(cantidad),0) FROM DESPERDICIOS D WHERE D.id_producto = Productos.id),char) as desperdicios, CONVERT((SELECT COALESCE(sum(cantidad),0) FROM mix_egresos ME where ME.id_producto = Productos.id),char) as mix_egresos, CONVERT((SELECT COALESCE(sum(cantidad),0) FROM mix_ingresos MI where MI.id_producto = Productos.id),char) as mix_ingresos, CONVERT((SELECT COALESCE(sum(cantidad),0) FROM ingresos i where i.id_producto = Productos.id),CHAR) as ingresos , CONVERT((SELECT COALESCE(sum(cantidad),0) FROM egresos E where E.id_producto = Productos.id),CHAR) as egresos FROM Productos
  `);
}

export async function getFranquicias() {
  return await db.select(`SELECT * FROM FRANQUICIAS`);
}

export async function getEgresos() {
  return await db.select(`SELECT e.id, f.nombre as franquicia, p.cod_producto, p.nombre, e.cantidad, CONVERT(fecha, char) as fecha, e.observaciones  FROM EGRESOS e JOIN productos p on p.id = e.id_producto JOIN franquicias f on e.id_franquicia = f.id
  `);
}

export async function getIngresos() {
  return await db.select(`SELECT i.id, f.nombre as franquicia, p.cod_producto, p.nombre, i.cantidad, CONVERT(fecha, char) as fecha, i.observaciones  FROM INGRESOS i JOIN productos p on p.id = i.id_producto JOIN franquicias f on i.id_franquicia = f.id
  `);
}

export async function insertEgreso(franq, prod, cant, obs) {
  return await db.execute(
    `INSERT INTO EGRESOS (id_franquicia, id_producto, cantidad, fecha, observaciones) VALUES (${parseInt(
      franq
    )}, ${parseInt(prod)}, ${parseInt(cant)}, curdate(), "${obs}")`
  );
}

export async function insertIngreso(franq, prod, cant, obs) {
  return await db.execute(
    `INSERT INTO INGRESOS (id_franquicia, id_producto, cantidad, fecha, observaciones) VALUES (${parseInt(
      franq
    )}, ${parseInt(prod)}, ${parseInt(cant)}, curdate(), "${obs}")`
  );
}

export async function getCaja() {
  return await db.select(`SELECT (SELECT CONVERT(sum((dv.cantidad * dv.precio_unitario)),CHAR) as efectivo FROM VENTAS V JOIN DETALLE_VENTAS DV ON v.id = dv.cod_venta JOIN productos p on p.id = dv.id_producto WHERE v.metodo_pago = 1 AND day(v.fecha) = day(now()) AND month(v.fecha) = month(now()) AND year(v.fecha) = year(now())) AS efectivo, (SELECT CONVERT(sum((dv.cantidad * dv.precio_unitario)),CHAR) as efectivo FROM VENTAS V JOIN DETALLE_VENTAS DV ON v.id = dv.cod_venta JOIN productos p on p.id = dv.id_producto WHERE v.metodo_pago = 2 AND day(v.fecha) = day(now()) AND month(v.fecha) = month(now()) AND year(v.fecha) = year(now())) AS tarjeta, (SELECT CONVERT(sum((dv.cantidad * dv.precio_unitario)),CHAR) as efectivo FROM VENTAS V JOIN DETALLE_VENTAS DV ON v.id = dv.cod_venta JOIN productos p on p.id = dv.id_producto WHERE v.metodo_pago = 3 AND day(v.fecha) = day(now()) AND month(v.fecha) = month(now()) AND year(v.fecha) = year(now())) as transferencia
  `);
}

export async function getListaCaja() {
  return await db.select(`SELECT cod_producto, p.nombre, CONVERT(sum(cantidad),char) as cantidad, Convert((sum(cantidad) * precio),char) as total FROM VENTAS V JOIN DETALLE_VENTAS DV ON V.id = DV.id_producto JOIN PRODUCTOS P ON P.id = DV.id_producto WHERE day(v.fecha) = day(now()) AND month(v.fecha) = month(now()) AND year(v.fecha) = year(now()) GROUP BY id_producto
  `);
}

export async function stockReal(id, stock) {
  db.execute(`UPDATE productos SET stock = ${stock} WHERE id = ${id}`);
  db.execute(`UPDATE productos SET ajuste = NULL WHERE id = ${id}`);
}

export async function insertAjuste(id, ajuste) {
  return await db.execute(
    `UPDATE productos SET ajuste = ${ajuste} WHERE id = ${id} `
  );
}

export async function getEmpleados() {
  return await db.select(
    `SELECT id, nombre, CONVERT(importe,char) as importe FROM EMPLEADOS`
  );
}

export async function getTotalFacturado(id) {
  return await db.select(`select CONVERT(sum(precio_unitario*cantidad),char) as total from ventas v join detalle_ventas dv on dv.cod_venta = v.id where empleado = ${id} AND year(fecha) = year(now()) and month(fecha) = month(now())
  `);
}

export async function getFlagStock() {
  return await db.select(
    `SELECT CONVERT(valor,char) as valor FROM FLAGS WHERE id = 1`
  );
}

export async function getUnidades() {
  return await db.select(`SELECT * FROM UNIDADES`);
}

export async function confirmarEspecial(
  tortas,
  insumos,
  observaciones,
  reserva,
  precio
) {
  const response = await db.execute(
    `INSERT INTO ESPECIALES (nombre_reserva, fecha, observaciones, precio, flagVendida) VALUES ("${reserva}", curdate(), "${observaciones}", ${parseFloat(
      precio
    )} ,0)`
  );

  tortas.forEach(async (t) => {
    console.log(t.props.option);
    await db.execute(
      `INSERT INTO detalle_tortas_especiales (id_especial, id_producto, cantidad) VALUES (${
        response.lastInsertId
      }, ${t.props.option.id}, ${parseInt(t.props.option.cantidad)})`
    );
  });
  insumos.forEach(async (i) => {
    await db.execute(
      `INSERT INTO detalle_insumos_especiales (id_especial, id_insumo, cantidad) VALUES (${
        response.lastInsertId
      }, ${i.props.option.id}, ${parseInt(i.props.option.cantidad)})`
    );
  });
}

export async function getEspeciales() {
  return await db.select(
    `SELECT id, nombre_reserva, date_format(fecha,"%d/%m/%Y") as fecha, convert(precio, char) as precio, observaciones, flagVendida FROM ESPECIALES`
  );
}

export async function getEspecialesVentas() {
  return await db.select(
    `SELECT id, nombre_reserva, date_format(fecha,"%d/%m/%Y") as fecha, convert(precio,char) as precio ,observaciones FROM ESPECIALES WHERE flagVendida = 0`
  );
}

export async function getInsumosEspeciales(id) {
  return await db.select(`SELECT I.nombre, cod_insumo, u.unidad,di.cantidad FROM DETALLE_INSUMOS_ESPECIALES Di JOIN ESPECIALES E ON E.ID = Di.ID_ESPECIAL JOIN INSUMOS I ON I.ID = Di.ID_INSUMO JOIN UNIDADES U ON U.id = I.cod_unidad WHERE id_especial = ${id}
`);
}

export async function getTortasEspeciales(id) {
  return await db.select(`SELECT P.nombre, cod_producto, convert(dt.cantidad,char) as cantidad FROM DETALLE_TORTAS_ESPECIALES DT JOIN ESPECIALES E ON E.ID = DT.ID_ESPECIAL JOIN PRODUCTOS P ON P.ID = DT.ID_PRODUCTO WHERE id_especial = ${id}
  `);
}

export async function confirmarVentaEspecial(productList) {
  productList.forEach((p) => {
    db.execute(
      `UPDATE especiales set flagVendida = 1 WHERE id = ${p.props.option.id}`
    );
  });
}
