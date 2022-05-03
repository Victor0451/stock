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
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    Textarea,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,

} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalDetalleCuenta = ({
    row,
    traerDetallesCuenta,
    detalles,
    calcTotales
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
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    traerDetallesCuenta(row)
                }}
            >
                <ViewIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles de la venta N°: {row.idventa} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'5xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box p="4" alignItems="center" justifyContent="space-between" >

                                <TableContainer
                                    bgColor={"white"}
                                    textColor="black"
                                    p="4"
                                    borderRadius="xl"
                                >
                                    <Table
                                        size='sm'
                                    >
                                        <Thead>
                                            <Tr>
                                                <Th>Codigo</Th>
                                                <Th>Producto</Th>
                                                <Th isNumeric>Cantidad</Th>
                                                <Th isNumeric>Importe</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            {
                                                detalles.map((d, index) => (
                                                    <Tr key={index}>
                                                        <Td>{d.codigo}</Td>
                                                        <Td>{d.producto}</Td>
                                                        <Td isNumeric >{d.cantidad}</Td>
                                                        <Td isNumeric>{d.importe}</Td>
                                                    </Tr>
                                                ))
                                            }

                                        </Tbody>
                                        <Tfoot>
                                            <Tr>
                                                <Th>Total</Th>
                                                <Th></Th>
                                                <Th isNumeric >{calcTotales(detalles, 'cant')}</Th>
                                                <Th isNumeric >{calcTotales(detalles, 'imp')}</Th>
                                            </Tr>
                                        </Tfoot>
                                    </Table>
                                </TableContainer>


                            </Box>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalDetalleCuenta