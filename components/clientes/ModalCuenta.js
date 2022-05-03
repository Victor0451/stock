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
    Textarea

} from '@chakra-ui/react'

import { CalendarIcon } from '@chakra-ui/icons'
import moment from 'moment'
import ListadoCuentas from './ListadoCuentas'


const ModalCuenta = ({
    row,
    traerCuenta,
    cuentas,
    traerDetallesCuenta,
    detalles,
    calcTotales,
    calcDeduda,
    deuda,
    pagoRef,
    guardarDeduda,
    pagoCuenta
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
                colorScheme="orange"
                ml="1"
                size='xs'
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    traerCuenta(row)
                }}
            >
                <CalendarIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="4xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Cuenta Cliente DNI: {row.dni} - {row.apellido}, {row.nombre}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box p="4" alignItems="center" justifyContent="space-between" >

                                <ListadoCuentas
                                    listado={cuentas}
                                    traerDetallesCuenta={traerDetallesCuenta}
                                    detalles={detalles}
                                    calcTotales={calcTotales}
                                    clien={`${row.dni} - ${row.apellido}, ${row.nombre}`}
                                    calcDeduda={calcDeduda}
                                    deuda={deuda}
                                    pagoRef={pagoRef}
                                    guardarDeduda={guardarDeduda}
                                    pagoCuenta={pagoCuenta}

                                />

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

export default ModalCuenta