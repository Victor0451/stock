import React, { useEffect } from 'react'
import bwipjs from 'bwip-js';
import { jsPDF } from "jspdf";

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
    Heading,
    Text,
    Stack,
    Center,
    Flex,
    Badge,
} from '@chakra-ui/react'

const BarCode = ({ arr }) => {


    useEffect(() => {

        if (arr) {
            try {
                arr.map((e, idx) => {

                    let canvas = bwipjs.toCanvas(e.codigo, {
                        bcid: "code128", // Barcode type
                        text: `${e.codigo}`, // Text to encode
                        scale: 1, // 3x scaling factor
                        height: 5, // Bar height, in millimeters                        
                        includetext: true, // Show human-readable text
                        textxalign: "center" // Always good to set this
                    });
                    return canvas;
                });
            } catch (e) {
                // `e` may be a string or Error object
            }
        }


    }, []);





    function printPDF() {
        var doc = new jsPDF();

        //var source = $('#pdf').get(0)
        const source = document.getElementById('pdf')


        doc.html(source, {
            'x': 15,
            'y': 15,
            'width': "100%",

        }).then(() => {
            doc.save("dd");
        }).catch(error => {
            console.log(error)
        })



    }


    return (


        <>

            {
                arr ? (
                    <>
                        {
                            arr.map((e, idx) => (
                                <Box className='row' p={"2"}>
                                    <Stack className='col-7' border={"1px"} borderColor="black">
                                        <Text fontSize={"sm"}>{e.marca}</Text>
                                        <canvas id={e.codigo}></canvas>
                                        <Text fontSize={"sm"} >{e.producto} </Text>
                                    </Stack>
                                    <Stack className='col-4' border={"1px"} borderColor="black">
                                        <Text align={"center"} fontSize={"2xl"} mt={10}>${e.precio_venta} </Text>
                                    </Stack>
                                </Box>

                            ))
                        }



                    </>
                ) : null
            }


        </>

    )
}

export default BarCode