import React from 'react';
import { useExcelDownloder } from 'react-xls';
import { Button } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import moment from 'moment';

const ExportarPadron = ({ listado }) => {

    const { ExcelDownloder, Type } = useExcelDownloder();

    const data = {
        Cajas_Cerradas: [],
    };

    listado.forEach(i => {
        data.Cajas_Cerradas.push({
            Turno: i.turno,
            Fecha: moment(i.fecha).format('DD/MM/YYYY'),
            Importe: i.importe,
            Operador: i.usuario,

        })

    });

    let titulo = `Listados de cajas cerradas - ${moment().format('DD/MM/YYYY')}`

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