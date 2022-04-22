import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import moment from 'moment'
import { registrarHistoria } from '../../utils/funciones'
import { confirmAlert } from 'react-confirm-alert'; // Import
import FormNuevoCliente from '../../components/clientes/FormNuevoCliente'



const nuevo = () => {

    let nombreRef = React.createRef()
    let apellidoRef = React.createRef()
    let dniRef = React.createRef()
    let telefonoRef = React.createRef()
    let direccionRef = React.createRef()
    let detalleRef = React.createRef()


    const [usuario, guardarUsuario] = useState(null)
    const [flag, guardarFlag] = useState(false)
    const [errores, guardarErrores] = useState(null)


    let token = jsCookie.get("token")

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

        }
    }, []);

    const registrarCliente = async () => {

        const cliente = {
            apellido: apellidoRef.current.value,
            nombre: nombreRef.current.value,
            dni: dniRef.current.value,
            direccion: direccionRef.current.value,
            telefono: telefonoRef.current.value,
            detalle: detalleRef.current.value,
            fecha_alta: moment().format('YYYY-MM-DD HH:mm:ss'),
            estado: 1

        }

        if (cliente.apellido === "") {

            guardarErrores("Debes ingresar un apellido")

        } else if (cliente.nombre === "") {

            guardarErrores("Debes ingresar un nombre")

        } else {

            await axios.post('/api/clientes/cliente', cliente)

                .then(res => {

                    if (res.data.msg === "Cliente Registrado") {

                        toastr.success("Cliente registrado", "ATENCION")

                        let accion = `Se registro el cliente id:  ${res.data.body.insertId}, ${cliente.apellido}, ${cliente.nombre}, DNI ${cliente.dni}.`

                        let id = `CL -  ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        }

    }

    const existeCliente = async () => {


        const dni = dniRef.current.value

        if (dni === "") {
            toastr.info("Debes ingresar un DNI para verificar si existe", "ATENCION")
        } else {


            await axios.get('/api/clientes/cliente', {
                params: {
                    f: 'existe',
                    id: dni
                }
            })
                .then(res => {

                    if (res.data.msg === "Cliente Encontrado") {

                        if (res.data.body[0].estado === 1) {

                            toastr.warning("El cliente ya esta registrado y esta activo", "ATENCION")

                        } else if (res.data.body[0].estado === 0) {

                            toastr.warning("El cliente ya esta registrado y esta dado de baja", "ATENCION")

                        }


                    } else if (res.data === "No hay Cliente") {

                        toastr.info("Puedes registrar a este cliente", "ATENCION")

                        guardarFlag(true)

                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <Layout>
            <FormNuevoCliente
                nombreRef={nombreRef}
                apellidoRef={apellidoRef}
                dniRef={dniRef}
                telefonoRef={telefonoRef}
                direccionRef={direccionRef}
                detalleRef={detalleRef}
                existeCliente={existeCliente}
                registrarCliente={registrarCliente}
                flag={flag}
                errores={errores}

            />
        </Layout>
    )
}

export default nuevo