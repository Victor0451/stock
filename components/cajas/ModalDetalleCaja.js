import React from 'react'
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
    useColorModeValue,
    Alert,
    Stack,
    Heading,
    Text,
    AlertIcon,
    AlertDescription,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tfoot
} from '@chakra-ui/react'

import { CalendarIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalDetalleCaja = ({
    row,
    traerDetalleCaja,
    cajaDetalle,
    ingresos,
    egresos,
    calcTotal,
    imprimir
}) => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)


    return (
        <>
            <Button
                colorScheme="blue"
                size='xs'
                ml="1"
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    traerDetalleCaja(row)
                }}
            >
                <CalendarIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="8xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader><u>Detalles de Caja</u>: fecha: {moment(row.fecha).format('DD/MM/YYYY')} - turno: {row.turno}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='gray.500' borderRadius="xl" id={"caja"}>

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}><u>Detalles de Caja</u>: fecha: {moment(row.fecha).format('DD/MM/YYYY')} - turno: {row.turno}</Heading>

                            </Stack>

                            <Box className='row' p="2" mt={5}>

                                {ingresos.length === 0 ? (
                                    <Alert
                                        mt={5}
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
                                        mt={5}
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


                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {ingresos.map((i, index) => (
                                                    <Tr key={index}>
                                                        <Td>{i.detalle}</Td>
                                                        <Td isNumeric>{i.importe}</Td>
                                                        <Td >{moment(i.fecha).format('DD/MM/YYYY')}</Td>
                                                        <Td >{i.hora}</Td>
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
                                        mt={5}
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
                                        mt={5}
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
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {egresos.map((e, index) => (
                                                    <Tr key={index}>
                                                        <Td>{e.detalle}</Td>
                                                        <Td isNumeric>{e.importe}</Td>
                                                        <Td >{moment(e.fecha).format('DD/MM/YYYY')}</Td>
                                                        <Td >{e.hora}</Td>
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

                        </Container>

                        <Box className='row' p="4" justifyContent="end">

                            <Button colorScheme='blue' size='md' onClick={imprimir}>
                                Imprimir
                            </Button>

                            <Button colorScheme={"red"} ml="1" onClick={onClose}>Cancelar</Button>

                        </Box>

                    </ModalBody>


                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ModalDetalleCaja