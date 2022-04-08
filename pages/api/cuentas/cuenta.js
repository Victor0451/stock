import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {

        if (req.query.f && req.query.f === 'clientes') {

            try {

                const result = await excuteQuery({

                    query: 'SELECT * FROM clientes WHERE estado = 1 ',

                });

                if (result[0]) {

                    res.json({
                        msg: "Clientes Encontrados",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Clientes")

                }

            } catch (error) {
                console.log(error);
            }

        }

    } else if (method === "POST") {

        const cuenta = {
            idcliente: req.body.idcliente,
            idventa: req.body.idventa,
            importe: req.body.importe,
            fecha_inicio: req.body.fecha_inicio,
            estado: req.body.estado,
        }

        try {

            const result = await excuteQuery({
                query: `INSERT INTO cuentas 
                        (idcliente, idventa, importe, fecha_inicio, estado) 
                        VALUES(${cuenta.idcliente}, ${cuenta.idventa}, ${cuenta.importe}, '${moment(cuenta.fecha_inicio).format('YYYY-MM-DD')}', ${cuenta.estado})`,

            });

            if (result) {
                res.json({
                    msg: "Cuenta Registrada",
                    body: result
                })
            }


        } catch (error) {
            console.log(error);
        }

        return cuenta;

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'edicion') {
            let cat = {
                id: req.body.id,
                categoria: req.body.categoria,
                descripcion: req.body.descripcion,

            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE categorias 
                        SET categoria = '${cat.categoria}', 
                            descripcion = '${cat.descripcion}'                        
                        WHERE idcategoria = ${cat.id}`


                });

                if (result) {
                    res.json({
                        msg: "Categoria Editada",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return cat;


        } if (req.body.f && req.body.f === 'baja') {

            let cat = {
                id: req.body.id,
                estado: req.body.estado,
                fecha_baja: req.body.fecha_baja
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE categorias 
                        SET estado = ${cat.estado}, 
                            fecha_baja = '${cat.fecha_baja}'
                        WHERE idcategoria = ${cat.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Categoria Baja",
                        body: result
                    })
                }

            } catch (error) {
                console.log(error);

            }

            return cat;


        }
    }


}
