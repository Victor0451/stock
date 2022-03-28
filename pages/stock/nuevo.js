import React, { useEffect, useState } from 'react'
import FormNuevoStock from '../../components/Stock/FormNuevoStock'
import Layout from '../../components/Layouts/Layout'
import jsCookie from 'js-cookie'
import moment from 'moment'
import toastr from 'toastr'
import axios from 'axios'
import { registrarHistoria } from '../../utils/funciones'
import Router from 'next/router'

const Nuevo = () => {

    let categoriaRef = React.createRef()
    let proveedorRef = React.createRef()
    let marcaRef = React.createRef()
    let productoRef = React.createRef()
    let stockRef = React.createRef()
    let precioListaRef = React.createRef()
    let precioVentaRef = React.createRef()
    let codigoRef = React.createRef()
    let descripcionRef = React.createRef()
    let precioMayoristaRef = React.createRef()


    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [imagen, guardarImagen] = useState(null);
    const [cate, guardarCate] = useState(null)
    const [provee, guardarProvee] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null);


    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerCategorias()

            traerProveedores()
        }

    }, []);


    const registrarProducto = async () => {

        guardarErrores(null)

        let prod = {
            categoria: categoriaRef.current.value,
            proveedor: proveedorRef.current.value,
            marca: marcaRef.current.value,
            producto: productoRef.current.value,
            precio_lista: precioListaRef.current.value,
            precio_venta: precioVentaRef.current.value,
            stock: stockRef.current.value,
            estado: 1,
            fecha_alta: moment().format("YYYY-MM-DD HH:mm:ss"),
            codigo: codigoRef.current.value,
            descripcion: descripcionRef.current.value,
            precio_mayorista: precioMayoristaRef.current.value
        }

        if (prod.categoria === "") {
            guardarErrores("Debes elegir una categoria")
        }
        // else if (prod.proveedor === "") {
        //     guardarErrores("Debes elegir un proveedor")
        // }
        else if (prod.marca === "") {
            guardarErrores("Debes ingresar una marca")
        } else if (prod.producto === "") {
            guardarErrores("Debes ingresar un producto")
        } else if (prod.precio_lista === "") {
            guardarErrores("Debes ingresar el precio se lista")
        } else if (prod.precio_venta === "") {
            guardarErrores("Debes ingresar el precio se venta")
        } else if (prod.precio_lista === "") {
            guardarErrores("Debes ingresar el precio se lista")
        } else if (prod.stock === "") {
            guardarErrores("Debes ingresar el stock")
        } else if (prod.codigo === "") {
            guardarErrores("Debes ingresar o escanear el codigo de barras del producto")
        } else {

            await axios.post(`/api/stock/productos`, prod)
                .then(res => {
                    console.log(req.data.body)
                    if (res.data.msg === "Producto Registrado") {

                        if (imagen) {
                            subirImagen(res.data.body.insertId)
                        }

                        toastr.success("El producto se registro correctamente", "ATENCION")

                        let accion = `Se registro el producto id: ${res.data.body.insertId} con un stock inicial de: ${prod.stock}, precio de lista: ${prod.precio_lista} y precio de venta: ${prod.precio_venta}`

                        let id = `PD - ${res.data.body.insertId}`

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

    const handlerArchivos = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            guardarImagen(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const subirImagen = async (idP) => {

        const body = new FormData();

        body.append("file", imagen);

        await axios.post(`/api/stock/imagenes/`, body)

            .then(res => {

                if (res.data === "Imagen Subida") {

                    let prod = {
                        id: idP,
                        imagen: `${imagen.name}`,
                        f: 'imagen'
                    }

                    axios.put('/api/stock/productos', prod)


                    let accion = `Se subio una imagen al producto id: ${idP}.`

                    let id = `PD - ${idP}`

                    registrarHistoria(accion, usuario, id)

                }
            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })

    };

    const traerCategorias = async () => {

        await axios.get(`/api/categorias/categoria`)

            .then(res => {

                if (res.data.msg === "Categorias Encontradas") {

                    guardarCate(res.data.body)

                } else if (res.data.msg === "No hay Categorias") {

                    toastr.warning("No hay categorias registradas", "ATENCION")

                }

            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })


    }

    const traerProveedores = async () => {

        await axios.get(`/api/proveedores/proveedor`)

            .then(res => {

                if (res.data.msg === "Proveedores Encontrados") {

                    guardarProvee(res.data.body)

                } else if (res.data.msg === "No hay Proveedores") {

                    toastr.warning("No hay categorias registradas", "ATENCION")

                }

            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })


    }

    return (

        <Layout>
            <FormNuevoStock
                categoriaRef={categoriaRef}
                proveedorRef={proveedorRef}
                marcaRef={marcaRef}
                productoRef={productoRef}
                stockRef={stockRef}
                precioListaRef={precioListaRef}
                precioVentaRef={precioVentaRef}
                codigoRef={codigoRef}
                descripcionRef={descripcionRef}
                precioMayoristaRef={precioMayoristaRef}
                errores={errores}
                cate={cate}
                provee={provee}
                registrarProducto={registrarProducto}
                subirImagen={subirImagen}
                handlerArchivos={handlerArchivos}
            />
        </Layout>

    )
}

export default Nuevo