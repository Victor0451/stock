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
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,

} from '@chakra-ui/react';

import Link from 'next/link';
import ListadoProductos from './ListadoProductos';

const FormVentas = ({
    errores,
    listado,
    codigoRef,
    idClienteRef,
    formaPagoRef,
    buscarProducto,
    totalFacturacion,
    bajaProducto,
    finalizarVenta,
    nfact,
    guardarFpago,
    fpago,
    clientes,
    traerClientes,
    guardarClienSel,
    pagoRef,
    vuelto,
    calcVuelto,
    clienSel
}) => {
    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Venta de Productos</Heading>
                <Text fontSize={'xl'}>
                    Venta y facturacion de los productos.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" p="4" >

                <Flex
                    border='1px'
                    borderColor='gray.500'
                    borderRadius="xl"
                    p="4"
                    align={'center'}
                    justify={'center'}
                >

                    <FormControl isRequired w="xs" mt="2" >
                        <FormLabel >Producto</FormLabel>
                        <Input type='number' ref={codigoRef} onChange={buscarProducto} id="v" />
                    </FormControl>

                    <Button mt="10" ml={4}>Buscar</Button>



                </Flex>
                {
                    errores ? (

                        <Alert className='mt-4' status='error' ariant='left-accent'>
                            <AlertIcon />
                            <AlertDescription>{errores}.</AlertDescription>
                        </Alert>

                    ) : null
                }


                {listado.length === 0 ? (
                    <Alert
                        mt="10"
                        mb="10"
                        status='info'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            ATENCION!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            Escanea el codigo de barra en el cuadro de productos para poder buscarlo y facturarlo
                        </AlertDescription>
                    </Alert>
                )
                    : (
                        <Box

                            border='1px'
                            borderColor='gray.500'
                            borderRadius="xl"
                            p="4"

                            mt="10"
                        >
                            <ListadoProductos
                                listado={listado}
                                totalFacturacion={totalFacturacion}
                                bajaProducto={bajaProducto}
                                finalizarVenta={finalizarVenta}
                                nfact={nfact}
                                idClienteRef={idClienteRef}
                                formaPagoRef={formaPagoRef}
                                guardarFpago={guardarFpago}
                                fpago={fpago}
                                clientes={clientes}
                                traerClientes={traerClientes}
                                guardarClienSel={guardarClienSel}
                                pagoRef={pagoRef}
                                vuelto={vuelto}
                                calcVuelto={calcVuelto}
                                clienSel={clienSel}
                            />

                        </Box>
                    )}



            </Container >
        </Box >
    )
}

export default FormVentas