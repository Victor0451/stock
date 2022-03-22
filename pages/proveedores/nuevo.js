import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import FormNuevoProveedor from '../../components/proveedores/FormNuevoProveedor'
import { registrarHistoria } from '../../utils/funciones'

const Nuevo = () => {

    let proveedorRef = React.createRef();
    let telefonoRef = React.createRef();
    let direccionRef = React.createRef();
    let descripcionRef = React.createRef();
    let cuitRef = React.createRef();
    let cuentaRef = React.createRef();
    let mailRef = React.createRef();



    const [usuario, guardarUsuario] = useState(null)
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

    const registrarProveedor = async () => {

        let prov = {
            proveedor: proveedorRef.current.value,
            telefono: telefonoRef.current.value,
            mail: mailRef.current.value,
            direccion: direccionRef.current.value,
            descripcion: descripcionRef.current.value,
            cuit: cuitRef.current.value,
            cuenta: cuentaRef.current.value,
            estado: 1
        }

        if (prov.proveedor === "") {
            guardarErrores("Debes ingresar el nombre del proveedor")

        } else {

            await axios.post(`/api/proveedores/proveedor`, prov)
                .then(res => {

                    if (res.data.msg === "Proveedor Registrado") {

                        toastr.success("El proveedor se registro correctamente", "ATENCION")

                        let accion = `Se registro el proveedor id: ${res.data.body.insertId} - ${prov.proveedor}.`

                        let id = `PV - ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            Router.reload()
                        }, 1000);
                    }

                })
                .catch(error => {
                    console.log(error)

                    toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
                })

        }

    }

    return (
        <Layout>
            <FormNuevoProveedor
                proveedorRef={proveedorRef}
                telefonoRef={telefonoRef}
                direccionRef={direccionRef}
                descripcionRef={descripcionRef}
                cuitRef={cuitRef}
                cuentaRef={cuentaRef}
                mailRef={mailRef}
                errores={errores}
                registrarProveedor={registrarProveedor}
            />
        </Layout>
    )
}

export default Nuevo