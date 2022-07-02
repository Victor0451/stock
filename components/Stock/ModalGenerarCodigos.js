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
    Alert,
    AlertDescription,
    AlertIcon,
    Textarea,
    Select,
    Image
} from '@chakra-ui/react'

import BarCode from './BarCode'

const ModalGenerarCodigos = ({
    listado,
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
                colorScheme="orange"
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                Generar Codigos
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Generar Codigos. <Button colorScheme={"blue"} onClick={() => imprimir("codigo")}>Imprimir</Button></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >

                            <Box className='row ' id="codigo" >

                                {
                                    listado.map((l, index) => (

                                        <FormControl
                                            size='xs'
                                            className='col-md-4 '
                                            // border={"1px"} 
                                            // borderColor={"black"} 
                                            p="2"
                                            mt={2} >
                                            {/* <FormLabel color={"black"}  >{l.marca} - {l.producto} ${l.precio_venta}</FormLabel> */}
                                            <BarCode codigo={l.codigo} />
                                            {/* <FormLabel color={"black"} >${l.precio_venta}</FormLabel> */}
                                        </FormControl>

                                    ))
                                }

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

export default ModalGenerarCodigos