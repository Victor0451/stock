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


const FacturaImpresion = ({
    ventas,
    totalFacturacion
}) => {
    return (
        <Box
            p={4}
            bgColor="white"
            color={"black"}

        >
            <Box
                border="1px"
                borderColor={"black"}
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
                        >
                            <Text>Sistema Stock</Text>
                        </Box>
                        <Center w='50px' >
                            <Text mt={3} >X</Text>
                        </Center>

                        <Box
                            flex='1'
                            borderLeft="1px"
                            borderColor={"black"}
                        >
                            <Text>
                                Factura: {ventas[0].nfactura}
                            </Text>
                            <Text>
                                Fecha: {moment(ventas[0].fecha).format('DD/MM/YYYY HH:mm:ss')}
                            </Text>
                            <Text>
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
                                    <Th isNumeric>Precio</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {ventas.map((v, index) => (
                                    <Tr key={index}>
                                        <Td>{v.codigo}</Td>
                                        <Td>{v.descripcion}</Td>
                                        <Td isNumeric>1</Td>
                                        <Td isNumeric>{v.precio_venta}</Td>

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







        </Box >
    )
}

export default FacturaImpresion