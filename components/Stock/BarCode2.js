import React from 'react'
import Code from 'react-jsbarcode';
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

const BarCode = ({
    arr,
    row
}) => {

    return (

        <>

            {
                arr ? (
                    <Box p={5}>
                        {

                            arr.map((e, idx) => (
                                <Box className='row ' p={"2"} id="s">
                                    <Stack className='col-7' border={"1px"} borderColor="black" >
                                        <Text fontSize={"sm"}>{e.marca}</Text>
                                        <Code
                                            value={e.codigo}
                                            options={{
                                                format: 'code128',
                                                width: 1,
                                                height: 40,
                                                textMargin: 0,
                                                fontOptions: "bold",
                                                margin: 1.5

                                            }}
                                            renderer="svg"
                                        />
                                        <Text fontSize={"sm"} >{e.producto} </Text>
                                    </Stack>
                                    <Stack className='col-5' border={"1px"} borderColor="black">
                                        <Text align={"center"}  fontSize={"4xl"} mt={10}>${e.precio_venta} </Text>
                                    </Stack>
                                </Box>

                            ))
                        }



                    </Box>
                ) : row ? (
                    <Box className='row ' p={"2"} id="s">
                        <Stack className='col-8' border={"1px"} borderColor="black" >
                            <Text fontSize={"sm"}>{row.marca}</Text>
                            <Code
                                value={row.codigo}
                                options={{
                                    format: 'code128',
                                    width: 1,
                                    height: 40,
                                    textMargin: 0,
                                    fontOptions: "bold",
                                    margin: 1.5

                                }}
                                renderer="svg"
                            />
                            <Text fontSize={"sm"} >{row.producto} </Text>
                        </Stack>
                        <Stack className='col-4' border={"1px"} borderColor="black">
                            <Text align={"center"}  fontSize={"4xl"} mt={10}>${row.precio_venta} </Text>
                        </Stack>
                    </Box>

                )

                    : null
            }


        </>


    )
}

export default BarCode