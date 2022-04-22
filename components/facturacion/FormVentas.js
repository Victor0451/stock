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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,

} from '@chakra-ui/react';

import Link from 'next/link';
import ListadoProductos from './ListadoProductos';
import ModalIniciarCaja from './ModalIniciarCaja';
import moment from 'moment';
import ModalIngreso from './ModalIngreso';
import ModalEgreso from './ModalEgreso';

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
    clienSel,
    estCaja,
    usuario,
    iniciarCaja,
    turnoRef,
    saldoRef,
    importeRef,
    detalleRef,
    importeERef,
    detalleERef,
    registrarMovimiento,
    cantidadRef,
    preFinal,
    cantXPrecio,
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

                <>

                    <Box

                        border='1px'
                        borderColor='gray.500'
                        borderRadius="xl"
                        p="4"
                        mt="10"
                        mb="10"
                    >

                        <Stack spacing={4} mb="5" as={Container} maxW={'3xl'} textAlign={'center'}>

                            <Heading fontSize={'3xl'}>Movimientos de caja</Heading>

                        </Stack>


                        {
                            estCaja && estCaja.msg === 'Caja Encontrada' ? (
                                <Alert mt={4} mb={4} status='info' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>Actualmente se encuentra una caja abierta. Turno: {estCaja.body[0].turno}, fecha: {moment(estCaja.body[0].fecha).format('DD/MM/YYYY')} </AlertDescription>
                                </Alert>

                            ) : estCaja === 'No' ? (
                                <Alert mt={4} mb={4} status='info' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>Debes iniciar una caja.</AlertDescription>
                                </Alert>
                            ) : null

                        }


                        <Box className='row' p="4" alignItems="center" justifyContent={"space-around"}>

                            {estCaja && estCaja.msg === 'Caja Encontrada' ? (
                                <>
                                    <ModalIngreso
                                        importeRef={importeRef}
                                        detalleRef={detalleRef}
                                        usuario={usuario}
                                        registrarMovimiento={registrarMovimiento}
                                    />

                                    <ModalEgreso
                                        importeERef={importeERef}
                                        detalleERef={detalleERef}
                                        usuario={usuario}
                                        registrarMovimiento={registrarMovimiento}
                                    />

                                    <Link href='/cajas/cierre'>
                                        <Button
                                            colorScheme={"yellow"}
                                            ml={1}>
                                            Cerrar Caja
                                        </Button>
                                    </Link>
                                </>
                            )
                                : (
                                    <ModalIniciarCaja
                                        usuario={usuario}
                                        iniciarCaja={iniciarCaja}
                                        turnoRef={turnoRef}
                                        saldoRef={saldoRef}
                                    />
                                )}


                        </Box>
                    </Box>


                    <Flex
                        border='1px'
                        borderColor='gray.500'
                        borderRadius="xl"
                        p="4"
                        align={'center'}
                        justify={'center'}
                    >

                        <FormControl isRequired w="15" mt="2" >
                            <FormLabel >Producto</FormLabel>
                            <Input type='number' ref={codigoRef} onChange={buscarProducto} id="v" />
                        </FormControl>

                        <FormControl isRequired w="15" ml={2} mt="2" >
                            <FormLabel >Cantidad</FormLabel>
                            <NumberInput
                                defaultValue={1}
                            >
                                <NumberInputField
                                    ref={cantidadRef}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper color={"black"} />
                                    <NumberDecrementStepper color={"black"} />
                                </NumberInputStepper>
                            </NumberInput>
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

                </>




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
                        <>



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
                                    cantidadRef={cantidadRef}
                                    preFinal={preFinal}
                                    cantXPrecio={cantXPrecio}
                                />

                            </Box>
                        </>
                    )}



            </Container >
        </Box >
    )
}

export default FormVentas