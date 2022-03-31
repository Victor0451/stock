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
import moment from 'moment';
import Link from 'next/link';
import ModalEditar from './ModalEditar';
import BajaCategorias from './BajaCategorias';

const ListadoCategorias = ({
    listado,
    errores,
    categoriaRef,
    descripcionRef,
    editarCategoria,
    bajaCategoria
}) => {

    const columns = [

        {
            name: "ID",
            selector: row => `${row.idcategoria}`,
            sortable: true,
            grow: 0.01
        },


        {
            name: "Categoria",
            selector: row => `${row.categoria}`,
            sortable: true,
            grow: 0.1
        },
        {
            name: "Detalle",
            selector: row => `${row.descripcion}`,
            sortable: true,
            grow: 0.4
        },
        {
            name: "Fecha Alta",
            selector: row => `${moment(row.fecha_alta).format('DD/MM/YYYY ')}`,
            sortable: true,
            grow: 0.1
        },


        {
            name: "acciones",
            button: true,
            grow: 0.01,
            cell: row =>
            (
                <>


                    <ModalEditar
                        row={row}
                        errores={errores}
                        categoriaRef={categoriaRef}
                        descripcionRef={descripcionRef}
                        editarCategoria={editarCategoria}

                    />

                    <BajaCategorias
                        row={row}
                        bajaCategoria={bajaCategoria}
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
                <Heading fontSize={'3xl'}>Listado de Categorias</Heading>
                <Text fontSize={'xl'}>
                    Listado de productos para la gestion de stock. Para ingresar un nuevo categoria, hace click en el boton. <Link href={"/categorias/nuevo"}><Button colorScheme={"blue"}>Nueva categoria</Button></Link>
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

export default ListadoCategorias