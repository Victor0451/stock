import React from 'react'

import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Alert,
    AlertIcon,
    AlertDescription,

} from '@chakra-ui/react';

import Link from 'next/link';

const FormNuevaCategoria = ({
    errores,
    categoriaRef,
    descripcionRef,
    registrarCategorias

}) => {
    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Categorias</Heading>
                <Text fontSize={'xl'}>
                    Registro de categorias de productos en el sistema de stock.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                    <FormControl isRequired w="xs" >
                        <FormLabel >Categoria</FormLabel>
                        <Input type='text' ref={categoriaRef} />
                    </FormControl>

                    <FormControl isRequired w="2xl" mt="10" >
                        <FormLabel >Descripcion</FormLabel>
                        <Textarea rows={3} ref={descripcionRef} />
                    </FormControl>

                </Box>

                {
                    errores ? (

                        <Alert className='mt-4' status='error' ariant='left-accent'>
                            <AlertIcon />
                            <AlertDescription>{errores}.</AlertDescription>
                        </Alert>

                    ) : null
                }

                <Box className='row' p="4" justifyContent="end" mt="6">

                    <Button colorScheme='blue' size='md' onClick={registrarCategorias}>
                        Resgistrar
                    </Button>

                    <Link href='/stock/listado'>
                        <Button colorScheme='red' size='md' ml="2" >
                            Cancelar
                        </Button>
                    </Link>

                </Box>
            </Container >
        </Box >
    )
}

export default FormNuevaCategoria