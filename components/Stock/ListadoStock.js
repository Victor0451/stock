import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Button,
    //  Link,
    FormControl,
    Alert,
    AlertDescription,
    AlertIcon,
    VisuallyHidden,
    Input,
    FormLabel,
    Select
} from '@chakra-ui/react';

import { LinkIcon } from '@chakra-ui/icons'
//import Link from 'next/link';
import ModalVista from './ModalVista';
import ModalEditar from './ModalEditar';
import BajaProductos from './BajaProductos';
import ExportarExcel from './ExportarExcel';
import ModalCodigo from './ModalCodigo';
import Link from 'next/link';
import jsCookie from 'js-cookie'


const ListadoStock = ({
    listado,
    errores,
    categoriaRef,
    cateCodRef,
    proveedorRef,
    marcaRef,
    productoRef,
    stockRef,
    precioListaRef,
    precioVentaRef,
    descripcionRef,
    precioMayoristaRef,
    fechaVencimientoRef,
    editarProducto,
    editarStock,
    bajaProducto,
    eliminarImagen,
    handlerArchivos,
    subirImagen,
    cate,
    provee,
    imprimir,
    traerStock2,
    idCate,
    show
}) => {

    const columns = [

        {
            name: "ID",
            selector: row => `${row.idproducto}`,
            sortable: true,
            grow: 0
        },

        {
            name: "Codigo",
            selector: row => `${row.codigo}`,
            sortable: true,
            grow: 0.2
        },

        {
            name: "Marca",
            selector: row => `${row.marca}`,
            sortable: true,
            grow: 0.2
        },
        {
            name: "Producto",
            selector: row => `${row.producto}`,
            sortable: true,
            grow: 0.3
        },
        {
            name: "Precio Lista",
            selector: row => `${row.precio_lista}`,
            sortable: true,
            grow: 0.2
        },

        {
            name: "Precio Venta",
            selector: row => `${row.precio_venta}`,
            sortable: true,
            grow: 0.2
        },

        {
            name: "Stock",
            selector: row => `${row.stock}`,
            sortable: true,
            grow: 0.1
        },
        {
            name: "Acciones",
            button: true,
            grow: 0.1,
            cell: row =>
            (
                <>


                    <Link
                        href={{ pathname: '/stock/codigos' }}
                    >
                        <a target="_blank" >
                            <Button
                                colorScheme="orange"
                                size='xs'
                                mr={1}
                                ml={-5}
                                onClick={() => {
                                    jsCookie.set("codigo", row.codigo)
                                    jsCookie.remove("idCate")
                                }}

                            >
                                <LinkIcon />
                            </Button>
                        </a>
                    </Link>

                    <ModalVista
                        row={row}
                        cate={cate}
                        provee={provee}
                    />

                    <ModalEditar
                        row={row}
                        errores={errores}
                        categoriaRef={categoriaRef}
                        proveedorRef={proveedorRef}
                        marcaRef={marcaRef}
                        productoRef={productoRef}
                        stockRef={stockRef}
                        precioListaRef={precioListaRef}
                        precioVentaRef={precioVentaRef}
                        descripcionRef={descripcionRef}
                        precioMayoristaRef={precioMayoristaRef}
                        fechaVencimientoRef={fechaVencimientoRef}
                        editarProducto={editarProducto}
                        editarStock={editarStock}
                        eliminarImagen={eliminarImagen}
                        handlerArchivos={handlerArchivos}
                        subirImagen={subirImagen}
                        cate={cate}
                        provee={provee}
                    />

                    <BajaProductos
                        bajaProducto={bajaProducto}
                        row={row}
                    />
                </>

            )
        }
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );

    const filteredItems = listado.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <>
                <FilterComponent
                    onFilter={e => setFilterText(e.target.value)}
                    onClear={handleClear}
                    filterText={filterText}
                />




                <ExportarExcel
                    listado={listado}
                />
            </>

        );
    }, [filterText, resetPaginationToggle]);

    const conditionalRowStyles = [
        {
            when: row => row.stock <= 3,
            style: {
                backgroundColor: 'yellow',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
    ];


    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Productos</Heading>
                <Text fontSize={'xl'}>
                    Listado de productos para la gestion de stock. Para ingresar un nuevo producto, hace click en el boton. <Link href={"/stock/nuevo"}><Button colorScheme={"blue"}>Nuevo producto</Button></Link>
                </Text>
                <Text fontSize={'xl'} border="1px" p={2} borderColor="white">
                    Generar codigos para todos los productos de una sola ves. {" "}
                    {
                        !cate ? (
                            <FormControl isRequired w="xs" >
                                <Alert className='mt-4' status='info' ariant='left-accent'>
                                    <AlertIcon />
                                    <AlertDescription>No hay categorias registradas.</AlertDescription>
                                    <VisuallyHidden><Input type={"text"} ref={categoriaRef} value="0" /></VisuallyHidden>

                                </Alert>
                            </FormControl>
                        ) : (
                            <Box className='row' mt={"4"} justifyContent={"center"}>
                                <FormControl className='col-md-4' isRequired w="xs" >

                                    <Select placeholder='Selecciona una Opcion' defaultValue={cate.idcategoria} ref={cateCodRef}>
                                        <option value={"todo"}>Traer Todos</option>
                                        {
                                            cate.map((c, index) => (
                                                <option key={index} value={c.idcategoria}>{c.categoria}</option>
                                            ))
                                        }
                                    </Select>

                                </FormControl>

                                <FormControl className='col-md-2' isRequired w="xs" >
                                    <Button colorScheme={"blue"} onClick={traerStock2} >Buscar</Button>
                                </FormControl>

                                {
                                    show === false ? (
                                        <FormControl className='col-md-6' isRequired w="xs" >
                                            <Alert status='info' ariant='left-accent'>
                                                <AlertIcon />
                                                <AlertDescription>Debes elegir una categoria para poder generar los codigos.</AlertDescription>
                                                <VisuallyHidden><Input type={"text"} ref={categoriaRef} value="0" /></VisuallyHidden>

                                            </Alert>
                                        </FormControl>
                                    ) : (
                                        <FormControl className='col-md-2' isRequired w="xs" >
                                            <Link
                                                href={{ pathname: '/stock/codigos' }}
                                            >
                                                <a target="_blank" >
                                                    <Button colorScheme={"orange"} onClick={() => {

                                                        jsCookie.set("idCate", idCate)
                                                        jsCookie.remove("codigo")

                                                    }}>Generar Codigos</Button>
                                                </a>
                                            </Link>
                                        </FormControl>
                                    )
                                }




                            </Box>
                        )
                    }

                </Text>
            </Stack>

            <Container maxW={'100%'} mt={10}  >

                <DataTable
                    // title="Listado de Clientes"
                    columns={columns}
                    data={filteredItems}
                    defaultSortField="name"
                    striped
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                    conditionalRowStyles={conditionalRowStyles}
                />
            </Container>





        </Box>
    )
}

export default ListadoStock