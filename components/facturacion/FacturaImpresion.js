import React from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Center,
    Square,

    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,

} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';


const FacturaImpresion = ({
    ventas,
    totalFacturacion,
    imprimir
}) => {
    return (
        <Box
        width={"4xl"}
           


        >
            <Box
                id="factura"
                bgColor="white"
                color={"black"}
                p="4"
                //width={"4xl"}
            >
                <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                    <Heading
                        fontSize={'xl'}
                        border="1px"
                        borderColor={"black"}
                    >
                        ORIGINAL
                    </Heading>

                    <Flex
                        border="1px"
                        borderColor={"black"}
                    >
                        <Box
                            flex='1'
                            borderRight="1px"
                            borderColor={"black"}
                            p="4"
                        >
                            <Text>ELOY - Despensa y Polleria</Text>
                            <Text
                                textAlign="start"
                                fontSize='xs'
                            >
                                San Martin de Porres, pasaje San Lorenzo N° 355 Catamarca
                            </Text>

                        </Box>
                        <Center w='50px' >
                            <Text mt={3} >X</Text>
                        </Center>

                        <Box
                            flex='1'
                            borderLeft="1px"
                            borderColor={"black"}
                            textAlign="start"
                            p="4"
                        >
                            <Text fontSize='xs'>
                                Factura: {ventas[0].nfactura}
                            </Text>
                            <Text fontSize='xs'>
                                Fecha: {moment(ventas[0].fecha).format('DD/MM/YYYY HH:mm:ss')}
                            </Text>
                            <Text fontSize='xs'>
                                Cajero: {ventas[0].usuario}
                            </Text>

                        </Box>
                    </Flex>
                </Stack>

                <Stack
                    spacing={4}
                    as={Container}
                    maxW={'3xl'}
                    textAlign={'center'}

                >
                    <TableContainer
                        border="1px"
                        borderColor={"black"}
                    >
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Codigo</Th>
                                    <Th>Descripcion</Th>
                                    <Th isNumeric>Cantidad</Th>
                                    <Th isNumeric>Pre. Unit.</Th>
                                    <Th isNumeric>Precio</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {ventas.map((v, index) => (
                                    <Tr key={index}>
                                        <Td>{v.codigo}</Td>
                                        <Td>{v.descripcion}</Td>
                                        <Td isNumeric>{v.cantidad}</Td>
                                        <Td isNumeric>{v.precio_venta}</Td>
                                        <Td isNumeric>{v.precio_venta * v.cantidad}</Td>

                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>Total</Th>
                                    <Th isNumeric>$ {totalFacturacion(ventas)}</Th>

                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>


                </Stack>
            </Box>


            <Stack
                border={"1px"}
                mt={10}
                p="4"
                spacing={4}
                as={Container}
                maxW={'3xl'}
                textAlign={'center'}>
                <Heading fontSize={'2xl'}>Opciones</Heading>
                <Text fontSize={'xl'}>
                    <Button colorScheme={"blue"} onClick={imprimir}>Imprimir</Button>
                    <Link href={'/facturacion/venta'}>
                        <Button ml={2} colorScheme={"green"} >Realizar Venta</Button>
                    </Link>
                </Text>
            </Stack>


        </Box >
    )
}

export default FacturaImpresion