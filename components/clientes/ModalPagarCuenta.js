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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,

} from '@chakra-ui/react'

import { CheckIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalPagarCuenta = ({
    row,
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
                colorScheme="green"
                size='xs'
                ml="1"
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    guardarDeduda(row.importe - row.pagado)


                }}
            >
                <CheckIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="4xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Pagar Cuenta </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'5xl'} mt={2} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" >

                                <FormControl isRequired w="xs" mt="5" >
                                    <FormLabel >Importe de la Cuenta</FormLabel>
                                    <Input type='text' value={row.importe} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="5" >
                                    <FormLabel >Importe Abonado</FormLabel>
                                    <Input type='text' value={row.pagado} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="5">
                                    <FormLabel >Saldo Pendiente</FormLabel>
                                    <NumberInput value={deuda} precision={2} step={0.2} >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl isRequired w="xs" mt="5">
                                    <FormLabel >Importe a pagar</FormLabel>
                                    <NumberInput
                                        defaultValue={0}
                                        precision={2}
                                        step={0.2}

                                        onChange={() => calcDeduda(row.importe - row.pagado)}>
                                        <NumberInputField ref={pagoRef} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl isRequired w="xs" mt="12" >
                                    <Button
                                        colorScheme={"blue"}
                                        onClick={() => pagoCuenta(row)}
                                    >
                                        Registrar
                                    </Button>
                                </FormControl>

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

export default ModalPagarCuenta