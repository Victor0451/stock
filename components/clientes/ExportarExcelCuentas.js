import React from 'react';
import { useExcelDownloder } from 'react-xls';
import { Button } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import moment from 'moment';

const ExportarPadronCuentas = ({ listado, clien }) => {

    const { ExcelDownloder, Type } = useExcelDownloder();

    const data = {
        Cuentas: [],
    };

    listado.forEach(i => {

        let est = ""

        if (i.estado === 1) {
            est = 'Impaga'
        } else if (i.estado === 0) {
            est = 'Candelada'
        }

        data.Cuentas.push({
            Fecha: moment(i.fecha_inicio).format('DD/MM/YYYY'),
            Importe: i.importe,
            Pagado: i.pagado,
            Deuda: i.deuda,
            Estado: est,
        })



    });

    let titulo = `Cuentas cliente: ${clien} - ${moment().format('DD/MM/YYYY')}`

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

export default ExportarPadronCuentas;