import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import FormNuevaCategoria from '../../components/categorias/FormNuevaCategoria'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'

const Nuevo = () => {

    let categoriaRef = React.createRef()
    let descripcionRef = React.createRef()


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

    const registrarCategorias = async () => {

        guardarErrores(null)

        let cat = {

            categoria: categoriaRef.current.value,
            descripcion: descripcionRef.current.value,
            estado: 1

        }

        if (cat.categoria === "") {

            guardarErrores("Debes ingresar una categoria")

        } else {

            await axios.post('/api/categorias/categoria', cat)

                .then(res => {

                    if (res.data.msg === "Categoria Registrada") {

                        toastr.success("La categoria se registro con exito", "ATENCION")

                        let accion = `Se registro la categoria id: ${res.data.body.insertId} - ${cat.categoria}`

                        let id = `CT - ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            Router.reload()
                        }, 1000);

                    }

                })
                .catch(error => {
                    console.log(error)
                })

        }

    }

    return (
        <Layout>
            <FormNuevaCategoria
                categoriaRef={categoriaRef}
                descripcionRef={descripcionRef}
                registrarCategorias={registrarCategorias}
                errores={errores}
            />
        </Layout>
    )
}

export default Nuevo