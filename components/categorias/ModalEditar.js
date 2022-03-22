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

import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'


const ModalEditar = ({
    row,
    errores,
    categoriaRef,
    descripcionRef,
    editarCategoria,
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
                    <ModalHeader>Detalles de la categoria ID: {row.idcategoria} - {row.categoria}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={5} border='1px' borderColor='gray.500' borderRadius="xl" >

                            <Stack spacing={4} as={Container} maxW={'3xl'} mt="4" textAlign={'center'}>
                                <Heading fontSize={'2xl'}>Actualizar Categoria</Heading>
                                <Text fontSize={'md'}>
                                    Edita Toda la informacion de la categoria del producto.
                                </Text>
                            </Stack>

                            <Box className='row' p="4" alignItems="center" justifyContent="space-between" mt="6">

                                <FormControl isRequired w="xs" >
                                    <FormLabel >Categoria</FormLabel>
                                    <Input type='text' defaultValue={row.categoria} ref={categoriaRef} />
                                </FormControl>

                                <FormControl isRequired w="2xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows={3} defaultValue={row.descripcion} ref={descripcionRef} />
                                </FormControl>


                            </Box>

                            {errores ? (

                                <Alert className='mt-4' status='error' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>{errores}.</AlertDescription>
                                </Alert>

                            ) : null}

                            <Box className='row' p="4" justifyContent="end">

                                <Button colorScheme='blue' size='md' onClick={() => editarCategoria(row)}>
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