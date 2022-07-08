import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie'
import axios from 'axios'
import toastr from 'toastr'
import Router from 'next/router'
import Layout from '../../components/Layouts/Layout';
import ReactToPrint from 'react-to-print';
import bwipjs from 'bwip-js';
import { useRouter } from 'next/router'


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Container,
    Box,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    Alert,
    AlertDescription,
    AlertIcon,
    Textarea,
    Select,
    Image,
    Text
} from '@chakra-ui/react'

import BarCode from '../../components/Stock/BarCode'

const codigos = () => {



    const [listado, guardarListado] = useState(null)


    const traerStock = async (id) => {

        if (id === "") {

            await axios.get(`/api/stock/productos`, {
                params: {
                    f: "todo"
                }
            })
                .then(res => {

                    if (res.data.msg === "Productos Encontrados") {

                        toastr.success("Generando stock", "ATENCION")
                        guardarListado(res.data.body)

                    } else if (res.data.msg === "No Hay Productos") {

                        toastr.warning("No hay productos registrados", "ATENCION")

                    }

                })
                .catch(error => {
                    console.log(error)

                    toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
                })
        } else {

            await axios.get(`/api/stock/productos`, {
                params: {
                    f: "cate",
                    id: id
                }
            })
                .then(res => {

                    if (res.data.msg === "Productos Encontrados") {

                        toastr.success("Generando stock", "ATENCION")
                        guardarListado(res.data.body)

                    } else if (res.data.msg === "No Hay Productos") {

                        toastr.warning("No hay productos registrados", "ATENCION")

                    }

                })
                .catch(error => {
                    console.log(error)

                    toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
                })
        }


    }

    let token = jsCookie.get("token")

    let router = useRouter()


    let id = router.query.id

    if (id) {

        jsCookie.set("idCate", id)
    }


    useEffect(() => {

        if (!token) {
            Router.push("/redirect");
        } else {

            if (jsCookie.get("idCate")) {

                traerStock(jsCookie.get("idCate"))
            }

        }


    }, []);

    return (
        <Layout
            f={"codigo"}
        >
            {listado ? (

                <Box
                    p={4}>
                    <BarCode
                        arr={listado}
                    />
                </Box>
            ) : null}



        </Layout>
    )
}

export default codigos
