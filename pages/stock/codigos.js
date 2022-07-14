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
    Text,
    Stack
} from '@chakra-ui/react'

import BarCode from '../../components/Stock/BarCode2'

const codigos = () => {



    const [listado, guardarListado] = useState(null)

    const [list1, guardarList1] = useState([])
    const [list2, guardarList2] = useState([])
    const [list3, guardarList3] = useState([])


    const traerStock = async (id, f) => {

        if (f === 0) {

            if (id === "todo") {

                await axios.get(`/api/stock/productos`, {
                    params: {
                        f: "todo"
                    }
                })
                    .then(res => {

                        if (res.data.msg === "Productos Encontrados") {

                            // toastr.success("Generando stock", "ATENCION")
                            guardarListado(res.data.body)

                            segmentarArray(res.data.body)

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

                            // toastr.success("Generando stock", "ATENCION")
                            guardarListado(res.data.body)

                            segmentarArray(res.data.body)

                        } else if (res.data.msg === "No Hay Productos") {

                            toastr.warning("No hay productos registrados", "ATENCION")

                        }

                    })
                    .catch(error => {
                        console.log(error)

                        toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
                    })
            }


        } else if (f === 1) {

            await axios.get(`/api/stock/productos`, {
                params: {
                    f: "codigo",
                    id: id
                }
            })
                .then(res => {

                    if (res.data.msg === "Productos Encontrados") {

                        // toastr.success("Generando stock", "ATENCION")
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

    const segmentarArray = (arr) => {

        let total = arr

        let p1 = Math.floor(total.length / 3);

        let p2 = p1 * 2;

        let list1 = total.slice(0, p1);
        guardarList1(list1)

        let list2 = total.slice(p1, p2);
        guardarList2(list2)

        let list3 = total.slice(p2, total.length);
        guardarList3(list3)

    }

    let token = jsCookie.get("token")

    useEffect(() => {

        if (!token) {
            Router.push("/redirect");
        } else {


            if (jsCookie.get("idCate") && !jsCookie.get("codigo")) {

                traerStock(jsCookie.get("idCate"), 0)

            } else if (!jsCookie.get("idCate") && jsCookie.get("codigo")) {

                traerStock(jsCookie.get("codigo"), 1)

            }

        }


    }, []);


    return (
        <Layout
            f={"codigo"}

        >
            <Box
                className="row"
            >

                {!jsCookie.get("codigo") ? (
                    <>

                        <Box className='col-md-4' id="cod">
                            {listado ? (
                                <BarCode
                                    arr={list1}
                                />
                            ) : null}
                        </Box>

                        <Box className='col-md-4' id="cod">
                            {listado ? (
                                <BarCode
                                    arr={list2}
                                />
                            ) : null}
                        </Box>

                        <Box className='col-md-4' id="cod">
                            {listado ? (
                                <BarCode
                                    arr={list3}
                                />
                            ) : null}
                        </Box>

                    </>
                ) : (

                    <Box className='col-md-4' id="cod">
                        {listado ? (
                            <BarCode
                                arr={listado}
                            />
                        ) : null}
                    </Box>
                )}

            </Box>


        </Layout >
    )
}

export default codigos
