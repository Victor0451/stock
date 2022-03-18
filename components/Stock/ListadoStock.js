import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Button,
} from '@chakra-ui/react';


import ModalVista from './ModalVista';
import ModalEditar from './ModalEditar';
import BajaProductos from './BajaProductos';

const ListadoStock = ({
    listado,
    errores,
    categoriaRef,
    proveedorRef,
    marcaRef,
    productoRef,
    stockRef,
    precioListaRef,
    precioVentaRef,
    editarProducto,
    editarStock,
    bajaProducto,
    eliminarImagen,
    handlerArchivos,
    subirImagen,
}) => {

    const columns = [

        {
            name: "ID",
            selector: "idproducto",
            sortable: true,
            grow: 0.1
        },

        {
            name: "Marca",
            selector: "marca",
            sortable: true,
            grow: 0.2
        },
        {
            name: "Producto",
            selector: "producto",
            sortable: true,
            grow: 0.3
        },
        {
            name: "Precio Lista",
            selector: "precio_lista",
            sortable: true,
            grow: 0.2
        },

        {
            name: "Precio Venta",
            selector: "precio_venta",
            sortable: true,
            grow: 0.2
        },

        {
            name: "Stock",
            selector: "stock",
            sortable: true,
            grow: 0.1
        },
        {
            name: "acciones",
            button: true,
            grow: 0.1,
            cell: row =>
            (
                <>

                    <ModalVista row={row} />

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
                        editarProducto={editarProducto}
                        editarStock={editarStock}
                        eliminarImagen={eliminarImagen}
                        handlerArchivos={handlerArchivos}
                        subirImagen={subirImagen}
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

            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />

        );
    }, [filterText, resetPaginationToggle]);


    return (
        <Box
            p={4}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Registro de Productos</Heading>
                <Text fontSize={'xl'}>
                    Listado de productos para la gestion de stock.
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
                />
            </Container>
        </Box>
    )
}

export default ListadoStock