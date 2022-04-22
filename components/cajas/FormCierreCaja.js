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
    Alert,
    AlertIcon,
    AlertDescription,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    SkeletonText,
    SkeletonCircle
} from '@chakra-ui/react';

import {
    DeleteIcon, EditIcon
} from '@chakra-ui/icons'

import Link from 'next/link';
import moment from 'moment';
import LoadForm from '../Layouts/LoadForm';
import ModalEditar from './ModalEditar';
import ModalIngreso from '../facturacion/ModalIngreso';
import ModalEgreso from '../facturacion/ModalEgreso';
import ModalIniciarCaja from '../facturacion/ModalIniciarCaja';

const FormCierreCaja = ({
    estCaja,
    ingresos,
    egresos,
    calcTotal,
    detalleRef,
    importeRef,
    movimientoRef,
    editarMovimiento,
    errores,
    bajaMovimiento,
    usuario,
    iniciarCaja,
    turnoRef,
    saldoRef,
    importeIRef,
    detalleIRef,
    importeERef,
    detalleERef,
    registrarMovimiento,
    cerrarCaja,
    flag
}) => {

    if (estCaja === "No") return (
        <Alert
            className='mt-4 '
            status='info'
            ariant='left-accent'
            justifyContent="center"
            alignItems={"center"}
        >
            <AlertIcon />
            <AlertDescription>No tienes cajas abiertas. <ModalIniciarCaja
                usuario={usuario}
                iniciarCaja={iniciarCaja}
                turnoRef={turnoRef}
                saldoRef={saldoRef}
            /></AlertDescription>
        </Alert>
    )



    return (
        <Box
            p={4}
            maxW={"8xl"}
            justifyContent="center"
            alignItems={"center"}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Gestion de Caja</Heading>
                <Text fontSize={'xl'}>
                    Gestion de movimientos y cierre de caja.
                </Text>
            </Stack>

            <Container maxW={"6xl"} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >

                <Text mt={5} fontSize={'xl'}>
                    <u>Detalles de Caja</u>
                </Text>

                {
                    flag === false ? (<LoadForm />)
                        : (


                            <Box className='row' p="4" justifyContent="space-between">
                                <Text fontSize={'xl'}>
                                    Turno: {estCaja.body[0].turno}
                                </Text>

                                <Text fontSize={'xl'}>
                                    Fecha: {moment(estCaja.body[0].fecha).format('DD/MM/YYYY')}
                                </Text>


                                <Text fontSize={'xl'}>
                                    Cajero: {estCaja.body[0].usuario}
                                </Text>
                            </Box>

                        )}


                {
                    flag === false ? (<LoadForm />)
                        : (
                            <Box className='row' p="4" alignItems="center" justifyContent={"space-around"}>


                                <ModalIngreso
                                    importeRef={importeIRef}
                                    detalleRef={detalleIRef}
                                    usuario={usuario}
                                    registrarMovimiento={registrarMovimiento}
                                />

                                <ModalEgreso
                                    importeERef={importeERef}
                                    detalleERef={detalleERef}
                                    usuario={usuario}
                                    registrarMovimiento={registrarMovimiento}
                                />

                                <Link href='/cajas/cierre'>
                                    <Button
                                        colorScheme={"yellow"}
                                        ml={1}
                                        onClick={() => cerrarCaja(estCaja.body[0])}
                                    >
                                        Cerrar Caja
                                    </Button>
                                </Link>



                            </Box>

                        )}


                {
                    flag === false ? (<LoadForm />)
                        : (

                            <>
                                <Box className='row' p="2" mt={5}>

                                    {ingresos.length === 0 ? (
                                        <Alert
                                            className='mt-4 '
                                            status='info'
                                            ariant='left-accent'
                                            justifyContent="center"
                                            alignItems={"center"}
                                        >
                                            <AlertIcon />
                                            <AlertDescription>No hay ingresos registrados.</AlertDescription>
                                        </Alert>
                                    ) : (


                                        <TableContainer
                                            className='col-md-6'
                                            bg={"white"}
                                            color="black"
                                            border='1px'
                                            borderColor='gray.500'
                                            borderRadius="xl"
                                        >
                                            <Text mb={5} fontSize={'xl'}>
                                                <u>Ingresos</u>
                                            </Text>
                                            <Table size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Detalle</Th>
                                                        <Th isNumeric>Importe</Th>
                                                        <Th>Fecha</Th>
                                                        <Th>Hora</Th>
                                                        <Th>Acciones</Th>

                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {ingresos.map((i, index) => (
                                                        <Tr key={index}>
                                                            <Td>{i.detalle}</Td>
                                                            <Td isNumeric>{i.importe}</Td>
                                                            <Td >{moment(i.fecha).format('DD/MM/YYYY')}</Td>
                                                            <Td >{i.hora}</Td>
                                                            <Td >

                                                                <ModalEditar
                                                                    detalleRef={detalleRef}
                                                                    importeRef={importeRef}
                                                                    movimientoRef={movimientoRef}
                                                                    editarMovimiento={editarMovimiento}
                                                                    errores={errores}
                                                                    row={i}
                                                                />
                                                                <Button size={"xs"} ml="1" colorScheme="red" onClick={() => bajaMovimiento(i)}><DeleteIcon /></Button>

                                                            </Td>

                                                        </Tr>
                                                    ))}
                                                </Tbody>

                                                <Tfoot>
                                                    <Tr>
                                                        <Th>Total</Th>
                                                        <Th isNumeric>$ {calcTotal(ingresos)}</Th>
                                                    </Tr>
                                                </Tfoot>
                                            </Table>
                                        </TableContainer>

                                    )}



                                    {egresos.length === 0 ? (
                                        <Alert
                                            className='mt-4 '
                                            status='info'
                                            ariant='left-accent'
                                            justifyContent="center"
                                            alignItems={"center"}
                                        >
                                            <AlertIcon />
                                            <AlertDescription>No hay egresos registrados.</AlertDescription>
                                        </Alert>
                                    ) : (


                                        <TableContainer
                                            className='col-md-6'
                                            bg={"white"}
                                            color="black"
                                            border='1px'
                                            borderColor='gray.500'
                                            borderRadius="xl"
                                        >

                                            <Text mb={5} fontSize={'xl'}>
                                                <u>Egresos</u>
                                            </Text>

                                            <Table size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Detalle</Th>
                                                        <Th isNumeric>Importe</Th>
                                                        <Th>Fecha</Th>
                                                        <Th>Hora</Th>
                                                        <Th>Acciones</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {egresos.map((e, index) => (
                                                        <Tr key={index}>
                                                            <Td>{e.detalle}</Td>
                                                            <Td isNumeric>{e.importe}</Td>
                                                            <Td >{moment(e.fecha).format('DD/MM/YYYY')}</Td>
                                                            <Td >{e.hora}</Td>
                                                            <Td >

                                                                <ModalEditar
                                                                    detalleRef={detalleRef}
                                                                    importeRef={importeRef}
                                                                    movimientoRef={movimientoRef}
                                                                    editarMovimiento={editarMovimiento}
                                                                    errores={errores}
                                                                    row={e}
                                                                />
                                                                <Button size={"xs"} ml="1" colorScheme="red" onClick={() => bajaMovimiento(e)}><DeleteIcon /></Button>

                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>

                                                <Tfoot>
                                                    <Tr>
                                                        <Th>Total</Th>
                                                        <Th isNumeric>$ {calcTotal(egresos)}</Th>

                                                    </Tr>
                                                </Tfoot>
                                            </Table>
                                        </TableContainer>


                                    )}

                                </Box>


                                <Box className='row' p="4" justifyContent="end" mt="6">


                                    <Link href='/facturacion/venta'>
                                        <Button colorScheme='red' size='md' ml="2" >
                                            Cancelar
                                        </Button>
                                    </Link>

                                </Box>
                            </>

                        )}


            </Container >
        </Box >
    )
}

export default FormCierreCaja