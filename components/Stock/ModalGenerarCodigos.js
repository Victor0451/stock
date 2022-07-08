import React, { useRef } from 'react'
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
import ReactToPrint from 'react-to-print';

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

    let componentRef = useRef()

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

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl"  >

                            <ReactToPrint
                                trigger={() => {

                                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                    // to the root node of the returned component as it will be overwritten.
                                    return <a href="#">Print this out!</a>;

                                }}
                                content={() => componentRef}
                            />

                            <Box className='row ' id="codigo"  >
                                {
                                    listado ? (
                                        <BarCode arr={listado} ref={componentRef}/>
                                    ) : null
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