import React, { useEffect } from 'react'
import bwipjs from 'bwip-js';

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

const BarCode = ({ arr }) => {


    useEffect(() => {

        if (arr) {
            try {
                arr.map((e, idx) => {

                    let canvas = bwipjs.toCanvas(e.codigo, {
                        bcid: "code128", // Barcode type
                        text: `${e.codigo}`, // Text to encode
                        scale: 2, // 3x scaling factor
                        height: 10, // Bar height, in millimeters
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


    return (
        <Box className='row' p={2} >


            {
                arr ? (
                    <>
                        {
                            arr.map((e, idx) => (
                                <Box className='col-md-3' border={"1px"} borderColor="black">
                                    <Text fontSize={"xs"}>{e.marca}</Text>
                                    <canvas id={e.codigo}></canvas>
                                    <Text fontSize={"xs"} mt={2}>{e.producto} ${e.precio_venta} </Text>
                                </Box>
                            ))
                        }
                    </>
                ) : null
            }


        </Box>
    )
}

export default BarCode