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
    Textarea,
    useColorModeValue,
    Alert,
    Stack,
    Heading,
    Text,
    AlertIcon,
    AlertDescription,
    Image
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'


const ModalEditar = ({
    row,
    editarProveedor,
    errores,
    proveedorRef,
    telefonoRef,
    direccionRef,
    descripcionRef,
    cuitRef,
    cuentaRef,
    mailRef,

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
                colorScheme="yellow"
                size='xs'
                ml="1"
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                <EditIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles de la categoria ID: {row.idproveedor} - {row.proveedor}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='gray.500' borderRadius="xl" >

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Proveedor</Heading>
                                <Text fontSize={'md'}>
                                    Edita Toda la informacion del proveedor del producto.
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Proveedor</FormLabel>
                                    <Input type='text' ref={proveedorRef} defaultValue={row.proveedor} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Telefono</FormLabel>
                                    <Input type='number' ref={telefonoRef} defaultValue={row.telefono} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Mail</FormLabel>
                                    <Input type='email' ref={mailRef} defaultValue={row.mail} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Cuit</FormLabel>
                                    <Input type='number' ref={cuitRef} defaultValue={row.cuit} />
                                </FormControl>

                                <FormControl w="3xl" mt="10" >
                                    <FormLabel >CBU o Numero de Cuenta</FormLabel>
                                    <Input type='number' ref={cuentaRef} defaultValue={row.cuenta} />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input type='text' ref={direccionRef} defaultValue={row.direccion} />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows={3} ref={descripcionRef} defaultValue={row.descripcion} />
                                </FormControl>

                            </Box>

                            {errores ? (

                                <Alert className='mt-4' status='error' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>{errores}.</AlertDescription>
                                </Alert>

                            ) : null}

                            <Box className='row' p="4" justifyContent="end">

                                <Button colorScheme='blue' size='md' onClick={() => editarProveedor(row)}>
                                    Editar
                                </Button>

                                <Button colorScheme={"red"} ml="1" onClick={onClose}>Cancelar</Button>

                            </Box>
                        </Container>

                    </ModalBody>


                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ModalEditar