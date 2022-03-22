import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {


        try {

            const result = await excuteQuery({

                query: 'SELECT * FROM categorias WHERE estado = 1 ',

            });

            if (result[0]) {

                res.json({
                    msg: "Categorias Encontradas",
                    body: result
                })

            } else if (!result[0]) {

                res.json("No hay Categorias")

            }

        } catch (error) {
            console.log(error);
        }

    } else if (method === "POST") {

        let cat = {
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
        }

        try {

            const result = await excuteQuery({
                query: `INSERT INTO categorias 
                        (categoria, descripcion, estado, fecha_alta) 
                        VALUES('${cat.categoria}', '${cat.descripcion}', ${cat.estado}, '${moment().format('YYYY-MM-DD HH:mm:ss')}')`,

            });

            if (result) {
                res.json({
                    msg: "Categoria Registrada",
                    body: result
                })
            }


        } catch (error) {
            console.log(error);
        }

        return cat;

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
