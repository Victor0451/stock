import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import ListadoCategorias from '../../components/categorias/ListadoCategorias'
import axios from 'axios'
import toastr from 'toastr'
import moment from 'moment'
import { registrarHistoria } from '../../utils/funciones'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

const Listado = () => {

    let categoriaRef = React.createRef()
    let descripcionRef = React.createRef()


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

            traerCategorias()

        }
    }, []);

    const traerCategorias = async () => {

        await axios.get(`/api/categorias/categoria`)

            .then(res => {

                if (res.data.msg === "Categorias Encontradas") {

                    toastr.success("Generando listado", "ATENCION")

                    guardarListado(res.data.body)

                } else if (res.data.msg === "No hay Categorias") {

                    toastr.warning("No hay categorias registradas", "ATENCION")

                }

            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })


    }

    const editarCategoria = async (row) => {

        let cat = {
            id: row.idcategoria,
            categoria: categoriaRef.current.value,
            descripcion: descripcionRef.current.value,
            f: 'edicion'

        }

        if (cat.categoria === "") {

            guardarErrores("Debes ingresar una categoria")

        } else {

            await axios.put('/api/categorias/categoria', cat)

                .then(res => {

                    if (res.data.msg === "Categoria Editada") {

                        toastr.success("La categoria se registro con exito", "ATENCION")

                        let accion = `Se edito la categoria id: ${row.idcategoria}. Antes: ${row.categoria} despues: ${cat.categoria}`

                        let id = `CT - ${row.idcategoria}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            traerCategorias()
                        }, 500);

                    }

                })
                .catch(error => {
                    console.log(error)
                })

        }
    }

    const bajaCategoria = async (row) => {

        let cat = {
            id: row.idcategoria,
            estado: 0,
            fecha_baja: moment().format('YYYY-MM-DD HH:mm:ss'),
            f: 'baja'
        }

        await axios.put(`/api/categorias/categoria`, cat)

            .then(res => {

                if (res.data.msg === "Categoria Baja") {

                    toastr.success("La categoria se dio de baja correctamente", "ATENCION")

                    let accion = `Se dio de baja la categoria id: ${row.idcategoria} - ${row.categoria}.`

                    let id = `CT - ${row.idcategoria}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerCategorias()
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
                <ListadoCategorias
                    listado={listado}
                    categoriaRef={categoriaRef}
                    descripcionRef={descripcionRef}
                    editarCategoria={editarCategoria}
                    bajaCategoria={bajaCategoria}
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
                        Actualmente no se encuentra ninguna categoria registrada en la base de datos.
                    </AlertDescription>
                </Alert>
            )}

        </Layout>

    )
}

export default Listado