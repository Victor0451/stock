import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {

        if (req.query.f && req.query.f === "ventas categoria") {

            try {

                const result = await excuteQuery({

                    query: `
                
                SELECT c.categoria, COUNT(*) 'cantidad', SUM(vp.importe) 'total'
                FROM ventas_productos as vp
                INNER JOIN ventas as v on v.idventa = vp.idventa
                INNER JOIN productos as p on p.codigo = vp.codigo
                INNER JOIN categorias as c on c.idcategoria = p.idcategoria
                WHERE DATE_FORMAT(v.fecha, '%Y-%m-%d') = '${req.query.fecha}'
                GROUP BY c.categoria

                `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Generado",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No")

                }

            } catch (error) {
                console.log(error);
            }

        } else if (req.query.f && req.query.f === "ventas producto") {

            try {

                const result = await excuteQuery({

                    query: `
                
                SELECT p.codigo, CONCAT(p.marca, ' - ',p.producto) 'producto', vp.cantidad, SUM(vp.importe) 'total'
                FROM ventas_productos as vp
                INNER JOIN ventas as v on v.idventa = vp.idventa
                INNER JOIN productos as p on p.codigo = vp.codigo
                WHERE DATE_FORMAT(v.fecha, '%Y-%m-%d') = '${req.query.fecha}'
                GROUP BY p.codigo, CONCAT(p.marca, ' - ',p.producto), vp.cantidad

                `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Generado",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No")

                }

            } catch (error) {
                console.log(error);
            }

        }

    }
}
