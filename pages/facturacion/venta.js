import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import moment from 'moment'
import { registrarHistoria } from '../../utils/funciones'
import FormVentas from '../../components/facturacion/FormVentas'
import { confirmAlert } from 'react-confirm-alert'; // Import

const Venta = () => {

    // VENTA
    let codigoRef = React.createRef()
    let formaPagoRef = React.createRef()
    let idClienteRef = React.createRef()
    let pagoRef = React.createRef()
    let cantidadRef = React.createRef()

    // CAJA
    let turnoRef = React.createRef()
    let saldoRef = React.createRef()
    let importeRef = React.createRef()
    let detalleRef = React.createRef()
    let importeERef = React.createRef()
    let detalleERef = React.createRef()




    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [listado, guardarListado] = useState([])
    const [nfact, guardarNFactura] = useState(null)
    const [fpago, guardarFpago] = useState(null)
    const [clientes, guardarClientes] = useState([])
    const [clienSel, guardarClienSel] = useState(null)
    const [vuelto, guardarVuelto] = useState(null)
    const [estCaja, guardarEstCaja] = useState(null)
    const [preFinal, guardarPreFinal] = useState(null)


    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerNFactura()

            verificarCaja()

        }
    }, []);


    const buscarProducto = async () => {

        guardarErrores(null)

        let codigo = codigoRef.current.value

        if (codigo === "") {
            guardarErrores("Debes escanear o ingresar un codigo de producto")
        } else {

            await axios.get(`/api/facturacion/facturacion`, {
                params: {
                    codigo: codigo,
                    f: "producto"
                }
            })

                .then(res => {




                    if (res.data.msg === "Producto Encontrado") {

                        const prod = {
                            codigo: res.data.body[0].codigo,
                            descripcion: `${res.data.body[0].marca}, ${res.data.body[0].producto}`,
                            precio_lista: res.data.body[0].precio_lista,
                            precio_venta: res.data.body[0].precio_venta * cantidadRef.current.value,
                            cantidad: cantidadRef.current.value,
                            stock: res.data.body[0].stock - cantidadRef.current.value,
                            codigo: res.data.body[0].codigo,

                        }


                        if (prod.stock <= 5 && prod.stock > 1) {

                            toastr.warning(`Este producto tiene un stock bajo: ${prod.stock} unidades`, "ATENCION")

                            guardarListado([...listado, prod])

                            updateStock("menos", prod.codigo, prod.cantidad)

                            document.getElementById("v").value = ""


                        } else if (prod.stock === 1) {

                            toastr.warning(`Esta es la ultima unidad de este producto`, "ATENCION")

                            guardarListado([...listado, prod])

                            updateStock("menos", prod.codigo, prod.cantidad)

                            document.getElementById("v").value = ""

                        } else if (prod.stock === 0) {

                            toastr.error(`Este producto ya no tiene stock, no se realizara la venta`, "ATENCION")

                            document.getElementById("v").value = ""

                        } else if (prod.stock >= 6) {

                            //  toastr.success(`Producto facturado`, "ATENCION")

                            guardarListado([...listado, prod])

                            updateStock("menos", prod.codigo, prod.cantidad)

                            document.getElementById("v").value = ""


                        }


                    }

                })
                .catch(error => {
                    console.log(error)

                    toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
                })

        }


    }

    const totalFacturacion = () => {

        let total = 0

        for (let i = 0; i < listado.length; i++) {
            total += listado[i].precio_venta

        }

        return total.toFixed(2)

    }

    const bajaProducto = (index, row) => {

        listado.splice(index, 1)

        guardarListado([...listado])

        updateStock("mas", row.codigo)

    }

    const updateStock = async (f, codigo, cantidad) => {

        const datos = {
            f: f,
            codigo: codigo,
            cantidad: cantidad
        }

        await axios.put(`/api/facturacion/facturacion`, datos)

    }

    const traerNFactura = async () => {


        await axios.get(`/api/facturacion/facturacion`, {
            params: {
                f: "nfactura"
            }
        })

            .then(res => {

                if (res.data.msg === "Id Encontrado") {

                    guardarNFactura(res.data.body[0].idventa + 1)

                } else if (res.data === "No hay Id") {

                    guardarNFactura(1)

                }
            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })

    }

    const finalizarVenta = async () => {

        guardarErrores(null)

        const venta = {
            nfactura: `${nfact} - ${moment().format('YYYY')}`,
            importe: totalFacturacion(),
            cantidad: listado.length,
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            usuario: usuario,
            f: "venta",
            idcliente: 0,
            medio_pago: fpago,
            pago: pagoRef.current.value,
            vuelto: 0
        }


        if (venta.medio_pago === "" || !venta.medio_pago) {

            guardarErrores("Debes seleccionar una forma de pago")

        } else {

            if (fpago === "Cuenta") {

                if (!clienSel) {

                    toastr.info("Selecciona un cliente", "ATENCION")

                } else {

                    venta.idcliente = clienSel.idcliente

                    registrarEnCuenta(venta)

                }

            } else if (fpago === "Efectivo") {

                venta.vuelto = vuelto

            }

            await axios.post(`/api/facturacion/facturacion`, venta)
                .then(res => {

                    if (res.data.msg === "Venta Registrada") {
                        toastr.success("La venta fue registrada", "ATENCION")
                    }
                }).catch(error => {
                    console.log(error)
                })

            registrarMovimiento("V")

            const ventaProd = {
                idventa: nfact,
                codigo: "",
                cantidad: "",
                importe: "",
                f: "ventaProd"
            }


            for (let i = 0; i < listado.length; i++) {
                ventaProd.codigo = listado[i].codigo
                ventaProd.importe = listado[i].precio_venta
                ventaProd.cantidad = listado[i].cantidad

                await axios.post(`/api/facturacion/facturacion`, ventaProd)

            }

            let accion = `Se registro la venta id: ${nfact}, factura n° ${venta.nfactura} con un importe de: ${venta.importe} y una cantidad de productos de: ${venta.cantidad}`

            let id = `VT - ${nfact}`

            registrarHistoria(accion, usuario, id)


            confirmAlert({
                title: 'ATENCION',
                message: '¿Imprime factura de la venta?',
                buttons: [
                    {
                        label: 'Si',
                        onClick: () => {


                            setTimeout(() => {

                                Router.push({
                                    pathname: '/facturacion/factura',
                                    query: {
                                        idventa: ventaProd.idventa
                                    }
                                });

                            }, 500);
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ]
            });


        }


    }

    const registrarEnCuenta = async (venta) => {

        const cuenta = {
            idcliente: venta.idcliente,
            idventa: nfact,
            importe: venta.importe,
            fecha_inicio: venta.fecha,
            estado: 1
        }

        await axios.post(`/api/cuentas/cuenta`, cuenta)
            .then(res => {

                if (res.data.msg === 'Cuenta Registrada') {

                    let accion = `Se registro la venta id: ${nfact}, factura n° ${venta.nfactura} con un importe de: ${venta.importe} y una cantidad de productos de: ${venta.cantidad}, en la cuenta del cliente: ${venta.idcliente} - ${clienSel.apellido}, ${clienSel.nombre}. DNI: ${clienSel.dni}`

                    let id = `CT - ${venta.idcliente}`

                    registrarHistoria(accion, usuario, id)

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const traerClientes = async () => {

        await axios.get(`/api/clientes/cliente`, {
            params: {
                f: "clientes"
            }
        })
            .then(res => {

                if (res.data.msg === "Clientes Encontrados") {

                    guardarClientes(res.data.body)

                    toastr.success("Generando listado de clientes", "ATENCION")

                } else if (res.data === "No Hay Clientes") {

                    toastr.info("No hay clientes registrados", "ATENCION")

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const calcVuelto = () => {

        let pago = parseFloat(pagoRef.current.value)

        let compra = parseFloat(totalFacturacion(listado))

        let vuelto = compra - pago

        guardarVuelto(vuelto.toFixed(2))

    }

    const verificarCaja = async () => {

        let user = jsCookie.get("usuario")

        await axios.get('/api/caja/caja', {
            params: {
                f: 'verificar',
                user: user
            }
        })

            .then(res => {

                if (res.data.msg === "Caja Encontrada") {

                    guardarEstCaja(res.data)

                } else if (res.data === "No hay Caja") {

                    guardarEstCaja("No")

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const iniciarCaja = async () => {

        const caja = {

            detalle: "Saldo Inicial",
            movimiento: "I",
            importe: saldoRef.current.value,
            turno: turnoRef.current.value,
            fecha: moment().format('YYYY-MM-DD'),
            hora: moment().format('HH:mm:ss'),
            estado: 1,
            anulado: 0,
            usuario: usuario,
            f: 'iniciar'
        }


        if (caja.turno === "") {

            toastr.warning("Debes elegir un turno", "ATENCION")

        } else if (caja.importe === "") {

            toastr.warning("Debes ingresar un importe para el inicio de la caja", "ATENCION")

        } else {

            await axios.post('/api/caja/caja', caja)
                .then(res => {

                    if (res.data.msg === "Caja Iniciada") {

                        toastr.success("Se inicio la caja correctamente", "ATENCION")

                        let accion = `Se inicio caja id: ${res.data.body.insertId} con el detalle: ${caja.detalle}, saldo inicial: ${caja.importe}, turno: ${caja.turno}, fecha ${caja.fecha}.`

                        let id = `CJ - ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        verificarCaja()

                    }

                }).catch(error => {
                    console.log(error)
                })

        }
    }

    const registrarMovimiento = (movim) => {

        if (movim === "I") {

            const caja = {

                detalle: detalleRef.current.value,
                movimiento: movim,
                turno: estCaja.body[0].turno,
                importe: importeRef.current.value,
                fecha: moment().format('YYYY-MM-DD'),
                hora: moment().format('HH:mm:ss'),
                estado: 1,
                anulado: 0,
                usuario: usuario,
                f: 'movimiento'
            }

            postMovimiento(caja)


        } else if (movim === "E") {

            const caja = {

                detalle: detalleERef.current.value,
                movimiento: movim,
                turno: estCaja.body[0].turno,
                importe: importeERef.current.value,
                fecha: moment().format('YYYY-MM-DD'),
                hora: moment().format('HH:mm:ss'),
                estado: 1,
                anulado: 0,
                usuario: usuario,
                f: 'movimiento'
            }

            postMovimiento(caja)


        } else if (movim === "V") {

            const caja = {

                detalle: "Venta de Productos",
                movimiento: "I",
                turno: estCaja.body[0].turno,
                importe: totalFacturacion(),
                fecha: moment().format('YYYY-MM-DD'),
                hora: moment().format('HH:mm:ss'),
                estado: 1,
                usuario: usuario,
                f: 'movimiento'
            }

            postMovimiento(caja)


        }

    }

    const postMovimiento = async (caja) => {
        if (caja.detalle === "") {

            toastr.warning("Debes ingresar el detalle del movimiento", "ATENCION")

        } else if (caja.importe === "") {

            toastr.warning("Debes ingresar el valor de movimiento", "ATENCION")

        } else {

            await axios.post('/api/caja/caja', caja)
                .then(res => {

                    if (res.data.msg === "Movimiento Registrado") {

                        toastr.success("El movimiento se registro correctamente", "ATENCION")

                        let accion = `Se registro el movimiento id: ${res.data.body.insertId} con el detalle: ${caja.detalle}, importe: ${caja.importe}, fecha ${caja.fecha}.`

                        let id = `CJ - ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        verificarCaja()

                    }

                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const cantXPrecio = (precio) => {

        let cant = 1

        let precioFinal = cant * precio

        console.log(precioFinal)

        guardarPreFinal(precioFinal.toFixed(2))

    }

    return (


        <Layout>
            <FormVentas
                listado={listado}
                errores={errores}
                codigoRef={codigoRef}
                idClienteRef={idClienteRef}
                formaPagoRef={formaPagoRef}
                buscarProducto={buscarProducto}
                totalFacturacion={totalFacturacion}
                bajaProducto={bajaProducto}
                finalizarVenta={finalizarVenta}
                nfact={`${nfact} - ${moment().format('YYYY')}`}
                guardarFpago={guardarFpago}
                fpago={fpago}
                clientes={clientes}
                traerClientes={traerClientes}
                guardarClienSel={guardarClienSel}
                pagoRef={pagoRef}
                vuelto={vuelto}
                calcVuelto={calcVuelto}
                clienSel={clienSel}
                estCaja={estCaja}
                usuario={usuario}
                iniciarCaja={iniciarCaja}
                turnoRef={turnoRef}
                saldoRef={saldoRef}
                importeRef={importeRef}
                detalleRef={detalleRef}
                importeERef={importeERef}
                detalleERef={detalleERef}
                registrarMovimiento={registrarMovimiento}
                cantidadRef={cantidadRef}
                preFinal={preFinal}
                cantXPrecio={cantXPrecio}
            />


        </Layout>
    )
}

export default Venta