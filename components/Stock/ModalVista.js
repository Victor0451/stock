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
    Image,
    useColorModeValue,
    Alert,
    AlertDescription,
    AlertIcon
} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'


const ModalVista = ({
    row
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
                }}
            >
                <ViewIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del Producto ID: {row.idproducto} - {row.producto}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <FormControl w="xs">
                                    <FormLabel >Categoria</FormLabel>
                                    <Input type='text' value={row.idcategoria} />
                                </FormControl>

                                <FormControl w="xs">
                                    <FormLabel >Proveedor</FormLabel>
                                    <Input type='text' value={row.idproveedor} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Marca</FormLabel>
                                    <Input type='text' value={row.marca} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Precio Lista</FormLabel>
                                    <Input type='text' value={row.precio_lista} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Precio Venta</FormLabel>
                                    <Input type='text' value={row.precio_venta} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Stock</FormLabel>
                                    <Input type='number' value={row.stock} />
                                </FormControl>

                                {!row.imagen || row.imagen === ' ' ?
                                    (
                                        <Alert className='mt-4' status='info' ariant='left-accent'>
                                            <AlertIcon />
                                            <AlertDescription>Este producto no tiene imagen.</AlertDescription>
                                        </Alert>
                                    ) : (
                                        <FormControl w="xs" mt="6">
                                            <FormLabel >Imagen del producto</FormLabel>
                                            <Image boxSize='200px' src={`/uploads/${row.imagen}`} alt='imagen producto' />
                                        </FormControl>
                                    )}

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

export default ModalVista