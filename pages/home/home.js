import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout';
import HomeScreen from '../../components/home/HomeScreen';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';
import toastr from 'toastr';


const Home = () => {


  const [usuario, guardarUsuario] = useState(null)
  const [listado, guardarListado] = useState(null)

  let token = jsCookie.get("token")


  useEffect(() => {
    if (!token) {
      Router.push("/redirect");
    } else {
      let usuario = jsCookie.get("usuario")
      guardarUsuario(usuario)

      traerStockEnAlerta()
    }

  }, []);

  const traerStockEnAlerta = async () => {
    await axios.get(`/api/stock/stock`)

      .then(res => {

        if (res.data.msg === "Productos Encontrados") {

          toastr.warning("Existen productos con bajo stock", "ATENCION")

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

  return (

    <Layout>
      <HomeScreen
        listado={listado}
      />
    </Layout>


  )
}

export default Home