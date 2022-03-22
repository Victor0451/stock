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
                    <ModalHeader>Detalles del Proveedor ID: {row.idproveedor} - {row.proveedor}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Proveedor</FormLabel>
                                    <Input type='text' defaultValue={row.proveedor} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Telefono</FormLabel>
                                    <Input type='number' defaultValue={row.telefono} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Mail</FormLabel>
                                    <Input type='email' defaultValue={row.mail} readOnly />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Cuit</FormLabel>
                                    <Input type='number' defaultValue={row.cuit} readOnly />
                                </FormControl>

                                <FormControl w="3xl" mt="10" >
                                    <FormLabel >CBU o Numero de Cuenta</FormLabel>
                                    <Input type='number' defaultValue={row.cuenta} readOnly />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input type='text' defaultValue={row.direccion} readOnly />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows={3} defaultValue={row.descripcion} readOnly />
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

export default ModalVista