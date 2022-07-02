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
    Textarea,
    VisuallyHidden,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputLeftAddon,
    InputGroup
} from '@chakra-ui/react';

import Link from 'next/link';
import ModalResultadoInforme from './ModalResultadoInforme';


const FormInformes = ({
    fechaRef,
    errores,
    generarReporte
}) => {

    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Informes y Reportes</Heading>
                <Text fontSize={'xl'}>
                    Generacion de informes y reportes.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >

                <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                    {
                        errores ? (
                            <Alert className='mt-4' status='error' ariant='left-accent'>
                                <AlertIcon />
                                <AlertDescription>{errores}.</AlertDescription>
                            </Alert>
                        ) : null
                    }

                    <FormControl isRequired w="xs" mt="6">
                        <FormLabel >Fecha de Vencimiento</FormLabel>
                        <Input type='date' ref={fechaRef} />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6" >
                        <ModalResultadoInforme
                            generarReporte={generarReporte}
                            errores={errores}
                            f={"ventas categoria"}
                            titulo="Ventas Por Categoria"
                        />
                    </FormControl>

                    <FormControl isRequired w="xs" mt="6" >
                        <ModalResultadoInforme
                            generarReporte={generarReporte}
                            errores={errores}
                            f={"ventas producto"}
                            titulo="Ventas Por Producto"
                        />
                    </FormControl>
                </Box>

            </Container>
        </Box>
    )

}

export default FormInformes