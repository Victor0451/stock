import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import moment from 'moment'
import ListadoProveedores from '../../components/proveedores/ListadoProveedores'
import { registrarHistoria } from '../../utils/funciones'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

const Listado = () => {

    let proveedorRef = React.createRef();
    let telefonoRef = React.createRef();
    let direccionRef = React.createRef();
    let descripcionRef = React.createRef();
    let cuitRef = React.createRef();
    let cuentaRef = React.createRef();
    let mailRef = React.createRef();

    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [listado, guardarListado] = useState(null)

    let token = jsCookie.get("token")

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerProveedores()
        }

    }, []);

    const traerProveedores = async () => {

        await axios.get(`/api/proveedores/proveedor`)

            .then(res => {

                if (res.data.msg === "Proveedores Encontrados") {

                    toastr.success("Generando listado", "ATENCION")

                    guardarListado(res.data.body)

                } else if (res.data.msg === "No hay Proveedores") {

                    toastr.warning("No hay categorias registradas", "ATENCION")

                }

            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })


    }

    const editarProveedor = async (row) => {

        let prov = {
            id: row.idproveedor,
            proveedor: proveedorRef.current.value,
            telefono: telefonoRef.current.value,
            mail: mailRef.current.value,
            direccion: direccionRef.current.value,
            descripcion: descripcionRef.current.value,
            cuit: cuitRef.current.value,
            cuenta: cuentaRef.current.value,
            f: "edicion"
        }

        if (prov.proveedor === "") {
            guardarErrores("Debes ingresar el nombre del proveedor")

        } else {

            await axios.put(`/api/proveedores/proveedor`, prov)
                .then(res => {

                    if (res.data.msg === "Proveedor Editado") {

                        toastr.success("El proveedor se edito correctamente", "ATENCION")

                        let accion = `Se edito el proveedor id: ${row.idproveedor} - ${prov.proveedor}.`

                        let id = `PV - ${row.idproveedor}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            traerProveedores()
                        }, 500);
                    }

                })
                .catch(error => {
                    console.log(error)

                    toastr.danger("Ocurrio un error al editar el proveedor", "ATENCION")
                })

        }

    }

    const bajaProveedor = async (row) => {

        let prov = {
            id: row.idproveedor,
            estado: 0,
            fecha_baja: moment().format('YYYY-MM-DD HH:mm:ss'),
            f: 'baja'
        }

        await axios.put(`/api/proveedores/proveedor`, prov)

            .then(res => {

                if (res.data.msg === "Proveedor Baja") {

                    toastr.success("El proveedor se dio de baja correctamente", "ATENCION")

                    let accion = `Se dio de baja el proveedor id: ${row.idproveedor} - ${row.proveedor}.`

                    let id = `PV - ${row.idproveedor}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerProveedores()
                    }, 500);

                }

            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <Layout>


            {listado ? (
                <ListadoProveedores
                    listado={listado}
                    editarProveedor={editarProveedor}
                    errores={errores}
                    proveedorRef={proveedorRef}
                    telefonoRef={telefonoRef}
                    direccionRef={direccionRef}
                    descripcionRef={descripcionRef}
                    cuitRef={cuitRef}
                    cuentaRef={cuentaRef}
                    mailRef={mailRef}
                    bajaProveedor={bajaProveedor}

                />

            ) : (

                <Alert
                    mt="10"
                    mb="10"
                    status='info'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        ATENCION!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Actualmente no se encuentra ningun proveedor registrado en la base de datos.
                    </AlertDescription>
                </Alert>
            )}

        </Layout>
    )
}

export default Listado