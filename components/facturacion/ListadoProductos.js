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
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react';

import Link from 'next/link';
import moment from 'moment';
import BajaProductos from './BajaProductos';


const ListadoProductos = ({
    listado,
    totalFacturacion,
    bajaProducto,
    finalizarVenta,
    nfact
}) => {

    const columns = [

        {
            name: "Codigo",
            selector: row => `${row.codigo}`,
            sortable: true,
            grow: 0.2
        },

        {
            name: "Descripcion",
            selector: row => `${row.descripcion}`,
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
            name: "acciones",
            button: true,
            grow: 0.1,
            cell: (row, index) =>
            (
                <>


                    <BajaProductos
                        row={row}
                        index={index}
                        bajaProducto={bajaProducto}
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
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10}>
                <StatGroup>
                    <Stat>
                        <StatLabel>Factura N°: </StatLabel>
                        <StatNumber>{nfact}</StatNumber>

                    </Stat>

                    <Stat>
                        <StatLabel>Productos Vendidos</StatLabel>
                        <StatNumber>{listado.length}</StatNumber>

                    </Stat>

                    <Stat>
                        <StatLabel>Facturacion Total</StatLabel>
                        <StatNumber>$ {totalFacturacion(listado)}</StatNumber>

                    </Stat>

                    <Stat>
                        <Button colorScheme={"blue"} mt="4" onClick={finalizarVenta}>Finalizar Venta</Button>
                    </Stat>
                </StatGroup>
            </Stack>


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

        </Box>
    )
}

export default ListadoProductos
