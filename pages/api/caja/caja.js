import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {

        if (req.query.f && req.query.f === "verificar") {

            try {

                const result = await excuteQuery({

                    query: `SELECT * 
                        FROM caja 
                        WHERE estado = 1
                        AND anulado = 0
                        AND usuario = '${req.query.user}'

                        `,

                });


                if (result[0]) {

                    res.json({
                        msg: "Caja Encontrada",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Caja")

                }

            } catch (error) {
                console.log(error);

            }


        } else if (req.query.f && req.query.f === "cajas cerradas") {

            try {

                const result = await excuteQuery({

                    query: `
                    
                        SELECT fecha,
                               sum(importe) 'importe' ,
                               turno,
                               usuario
                        FROM caja 
                        WHERE estado = 0
                        GROUP BY fecha, usuario, turno
                        
                        `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Cajas Encontradas",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Caja")

                }

            } catch (error) {
                console.log(error);
            }

        } else if (req.query.f && req.query.f === "cajas detalle") {

            try {

                const result = await excuteQuery({

                    query: `
                    
                    SELECT * 
                    FROM caja 
                    WHERE fecha = '${req.query.fecha}'
                    AND usuario = '${req.query.usuario}'
                    AND estado = 0
                        
                        `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Cajas Detalle",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Caja")

                }

            } catch (error) {
                console.log(error);
            }

        }

    } else if (method === "POST") {

        if (req.body.f && req.body.f === 'iniciar') {


            const caja = {

                detalle: req.body.detalle,
                movimiento: req.body.movimiento,
                importe: req.body.importe,
                turno: req.body.turno,
                fecha: req.body.fecha,
                hora: req.body.hora,
                estado: req.body.estado,
                anulado: req.body.anulado,
                usuario: req.body.usuario

            }

            try {

                const result = await excuteQuery({
                    query: `INSERT INTO caja
                            (detalle, movimiento, importe, fecha, usuario, turno, hora, estado, anulado) 
                            VALUES('${caja.detalle}', '${caja.movimiento}', ${caja.importe}, '${caja.fecha}', '${caja.usuario}', '${caja.turno}', '${caja.hora}', ${caja.estado}, ${caja.anulado})`,

                });

                if (result) {
                    res.json({
                        msg: "Caja Iniciada",
                        body: result
                    })
                }


            } catch (error) {
                console.log(error);
            }

            return caja;

        } if (req.body.f && req.body.f === 'movimiento') {


            const caja = {

                detalle: req.body.detalle,
                movimiento: req.body.movimiento,
                importe: req.body.importe,
                turno: req.body.turno,
                fecha: req.body.fecha,
                hora: req.body.hora,
                estado: req.body.estado,
                anulado: req.body.anulado,
                usuario: req.body.usuario

            }

            try {

                const result = await excuteQuery({
                    query: `INSERT INTO caja
                            (detalle, movimiento, importe, fecha, usuario, turno, hora, estado, anulado) 
                            VALUES('${caja.detalle}', '${caja.movimiento}', ${caja.importe}, '${caja.fecha}', '${caja.usuario}', '${caja.turno}', '${caja.hora}', ${caja.estado}, ${caja.anulado})`,

                });

                if (result) {
                    res.json({
                        msg: "Movimiento Registrado",
                        body: result
                    })
                }


            } catch (error) {
                console.log(error);
            }

            return caja;

        }

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'movimiento edicion') {

            const movim = {
                id: req.body.id,
                detalle: req.body.detalle,
                importe: req.body.importe,
                movimiento: req.body.movimiento,

            }

            try {

                const result = await excuteQuery({

                    query: `UPDATE caja 
                        SET detalle = '${movim.detalle}', 
                            movimiento = '${movim.movimiento}', 
                            importe = ${movim.importe}                        
                        WHERE idcaja = ${movim.id}`

                });

                if (result) {
                    res.json({
                        msg: "Movimiento Editado",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return movim;


        } if (req.body.f && req.body.f === 'movimiento baja') {

            const movim = {
                id: req.body.id,
                anulado: req.body.anulado,
                fecha_anulado: req.body.fecha_anulado
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE caja 
                        SET anulado = ${movim.anulado}, 
                            fecha_anulado = '${movim.fecha_anulado}'
                        WHERE idcaja = ${movim.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Movimiento Baja",
                        body: result
                    })
                }

            } catch (error) {
                console.log(error);

            }

            return movim;


        } if (req.body.f && req.body.f === 'movimiento cierre') {

            const movim = {
                fecha: req.body.fecha,
                estado: req.body.estado,
                fecha_cierre: req.body.fecha_cierre,
                usuario_cierre: req.body.usuario_cierre,
                usuario: req.body.usuario
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE caja 
                        SET estado = ${movim.estado}, 
                            fecha_cierre = '${movim.fecha_cierre}',
                            usuario_cierre = '${movim.usuario_cierre}'
                        WHERE fecha = '${movim.fecha}'
                        AND usuario = '${movim.usuario}'
                        `
                });

                if (result) {
                    res.json({
                        msg: "Movimiento Baja",
                        body: result
                    })
                }

            } catch (error) {
                console.log(error);

            }

            return movim;


        }
    }


}
