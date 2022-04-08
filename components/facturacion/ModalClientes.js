import React, { useMemo } from 'react'
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
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
    useColorModeValue,
    Heading,
    Text,
    Link

} from '@chakra-ui/react'

import { ChevronLeftIcon } from '@chakra-ui/icons'
import moment from 'moment';
import toastr from 'toastr';

const ModalClientes = ({
    listado,
    traerClientes,
    guardarClienSel
}) => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)


    const columns = [

        {
            name: "ID",
            selector: row => `${row.idcliente}`,
            sortable: true,
            grow: 0.2
        },

        {
            name: "Cliente",
            selector: row => `${row.apellido}, ${row.nombre}`,
            sortable: true,
            grow: 0.3
        },
        {
            name: "DNI",
            selector: row => `${row.dni}`,
            sortable: true,
            grow: 0.2
        },
        {
            name: "Alta",
            selector: row => `${moment(row.precio_venta).format('DD/MM/YYYY')}`,
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


                    <Button
                        row={row}
                        index={index}
                        colorScheme={"yellow"}
                        size='xs'
                        onClick={() => {
                            guardarClienSel(row)
                            onClose()
                            toastr.info("El cliente fue seleccionado", "ATENCION")
                        }}

                    >
                        <ChevronLeftIcon />
                    </Button>



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
        <>
            <Button

                colorScheme={"yellow"}
                mt="8"
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    traerClientes()
                }}
            >
                Buscar Cliente
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Productos con bajo stock </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} mt={10} border='1px' borderColor='gray.500' borderRadius="xl" >
                            <Box className='row' p="4" alignItems="center" justifyContent="space-between">

                                <Text fontSize={'xl'}>
                                    Para realizar la actualizacion del stock <Link href='/stock/listado'><Button colorScheme={"blue"}>Ingresa aca</Button></Link>
                                </Text>

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

export default ModalClientes