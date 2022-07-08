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
    Alert,
    AlertDescription,
    AlertIcon,
    Textarea,
    Select,
    Image
} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import { ip } from '../../config/config'
import BarCode2 from './BarCode2'

const ModalVista = ({
    row,
    cate,
    provee
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
                    <ModalHeader>Detalles del Producto ID: {row.idproducto} - {row.producto}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

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
                                        <FormControl isRequired w="xs" readOnly>
                                            <FormLabel >Categoria</FormLabel>
                                            <Select placeholder='Selecciona una opcion' value={row.idcategoria} >
                                                {
                                                    cate.map((c, index) => (
                                                        <option key={index} value={c.idcategoria}>{c.categoria}</option>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    )
                                }

                                {
                                    !provee ? (
                                        <FormControl isRequired w="xs" >
                                            <Alert className='mt-4' status='info' ariant='left-accent'>
                                                <AlertIcon />
                                                <AlertDescription>No hay proveedores registradas.</AlertDescription>
                                            </Alert>
                                        </FormControl>
                                    ) : (
                                        <FormControl isRequired w="xs" >
                                            <FormLabel >Proveedores</FormLabel>
                                            <Select placeholder='Selecciona una opcion' value={row.idproveedor}>
                                                {
                                                    provee.map((c, index) => (
                                                        <option key={index} value={c.idproveedor}>{c.proveedor}</option>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    )
                                }


                                <FormControl w="xs" mt="6">
                                    <FormLabel >Marca</FormLabel>
                                    <Input type='text' value={row.marca} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Precio Lista</FormLabel>
                                    <Input type='text' value={row.precio_lista} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Precio Venta</FormLabel>
                                    <Input type='text' value={row.precio_venta} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Precio Mayorista</FormLabel>
                                    <Input type='text' value={row.precio_mayorista} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Stock</FormLabel>
                                    <Input type='number' value={row.stock} />
                                </FormControl>

                                <FormControl w="xs" mt="6">
                                    <FormLabel >Codigo</FormLabel>
                                    <BarCode2 codigo={row.codigo} />
                                </FormControl>

                                {!row.imagen || row.imagen === ' ' ?
                                    (
                                        <Alert className='mt-4' status='info' ariant='left-accent'>
                                            <AlertIcon />
                                            <AlertDescription>Este producto no tiene imagen.</AlertDescription>
                                        </Alert>
                                    ) : (
                                        <FormControl w="xs" mt="6">
                                            <FormLabel >Imagen del producto</FormLabel>
                                            <Image width={290} height={280} src={`${ip}api/archivos/stock/archivo/${row.imagen}`} alt='imagen producto' />
                                        </FormControl>
                                    )}

                                <FormControl w="3xl" mt="6">
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea rows="3" value={row.descripcion} />
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