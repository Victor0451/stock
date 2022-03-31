import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import FacturaImpresion from '../../components/facturacion/FacturaImpresion'


const Factura = () => {

    let router = useRouter()

    const [usuario, guardarUsuario] = useState(null)
    const [ventas, guardarVentas] = useState(null)

    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerVenta()

        }
    }, []);

    const traerVenta = async () => {

        await axios.get(`/api/facturacion/facturacion`, {
            params: {
                f: "factura",
                idventa: router.query.idventa
            }
        })
            .then(res => {

                if (res.data.msg === "Ventas Encontradas") {
                    guardarVentas(res.data.body)
                }
            })
            .catch(error => {
                console.log(error)
            })




    }

    const totalFacturacion = (arr) => {

        let total = 0

        for (let i = 0; i < arr.length; i++) {
            total += arr[i].precio_venta

        }

        return total.toFixed(2)

    }

    const imprimir = () => {

        let contenido = document.getElementById("factura").innerHTML;

        let contenidoOrg = document.body.innerHTML;

        document.body.innerHTML = contenido;

        window.print();

        document.body.innerHTML = contenidoOrg;

        Router.replace('/facturacion/venta')

    };

    return (
        <Layout>
            {!ventas ? (null) :
                (
                    <FacturaImpresion
                        ventas={ventas}
                        totalFacturacion={totalFacturacion}
                        imprimir={imprimir}
                    />
                )}

        </Layout>
    )
}

export default Factura