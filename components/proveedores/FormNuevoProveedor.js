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

const FormNuevoProveedor = ({
    errores,
    proveedorRef,
    telefonoRef,
    direccionRef,
    descripcionRef,
    cuitRef,
    cuentaRef,
    mailRef,
    registrarProveedor
}) => {
    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Categorias</Heading>
                <Text fontSize={'xl'}>
                    Registro de proveedores de productos en el sistema de stock.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                    <FormControl isRequired w="xs" mt="10" >
                        <FormLabel >Proveedor</FormLabel>
                        <Input type='text' ref={proveedorRef} />
                    </FormControl>

                    <FormControl w="xs" mt="10" >
                        <FormLabel >Telefono</FormLabel>
                        <Input type='number' ref={telefonoRef} />
                    </FormControl>

                    <FormControl w="xs" mt="10" >
                        <FormLabel >Mail</FormLabel>
                        <Input type='email' ref={mailRef} />
                    </FormControl>

                    <FormControl w="xs" mt="10" >
                        <FormLabel >Cuit</FormLabel>
                        <Input type='number' ref={cuitRef} />
                    </FormControl>

                    <FormControl w="3xl" mt="10" >
                        <FormLabel >CBU o Numero de Cuenta</FormLabel>
                        <Input type='number' ref={cuentaRef} />
                    </FormControl>

                    <FormControl w="6xl" mt="10" >
                        <FormLabel >Direccion</FormLabel>
                        <Input type='text' ref={direccionRef} />
                    </FormControl>

                    <FormControl w="6xl" mt="10" >
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

                    <Button colorScheme='blue' size='md' onClick={registrarProveedor} >
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

export default FormNuevoProveedor