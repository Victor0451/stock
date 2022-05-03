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
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import ModalDetalleCuenta from './ModalDetalleCuenta';
import ExportarPadronCuentas from './ExportarExcelCuentas';
import ModalPagarCuenta from './ModalPagarCuenta';


const ListadoCuentas = ({
  listado,
  traerDetallesCuenta,
  detalles,
  calcTotales,
  clien,
  calcDeduda,
  deuda,
  pagoRef,
  guardarDeduda,
  pagoCuenta,
}) => {
  const columns = [

    {
      name: "ID",
      selector: row => `${row.idcliente}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Fecha",
      selector: row => `${moment(row.fecha_inicio).format('DD/MM/YYYY')}`,
      sortable: true,
      grow: 0.3
    },

    {
      name: "Importe",
      selector: row => `${row.importe}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Pagado",
      selector: row => `${row.pagado}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Deuda",
      selector: row => `${row.deuda}`,
      sortable: true,
      grow: 0.2
    },

    {
      name: "Estado",
      selector: row => (
        row.estado === 1 ? (
          <>
            Impaga
          </>
        ) : row.estado === 0 ? (
          <>
            Pagada
          </>
        ) : null
      ),
      sortable: true,
      grow: 0.2
    },

    {
      name: "Acciones",
      button: true,
      grow: 0.1,
      cell: (row, index) =>
      (
        <>

          <ModalDetalleCuenta
            row={row}
            traerDetallesCuenta={traerDetallesCuenta}
            detalles={detalles}
            calcTotales={calcTotales}
          />

          <ModalPagarCuenta
            row={row}
            calcDeduda={calcDeduda}
            deuda={deuda}
            pagoRef={pagoRef}
            guardarDeduda={guardarDeduda}
            pagoCuenta={pagoCuenta}
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

        <ExportarPadronCuentas
          listado={listado}
          clien={clien}
        />

      </>


    );
  }, [filterText, resetPaginationToggle]);

  return (
    <Box
      p={4}
    >
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Cuentas del Cliente</Heading>
        <Text fontSize={'xl'}>
          Historial de cuentas del cliente.
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

export default ListadoCuentas