import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {


        try {

            const result = await excuteQuery({

                query: 'SELECT * FROM proveedores WHERE estado = 1 ',

            });

            if (result[0]) {

                res.json({
                    msg: "Proveedores Encontrados",
                    body: result
                })

            } else if (!result[0]) {

                res.json("No hay Proveedores")

            }

        } catch (error) {
            console.log(error);
        }

    } else if (method === "POST") {

        let prov = {
            proveedor: req.body.proveedor,
            telefono: req.body.telefono,
            mail: req.body.mail,
            direccion: req.body.direccion,
            descripcion: req.body.descripcion,
            cuit: req.body.cuit,
            cuenta: req.body.cuenta,
            estado: req.body.estado
        }

        try {

            const result = await excuteQuery({
                query: `INSERT INTO proveedores 
                        (proveedor, telefono, mail, cuit, cuenta, direccion, descripcion, fecha_alta, estado ) 
                        VALUES('${prov.proveedor}', '${prov.telefono}', '${prov.mail}', ${prov.cuit}, ${prov.cuenta}, '${prov.direccion}', '${prov.descripcion}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', ${prov.estado})`,

            });

            if (result) {
                res.json({
                    msg: "Proveedor Registrado",
                    body: result
                })
            }


        } catch (error) {
            console.log(error);
        }

        return prov;

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'edicion') {

            let prov = {
                id: req.body.id,
                proveedor: req.body.proveedor,
                telefono: req.body.telefono,
                mail: req.body.mail,
                direccion: req.body.direccion,
                descripcion: req.body.descripcion,
                cuit: req.body.cuit,
                cuenta: req.body.cuenta,

            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE proveedores 
                        SET proveedor = '${prov.proveedor}', 
                            telefono = ${prov.telefono},
                            mail= '${prov.mail}',
                            direccion= '${prov.direccion}',
                            descripcion= '${prov.descripcion}',
                            cuit = ${prov.cuit},
                            cuenta = ${prov.cuenta}
                        WHERE idproveedor = ${prov.id}`


                });

                if (result) {
                    res.json({
                        msg: "Proveedor Editado",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return prov;


        } if (req.body.f && req.body.f === 'baja') {

            let prov = {
                id: req.body.id,
                estado: req.body.estado,
                fecha_baja: req.body.fecha_baja
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE proveedores 
                        SET estado = ${prov.estado}, 
                            fecha_baja = '${prov.fecha_baja}'
                        WHERE idproveedor = ${prov.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Proveedor Baja",
                        body: result
                    })
                }

            } catch (error) {
                console.log(error);

            }

            return prov;


        }
    }


}
