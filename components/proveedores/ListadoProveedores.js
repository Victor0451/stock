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
import Link from 'next/link';
import ModalEditar from './ModalEditar';
import BajaProductos from './BajaProveedores';
import ModalVista from './ModalVista';

const ListadoProveedores = ({
    listado,
    editarProveedor,
    errores,
    proveedorRef,
    telefonoRef,
    direccionRef,
    descripcionRef,
    cuitRef,
    cuentaRef,
    mailRef,
    bajaProveedor
}) => {

    const columns = [

        {
            name: "ID",
            selector: row => `${row.idproveedor}`,
            sortable: true,
            grow: 0.1
        },

        {
            name: "Proveedor",
            selector: row => `${row.proveedor}`,
            sortable: true,
            grow: 0.2
        },
        {
            name: "Telefono",
            selector: row => `${row.telefono}`,
            sortable: true,
            grow: 0.3
        },
        {
            name: "Direccion",
            selector: row => `${row.direccion}`,
            sortable: true,
            grow: 0.2
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
                        editarProveedor={editarProveedor}
                        errores={errores}
                        proveedorRef={proveedorRef}
                        telefonoRef={telefonoRef}
                        direccionRef={direccionRef}
                        descripcionRef={descripcionRef}
                        cuitRef={cuitRef}
                        cuentaRef={cuentaRef}
                        mailRef={mailRef}

                    />

                    <BajaProductos
                        row={row}
                        bajaProveedor={bajaProveedor}
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
                <Heading fontSize={'3xl'}>Listado de Proveedores</Heading>
                <Text fontSize={'xl'}>
                    Listado de productos para la gestion de stock. Para ingresar un nuevo proveedor, hace click en el boton. <Link href={"/proveedores/nuevo"}><Button colorScheme={"blue"}>Nuevo Proveedor</Button></Link>
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

export default ListadoProveedores