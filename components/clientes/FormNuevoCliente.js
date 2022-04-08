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

const FormNuevoCliente = ({
    errores,
    existeCliente,
    registrarCliente,
    nombreRef,
    apellidoRef,
    dniRef,
    telefonoRef,
    direccionRef,
    detalleRef,
    flag
}) => {
    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Clientes</Heading>
                <Text fontSize={'xl'}>
                    Registro de Clientes en el sistema de stock.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                    <FormControl isRequired w="xs" mt="10" >
                        <FormLabel >DNI - Ingresa el dni y verifica si esta en el sistema</FormLabel>
                        <Input type='number' onBlur={existeCliente} ref={dniRef} />
                    </FormControl>

                    {flag === false ? null
                        : flag === true ? (

                            <>


                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input type='text' ref={nombreRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Apellido</FormLabel>
                                    <Input type='text' ref={apellidoRef} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Telefono</FormLabel>
                                    <Input type='number' ref={telefonoRef} />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input type='text' ref={direccionRef} />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Detalle</FormLabel>
                                    <Textarea rows={3} ref={detalleRef} />
                                </FormControl>



                                {
                                    errores ? (

                                        <Alert className='mt-4' status='error' ariant='left-accent'>
                                            <AlertIcon />
                                            <AlertDescription>{errores}.</AlertDescription>
                                        </Alert>

                                    ) : null
                                }

                                <Box className='row' p="4" justifyContent="end" mt="6">

                                    <Button colorScheme='blue' size='md' onClick={registrarCliente} >
                                        Resgistrar
                                    </Button>

                                    <Link href='/stock/listado'>
                                        <Button colorScheme='red' size='md' ml="2" >
                                            Cancelar
                                        </Button>
                                    </Link>

                                </Box>
                            </>

                        )
                            : null}

                </Box>

            </Container >
        </Box >
    )
}

export default FormNuevoCliente