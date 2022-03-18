import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "PUT") {

        let act = {
            id: req.body.id,
            nustock: req.body.nustock,
            fecha_reposicion: req.body.fecha_reposicion,
        }

        try {

            const result = await excuteQuery({
                query: `UPDATE productos 
                        SET stock = stock + ${act.nustock},
                            fecha_reposicion = '${moment(act.fecha_reposicion).format('YYYY-MM-DD HH:mm:ss')}'
                        WHERE idproducto = ${act.id}`,


            });

            if (result) {
                res.json({
                    msg: "Stock Actualizado",
                    body: result
                })
            }



        } catch (error) {
            console.log(error);
        }

        return act;
    }
}
