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
import ListadoCajasCerradas from '../../components/cajas/ListadoCajasCerradas'
import LoadForm from '../../components/Layouts/LoadForm'



const Listado = () => {

    const [usuario, guardarUsuario] = useState(null)
    const [listado, guardarListados] = useState(null)
    const [cajaDetalle, guardarCajaDetalle] = useState(null)
    const [ingresos, guardarIngresos] = useState([])
    const [egresos, guardarEgresos] = useState([])

    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {

            let usuario = jsCookie.get("usuario")

            guardarUsuario(usuario)

            listadoCajas()


        }
    }, []);

    const listadoCajas = async () => {

        await axios.get('/api/caja/caja', {
            params: {
                f: 'cajas cerradas'
            }
        })

            .then(res => {

                if (res.data.msg === "Cajas Encontradas") {

                    guardarListados(res.data.body)

                } else if (res.data === "No hay Caja") {

                    guardarEstCaja(null)

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const traerDetalleCaja = async (row) => {

        await axios.get('/api/caja/caja', {
            params: {
                f: 'cajas detalle',
                fecha: moment(row.fecha).format('YYYY-MM-DD'),
                usuario: row.usuario,
                turno: row.turno
            }
        })

            .then(res => {

                if (res.data.msg === "Cajas Detalle") {

                    guardarCajaDetalle(res.data.body)

                    dividirMovimientos(res.data.body)

                } else if (res.data === "No hay Caja") {

                    guardarCajaDetalle(null)

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const dividirMovimientos = (arr) => {

        console.log(arr)

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

    const imprimir = () => {

        let contenido = document.getElementById("caja").innerHTML;

        let contenidoOrg = document.body.innerHTML;

        document.body.innerHTML = contenido;

        window.print();

        document.body.innerHTML = contenidoOrg;

        Router.reload()

    };

    return (
        <Layout>

            {listado ? (
                <ListadoCajasCerradas
                    listado={listado}
                    traerDetalleCaja={traerDetalleCaja}
                    cajaDetalle={cajaDetalle}
                    ingresos={ingresos}
                    egresos={egresos}
                    calcTotal={calcTotal}
                    imprimir={imprimir}
                />
            ) : <LoadForm />}

        </Layout>
    )
}

export default Listado