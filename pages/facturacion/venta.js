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
import ModalFactura from '../../components/facturacion/ModalFactura'

const Venta = () => {

    let codigoRef = React.createRef()

    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [listado, guardarListado] = useState([])
    const [nfact, guardarNFactura] = useState(null)

    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerNFactura()

        }
    }, []);

    const buscarProducto = async () => {

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

                        if (res.data.body[0].stock <= 5 && res.data.body[0].stock > 1) {

                            toastr.warning(`Este producto tiene un stock bajo: ${res.data.body[0].stock} unidades`, "ATENCION")

                            guardarListado([...listado, res.data.body[0]])

                            updateStock("menos", res.data.body[0].codigo)

                        } else if (res.data.body[0].stock === 1) {

                            toastr.warning(`Esta es la ultima unidad de este producto`, "ATENCION")

                            guardarListado([...listado, res.data.body[0]])

                            updateStock("menos", res.data.body[0].codigo)

                        } else if (res.data.body[0].stock === 0) {

                            toastr.error(`Este producto ya no tiene stock, no se realizara la venta`, "ATENCION")

                        } else if (res.data.body[0].stock >= 6) {

                            toastr.success(`Producto facturado`, "ATENCION")

                            guardarListado([...listado, res.data.body[0]])

                            updateStock("menos", res.data.body[0].codigo)
                        }



                    } else if (res.data === "No hay Producto") {

                        toastr.warning("No se encontro el producto", "ATENCION")

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

    const updateStock = async (f, codigo) => {

        const datos = {
            f: f,
            codigo: codigo
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

        const venta = {
            nfactura: `${nfact} - ${moment().format('YYYY')}`,
            importe: totalFacturacion(),
            cantidad: listado.length,
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            usuario: usuario,
            f: "venta"
        }


        await axios.post(`/api/facturacion/facturacion`, venta)
            .then(res => {
                console.log(res.data.body)
                if (res.data.msg === "Venta Registrada") {
                    toastr.success("La venta fue registrada", "ATENCION")
                }
            }).catch(error => {
                console.log(error)
            })


        const ventaProd = {
            idventa: nfact,
            codigo: "",
            cantidad: 1,
            importe: "",
            f: "ventaProd"
        }


        for (let i = 0; i < listado.length; i++) {
            ventaProd.codigo = listado[i].codigo
            ventaProd.importe = listado[i].precio_venta

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


    return (


        <Layout>
            <FormVentas
                listado={listado}
                errores={errores}
                codigoRef={codigoRef}
                buscarProducto={buscarProducto}
                totalFacturacion={totalFacturacion}
                bajaProducto={bajaProducto}
                finalizarVenta={finalizarVenta}
                nfact={`${nfact} - ${moment().format('YYYY')}`}
            />


        </Layout>
    )
}

export default Venta