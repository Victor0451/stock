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

        } else if (req.query.f && req.query.f === 'cuenta') {

            try {

                const result = await excuteQuery({

                    query: `SELECT * 
                            FROM cuentas 
                            WHERE idcliente = ${req.query.idcliente}
                            `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Cuenta Encontrada",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No Hay Cuenta")

                }

            } catch (error) {
                console.log(error);
            }



        } else if (req.query.f && req.query.f === 'detalle cuenta') {

            try {

                const result = await excuteQuery({

                    query: `SELECT 
                                    v.codigo,
                                    CONCAT(p.marca, ', ', p.producto) 'producto',
                                    v.cantidad,
                                    v.importe 
                            FROM ventas_productos as v
                            INNER JOIN productos as p on p.codigo = v.codigo
                            WHERE v.idventa = ${req.query.idventa}
                            `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Detalle Encontrado",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No Hay Detalle")

                }

            } catch (error) {
                console.log(error);
            }



        }

    } else if (method === "POST") {

        if (req.body.f && req.body.f === "crear cuenta") {

            const cuenta = {
                idcliente: req.body.idcliente,
                idventa: req.body.idventa,
                importe: req.body.importe,
                pagado: req.body.pagado,
                deuda: req.body.deuda,
                fecha_inicio: req.body.fecha_inicio,
                estado: req.body.estado,
            }

            try {

                const result = await excuteQuery({
                    query: `INSERT INTO cuentas 
                        (idcliente, idventa, importe, pagado, deuda, fecha_inicio, estado) 
                        VALUES(${cuenta.idcliente}, ${cuenta.idventa}, ${cuenta.importe}, ${cuenta.importe}, ${cuenta.deuda}, '${moment(cuenta.fecha_inicio).format('YYYY-MM-DD')}', ${cuenta.estado})`,

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

        } else if (req.body.f && req.body.f === "pago cuenta") {

            const pagos = {
                idcuenta: req.body.idcuenta,
                fecha: req.body.fecha,
                hora: req.body.hora,
                importe: req.body.importe,
                estado: req.body.estado,
                usuario: req.body.usuario,
                f: req.body.f,
            }

            try {

                const result = await excuteQuery({
                    query: `INSERT INTO cuentas_pago 
                        (idcuenta, fecha, hora, importe, estado, usuario) 
                        VALUES(${pagos.idcuenta}, '${pagos.fecha}', '${pagos.hora}', ${pagos.importe}, ${pagos.estado}, '${pagos.usuario}')`,

                });

                if (result) {
                    res.json({
                        msg: "Pago Registrado",
                        body: result
                    })
                }


            } catch (error) {
                console.log(error);
            }

            return pagos;

        }

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'act valores') {

            let cuenta = {
                idcuenta: req.body.idcuenta,
                pagado: req.body.pagado,
                deuda: req.body.deuda,
                estado: req.body.estado,
                f: req.body.f,
            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE cuentas 
                        SET pagado = ${cuenta.pagado}, 
                            deuda = ${cuenta.deuda},
                            estado= ${cuenta.estado}
                        WHERE idcuenta = ${cuenta.idcuenta}`


                });

                if (result) {
                    res.json({
                        msg: "Importes Actualizados",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return cuenta;


        }
    }


}
