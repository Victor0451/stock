import React from 'react';
import { useExcelDownloder } from 'react-xls';
import { Button } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import moment from 'moment';

const ExportarPadron = ({ listado }) => {

    const { ExcelDownloder, Type } = useExcelDownloder();

    const data = {
        Productos: [],
    };

    listado.forEach(i => {
        data.Productos.push({
            Codigo: i.codigo,
            Marca: i.marca,
            Producto: i.producto,
            Stock: i.stock,
            Precio_Lista: i.precio_lista,
            Precio_Venta: i.precio_venta,
            Precio_Mayorista: i.precio_mayorista,
            Vencimiento: moment(i.fecha_vencimiento).format('DD/MM/YYYY'),
            Descripcion: i.descripcion
        })

    });

    let titulo = `Listados de productos - ${moment().format('DD/MM/YYYY')}`

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