import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import FormCierreCaja from '../../components/cajas/FormCierreCaja'
import { registrarHistoria } from '../../utils/funciones'
import toastr from 'toastr'
import { confirmAlert } from 'react-confirm-alert'; // Import
import moment from 'moment'


const Cierre = () => {

    let detalleRef = React.createRef()
    let importeRef = React.createRef()
    let movimientoRef = React.createRef()
    let turnoRef = React.createRef()
    let saldoRef = React.createRef()
    let importeIRef = React.createRef()
    let detalleIRef = React.createRef()
    let importeERef = React.createRef()
    let detalleERef = React.createRef()


    const [usuario, guardarUsuario] = useState(null)
    const [estCaja, guardarEstCaja] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [ingresos, guardarIngresos] = useState([])
    const [egresos, guardarEgresos] = useState([])
    const [flag, guardarFlag] = useState(false)


    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {

            if (jsCookie.get("usuario")) {

                let usuario = jsCookie.get("usuario")

                guardarUsuario(usuario)

                setTimeout(() => {

                    verificarCaja()
                }, 500);

            }

        }
    }, []);


    const verificarCaja = async () => {

        let user = jsCookie.get("usuario")

        await axios.get('/api/caja/caja', {
            params: {
                f: "verificar",
                user: user,
            }

        })

            .then(res => {

                if (res.data.msg === "Caja Encontrada") {

                    guardarEstCaja(res.data)

                    dividirMovimientos(res.data.body)

                    guardarFlag(true)

                } else if (res.data === "No hay Caja") {

                    guardarEstCaja("No")

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const dividirMovimientos = (arr) => {

        for (let i = 0; i < arr.length; i++) {

            if (arr[i].movimiento === "I") {

                ingresos.push(arr[i])

                guardarIngresos([...ingresos])


            } else if (arr[i].movimiento === "E") {

                egresos.push(arr[i])

                guardarEgresos([...egresos])

            }

        }

    }

    const calcTotal = (arr) => {

        let total = 0

        for (let i = 0; i < arr.length; i++) {

            total += parseFloat(arr[i].importe)

        }

        return total.toFixed(2)

    }

    const editarMovimiento = async (row) => {

        guardarErrores(null)

        const movim = {
            id: row.idcaja,
            detalle: detalleRef.current.value,
            importe: importeRef.current.value,
            movimiento: movimientoRef.current.value,
            f: "movimiento edicion"
        }


        if (movim.detalle === "") {

            guardarErrores("Debes ingresar un detalle")

        } else if (movim.importe === "") {

            guardarErrores("Debes ingresar un importe")

        } else if (movim.movimiento === "") {

            guardarErrores("Debes seleccionar el tipo de movimiento")

        } else {

            await axios.put(`/api/caja/caja`, movim)
                .then(res => {

                    if (res.data.msg === "Movimiento Editado") {

                        toastr.success("Se edito el movimiento correctamente", "ATENCION")

                        let accion = `Se edito el movimiento id: ${row.idcaja} con el detalle: ${movim.detalle}, importe: ${movim.importe}, tipo de movimiento ${movim.movimiento}.`

                        let id = `CJ - ${row.idcaja}`

                        registrarHistoria(accion, usuario, id)

                        verificarCaja()
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }


    }

    const bajaMovimiento = async (row) => {

        await confirmAlert({
            title: 'ATENCION',
            message: '¿Seguro quieres anular el movimiento?',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {

                        const movim = {
                            id: row.idcaja,
                            anulado: 1,
                            fecha_anulado: moment().format('YYYY-MM-DD HH:mm:ss'),
                            f: "movimiento baja"
                        }

                        axios.put(`/api/caja/caja`, movim)
                            .then(res => {

                                console.log(res.data)

                                if (res.data.msg === "Movimiento Baja") {

                                    toastr.success("Se anulo el movimiento correctamente", "ATENCION")

                                    let accion = `Se anulo el movimiento id: ${row.idcaja} con el detalle: ${movim.detalle}, importe: ${movim.importe}, tipo de movimiento ${movim.movimiento}.`

                                    let id = `CJ - ${row.idcaja}`

                                    registrarHistoria(accion, usuario, id)

                                    verificarCaja()

                                }

                            })
                            .catch(error => {
                                console.log(error)
                            })


                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });



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

                    console.log(res.data)

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

                detalle: detalleIRef.current.value,
                movimiento: movim,
                turno: estCaja.body[0].turno,
                importe: importeIRef.current.value,
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
                usuario: usuario,
                anulado: 0,
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
                    console.log(res.data)
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

    const cerrarCaja = async (row) => {

        await confirmAlert({
            title: 'ATENCION',
            message: '¿Confirmas el cierre de caja?',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {


                        const movim = {
                            fecha: moment(row.fecha).format('YYYY-MM-DD'),
                            estado: 0,
                            fecha_cierre: moment().format('YYYY-MM-DD HH:mm:ss'),
                            usuario_cierre: usuario,
                            f: "movimiento cierre",
                            usuario: usuario
                        }


                        axios.put(`/api/caja/caja`, movim)
                            .then(res => {

                                if (res.data.msg === "Movimiento Baja") {

                                    toastr.success("Se realizo el cierre de caja correctamente", "ATENCION")

                                    let accion = `Se realizo el cierre de caja fecha: ${row.fecha}, del usuario: ${row.usuario}.`

                                    let id = `CJ - ${row.idcaja}`

                                    registrarHistoria(accion, usuario, id)

                                    verificarCaja()

                                }

                            })
                            .catch(error => {
                                console.log(error)
                            })


                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }


    return (
        <Layout>


            <FormCierreCaja
                estCaja={estCaja}
                ingresos={ingresos}
                egresos={egresos}
                calcTotal={calcTotal}
                detalleRef={detalleRef}
                importeRef={importeRef}
                movimientoRef={movimientoRef}
                editarMovimiento={editarMovimiento}
                errores={errores}
                bajaMovimiento={bajaMovimiento}
                turnoRef={turnoRef}
                saldoRef={saldoRef}
                importeIRef={importeIRef}
                detalleIRef={detalleIRef}
                importeERef={importeERef}
                detalleERef={detalleERef}
                usuario={usuario}
                registrarMovimiento={registrarMovimiento}
                iniciarCaja={iniciarCaja}
                cerrarCaja={cerrarCaja}
                flag={flag}
            />



        </Layout>
    )
}

export default Cierre