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
    Select,
    Button,
    Alert,
    AlertIcon,
    AlertDescription,

} from '@chakra-ui/react';

import Link from 'next/link';

const FormNuevoStock = ({
    categoriaRef,
    proveedorRef,
    marcaRef,
    productoRef,
    stockRef,
    precioListaRef,
    precioVentaRef,
    registrarProducto,
    errores,
    cate,
    handlerArchivos
}) => {
    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Productos</Heading>
                <Text fontSize={'xl'}>
                    Registro de productos nuevos en el sistema de stock.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                    {
                        !cate ? (
                            <FormControl isRequired w="xs" >
                                <Alert className='mt-4' status='info' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>No hay categorias registradas.</AlertDescription>
                                </Alert>
                            </FormControl>
                        ) : (
                            <FormControl isRequired w="xs" >
                                <FormLabel >Categoria</FormLabel>
                                <Select placeholder='Selecciona una opcion' ref={categoriaRef}>
                                    {
                                        cate.map((c, index) => (
                                            <option key={index} value={c.idcategoria}>{c.categoria}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )
                    }


                    <FormControl isRequired w="xs" >
                        <FormLabel >Proveedor</FormLabel>
                        <Select placeholder='Selecciona una opcion' ref={proveedorRef}>
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6">
                        <FormLabel >Marca</FormLabel>
                        <Input type='text' ref={marcaRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" >
                        <FormLabel >Producto</FormLabel>
                        <Input type='text' ref={productoRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6">
                        <FormLabel >Precio Lista</FormLabel>
                        <Input type='text' ref={precioListaRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6">
                        <FormLabel >Precio Venta</FormLabel>
                        <Input type='text' ref={precioVentaRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6">
                        <FormLabel >Stock</FormLabel>
                        <Input type='number' ref={stockRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6">
                        <FormLabel >Imagen</FormLabel>
                        <Input type='file' onChange={handlerArchivos} />
                    </FormControl>

                </Box>

                {errores ? (

                    <Alert className='mt-4' status='error' ariant='left-accent'>
                        <AlertIcon />
                        <AlertDescription>{errores}.</AlertDescription>
                    </Alert>

                ) : null}

                <Box className='row' p="4" justifyContent="end" mt="6">

                    <Button colorScheme='blue' size='md' onClick={registrarProducto}>
                        Registro
                    </Button>

                    <Link href='/stock/listado'>
                        <Button colorScheme='red' size='md' ml="2" >
                            Cancelar
                        </Button>
                    </Link>

                </Box>
            </Container>
        </Box>
    )
}

export default FormNuevoStock
