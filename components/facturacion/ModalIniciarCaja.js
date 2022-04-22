import React, { useMemo } from 'react'
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
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,


} from '@chakra-ui/react'


import moment from 'moment';
import toastr from 'toastr';

const ModalIniciarCaja = ({
    usuario,
    iniciarCaja,
    turnoRef,
    saldoRef,
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

                colorScheme={"blue"}

                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                Iniciar Caja
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="4xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Iniciar Caja</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <Container maxW={'100%'} mt={3}  >

                                    <Box className='row' p="4" alignItems="center" justifyContent="space-between">
                                        <FormControl isRequired w="xs" >
                                            <FormLabel >Turno</FormLabel>
                                            <Select placeholder='Selecciona una opcion' ref={turnoRef}>
                                                <option value={"mañana"}>Mañana</option>
                                                <option value={"tarde"}>Tarde</option>
                                            </Select>
                                        </FormControl>

                                        <FormControl isRequired w="xs" >
                                            <FormLabel >Saldo Inicial</FormLabel>
                                            <NumberInput defaultValue={0} precision={2} step={0.2} >
                                                <NumberInputField ref={saldoRef} />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>


                                        <FormControl isRequired w="xs" mt={6}>
                                            <FormLabel >Operador</FormLabel>
                                            <Input type='text' value={usuario} readOnly />
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt={12}>
                                            <Button colorScheme={"blue"} onClick={iniciarCaja} >Registrar</Button>
                                        </FormControl>
                                    </Box>

                                </Container>

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

export default ModalIniciarCaja