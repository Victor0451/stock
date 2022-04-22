import React from 'react';
import { useExcelDownloder } from 'react-xls';
import { Button } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import moment from 'moment';

const ExportarPadron = ({ listado }) => {

    const { ExcelDownloder, Type } = useExcelDownloder();

    const data = {
        Clientes: [],
    };

    listado.forEach(i => {
        data.Clientes.push({
            DNI: i.dni,
            Apellido: i.apellido,
            Nombre: i.nombre,
            Telefono: i.telefono,
            Direccion: i.direccion,
            Detalle: i.detalle,
            Fecha_Alta: moment(i.alta).format('DD/MM/YYYY'),
            Estado: i.estado,
        })

    });

    let titulo = `Listados de clientes - ${moment().format('DD/MM/YYYY')}`

    return (

        <Button colorScheme={"green"} size="sm" ml="2">
            <ExcelDownloder
                data={data}
                filename={`${titulo}`}
                type={Type.Button} // or type={'button'}
            >
                <DownloadIcon /> Exportar a Excel
            </ExcelDownloder>
        </Button>

    );
};

export default ExportarPadron;