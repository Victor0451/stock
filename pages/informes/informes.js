import React, { useEffect, useState } from 'react'
import FormNuevoStock from '../../components/Stock/FormNuevoStock'
import Layout from '../../components/Layouts/Layout'
import jsCookie from 'js-cookie'
import moment from 'moment'
import toastr from 'toastr'
import axios from 'axios'
import { registrarHistoria } from '../../utils/funciones'
import Router from 'next/router'
import { ip } from '../../config/config'
import FormInformes from '../../components/informes/FormInformes'

const Informes = () => {

    let fechaRef = React.createRef()

    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [reporte, guardarReporte] = useState(null)

    let token = jsCookie.get("token")


    useEffect(() => {

        if (!token) {

            Router.push("/redirect");

        } else {

            let usuario = jsCookie.get("usuario")

            guardarUsuario(usuario)

        }

    }, []);


    const generarReporte = async (f) => {

        guardarErrores(null)

        if (fechaRef.current.value === "") {

            guardarErrores("Debes ingresar la fecha en la que quieres generar el reporte")

        } else {

            await axios.get('/api/informes/informe', {
                params: {
                    f: f,
                    fecha: moment(fechaRef.current.value).format('YYYY-MM-DD')
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.msg === 'Generado') {

                        guardarReporte(res.data.body)

                    } else if (res.data === 'No') {

                        toastr.info("No hay datos relacionados al reporte pedido", "ATENCION")

                    }
                })
                .catch(error => {

                    console.log(error)

                })

        }

    }


    return (
        <Layout>
            <FormInformes
                fechaRef={fechaRef}
                errores={errores}
                generarReporte={generarReporte}
            />



        </Layout>
    )
}

export default Informes