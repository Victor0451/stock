import React from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,

} from '@chakra-ui/react';

import Tarjetas from './Tarjetas';
import ModalAlertaStock from './ModalAlertaStock';


const HomeScreen = ({
    listado
}) => {
    return (
        <Box
            p={4}

        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Sistema de Gestion de Stock</Heading>
                <Text fontSize={'xl'}>
                    Por medio de este sistema vas a poder gestionar el stock de los productos de tu negocio,
                    categorias de productos y proveedores. Tambien vas a poder gestionar las ventas y movimientos de caja.
                </Text>
            </Stack>


            {listado ? (
                <Alert
                    status='warning'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                    mt={10}

                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        ATENCION!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Existen productos con una cantidad de stock proxima a agotarse. <ModalAlertaStock listado={listado} />
                    </AlertDescription>
                </Alert>
            ) : null}






            <Container maxW={'100%'} mt={10} className="row" justifyContent={"center"} >

                <Box >
                    <Tarjetas
                        imagen={'/img/categoria.jpg'}
                        titulo={"Categorias"}
                        detalle={"Modulo de gestion de categorias"}
                        url={"/categorias/listado"}
                    />
                </Box>

                <Box ml="2">
                    <Tarjetas
                        imagen={'/img/proveedor.jpg'}
                        titulo={"Proveedores"}
                        detalle={"Modulo de gestion de proveedores"}
                        url={"/proveedores/listado"}
                    />
                </Box>
                <Box>
                    <Tarjetas
                        imagen={'/img/stock.jpg'}
                        titulo={"Productos"}
                        detalle={"Modulo de gestion del stock de productos"}
                        url={"/stock/listado"}
                    />
                </Box>
                <Box ml="2">
                    <Tarjetas />
                </Box>



            </Container>







        </Box>
    )
}

export default HomeScreen