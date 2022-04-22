import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
    Box,
    Container,
    Stack,
    Button,
    Heading,
    Text,

} from '@chakra-ui/react';

import Link from 'next/link';
import moment from 'moment';
import ModalDetalleCaja from './ModalDetalleCaja';
import ExportarPadron from './ExportarExcel';


const ListadoCajasCerradas = ({
    listado,
    traerDetalleCaja,
    cajaDetalle,
    ingresos,
    egresos,
    calcTotal,
    imprimir
}) => {

    const columns = [

        {
            name: "Turno",
            selector: row => `${row.turno}`,
            sortable: true,

        },


        {
            name: "Fecha",
            selector: row => `${moment(row.fecha).format('DD/MM/YYYY')}`,
            sortable: true,

        },

        {
            name: "Importe",
            selector: row => `${row.importe}`,
            sortable: true,

        },

        {
            name: "Operador",
            selector: row => `${row.usuario}`,
            sortable: true,

        },

        {
            name: "acciones",
            button: true,
            grow: 0.1,
            cell: (row, index) =>
            (
                <>

                    <ModalDetalleCaja
                        row={row}
                        traerDetalleCaja={traerDetalleCaja}
                        cajaDetalle={cajaDetalle}
                        ingresos={ingresos}
                        egresos={egresos}
                        calcTotal={calcTotal}
                        imprimir={imprimir}

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

                <ExportarPadron
                    listado={listado}
                />

            </>

        );
    }, [filterText, resetPaginationToggle]);

    return (
        <Box
            p={4}
            mt={5}
        >

            <Stack spacing={4} mb="5" as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Listado de Cajas Cerradas</Heading>
                <Text fontSize={'xl'}>
                    Gestion de movimientos y cierre de caja.
                </Text>
            </Stack>


            <Container
                maxW={'100%'}
                mt={10}
            >
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

        </Box >
    )
}

export default ListadoCajasCerradas