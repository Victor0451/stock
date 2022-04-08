import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
    Box,
    Container,
    Stack,
    Button,
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
    FormControl,
    FormLabel,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VisuallyHidden,
    Input
} from '@chakra-ui/react';

import Link from 'next/link';
import moment from 'moment';
import BajaProductos from './BajaProductos';
import ModalClientes from './ModalClientes';



const ListadoProductos = ({
    listado,
    totalFacturacion,
    bajaProducto,
    finalizarVenta,
    nfact,
    idClienteRef,
    formaPagoRef,
    guardarFpago,
    fpago,
    clientes,
    traerClientes,
    guardarClienSel,
    pagoRef,
    vuelto,
    calcVuelto,
    clienSel
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
            name: "Stock Disponible",
            selector: row => `${row.stock - 1}`,
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
                <StatGroup >
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
            </Stack >

            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10} justifyContent="center">
                <StatGroup >

                    <FormControl ml={5} isRequired w="3xs" ref={formaPagoRef} onChange={(e) => { guardarFpago(e.target.value) }}>
                        <FormLabel >Forma de Pago</FormLabel>
                        <Select placeholder='Selecciona una opcion' >
                            <option value={"Efectivo"}>Efectivo</option>
                            <option value={"Credito"}>Credito</option>
                            <option value={"Debito"}>Debito</option>
                            <option value={"Cuenta"}>Cuenta Cliente</option>
                        </Select>
                    </FormControl>


                    {
                        fpago && fpago === 'Cuenta' ? (
                            <>

                                {clienSel ? (
                                    <Stat>
                                        <StatLabel>Cliente</StatLabel>
                                        <StatNumber>{clienSel.dni} - {clienSel.apellido}</StatNumber>

                                    </Stat>
                                ) : null}



                                <Stat>
                                    <ModalClientes
                                        listado={clientes}
                                        traerClientes={traerClientes}
                                        guardarClienSel={guardarClienSel}
                                    />
                                </Stat>
                            </>
                        ) : null
                    }



                    {fpago && fpago === 'Efectivo' ? (

                        <>
                            <FormControl ml="10" isRequired w="3xs" >
                                <FormLabel >Pago</FormLabel>
                                <NumberInput defaultValue={0} precision={2} step={0.2} onChange={calcVuelto}  >
                                    <NumberInputField ref={pagoRef} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>


                            <Stat>
                                <StatLabel>Vuelto</StatLabel>
                                <StatNumber>$ {vuelto}</StatNumber>
                            </Stat>
                        </>

                    ) : <>
                        <VisuallyHidden><Input type={"number"} ref={pagoRef} value="0" /></VisuallyHidden>
                    </>}



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

        </Box >
    )
}

export default ListadoProductos
