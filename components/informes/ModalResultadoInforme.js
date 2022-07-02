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


const ModalResultadoInforme = ({
    generarReporte,
    errores,
    f,
    titulo
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

                onClick={() => {

                    generarReporte(f)
                    setOverlay(<OverlayOne />)
                    onOpen()

                }}
                mt="6"
            >
                {titulo}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="5xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >

                            {
                                errores ? (

                                    <Alert mt="4" mb="4" status='error' ariant='left-accent'>
                                        <AlertIcon />
                                        <AlertDescription>{errores}.</AlertDescription>
                                    </Alert>

                                ) : (

                                    <Box className='row' p="4" alignItems="center" justifyContent="space-between">



                                    </Box>
                                )
                            }

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

export default ModalResultadoInforme