import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import jsCookie from 'js-cookie'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import moment from 'moment'
import { registrarHistoria } from '../../utils/funciones'
import { confirmAlert } from 'react-confirm-alert'; // Import


const Factura = () => {

    const [usuario, guardarUsuario] = useState(null)

    let token = jsCookie.get("token")


    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

        }
    }, []);

    return (
        <Layout>factura</Layout>
    )
}

export default Factura