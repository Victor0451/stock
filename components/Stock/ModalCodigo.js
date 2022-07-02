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

import { LinkIcon } from '@chakra-ui/icons'
import { ip } from '../../config/config'
import BarCode from './BarCode'

const ModalCodigo = ({
    row,
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
                size='xs'
                mr={1}
                ml={-5}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                <LinkIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del Producto ID: {row.idproducto} - {row.producto}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">


                                <FormControl w="xs" mt="6" >
                                    <FormLabel >Codigo</FormLabel>
                                    <div id="codigo">
                                        <FormLabel color={"black"}  >{row.marca} - {row.producto}</FormLabel>
                                        <BarCode codigo={row.codigo} />
                                        <FormLabel color={"black"} >${row.precio_venta}</FormLabel>
                                    </div>
                                </FormControl>


                                <FormControl w="xs" mt="6">
                                    <Button colorScheme={"blue"} onClick={() => imprimir("codigo")}>Imprimir</Button>
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

export default ModalCodigo