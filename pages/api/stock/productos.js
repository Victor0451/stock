import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {


        try {

            const result = await excuteQuery({

                query: 'SELECT * FROM productos WHERE estado = 1 ',

            });

            if (result[0]) {

                res.json({
                    msg: "Productos Encontrados",
                    body: result
                })

            } else if (!result[0]) {

                res.json("No hay productos")

            }

        } catch (error) {
            console.log(error);
        }

    } else if (method === "POST") {

        let prod = {
            categoria: req.body.categoria,
            proveedor: req.body.proveedor,
            marca: req.body.marca,
            producto: req.body.producto,
            precio_lista: req.body.precio_lista,
            precio_venta: req.body.precio_venta,
            stock: req.body.stock,
            estado: req.body.estado,
            fecha_alta: req.body.fecha_alta,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            precio_mayorista: req.body.precio_mayorista,
            fecha_vencimiento: req.body.fecha_vencimiento
        }

        try {

            const result = await excuteQuery({
                query: 'INSERT INTO productos (marca, producto, stock, precio_lista, fecha_alta, idcategoria, idproveedor, precio_venta, estado, codigo, descripcion, precio_mayorista, fecha_vencimiento) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                values: [prod.marca, prod.producto, prod.stock, prod.precio_lista, prod.fecha_alta, prod.categoria, prod.proveedor, prod.precio_venta, prod.estado, prod.codigo, prod.descripcion, prod.precio_mayorista, prod.fecha_vencimiento],
            });

            if (result) {
                res.json({
                    msg: "Producto Registrado",
                    body: result
                })

            }



        } catch (error) {
            console.log(error);
        }

        return prod;

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'edicion') {

            let prod = {
                id: req.body.id,
                categoria: req.body.categoria,
                proveedor: req.body.proveedor,
                marca: req.body.marca,
                producto: req.body.producto,
                precio_lista: req.body.precio_lista,
                precio_venta: req.body.precio_venta,
                descripcion: req.body.descripcion,
                precio_mayorista: req.body.precio_mayorista,
                fecha_vencimiento: req.body.fecha_vencimiento
            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE productos 
                    SET idcategoria = ${prod.categoria}, 
                        idproveedor = ${prod.proveedor}, 
                        marca ='${prod.marca}',                           
                        producto = '${prod.producto}',
                        precio_lista = ${prod.precio_lista},
                        precio_venta = ${prod.precio_venta},
                        descripcion= '${prod.descripcion}',
                        precio_mayorista= ${prod.precio_mayorista},
                        fecha_vencimiento= '${prod.fecha_vencimiento}'
                    WHERE idproducto = ${prod.id}`


                });

                if (result) {
                    res.json({
                        msg: "Producto Editado",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return prod;
        }



    } if (req.body.f && req.body.f === 'baja') {

        let prod = {
            id: req.body.id,
            estado: req.body.estado,
            fecha_baja: req.body.fecha_baja
        }

        try {

            const result = await excuteQuery({
                query: `
                UPDATE productos 
                        SET estado = ${prod.estado}, 
                            fecha_baja = '${prod.fecha_baja}'
                        WHERE idproducto = ${prod.id}
                        `


            });

            if (result) {
                res.json({
                    msg: "Producto Baja",
                    body: result
                })


            }



        } catch (error) {
            console.log(error);

        }

        return prod;

    } else if (req.body.f && req.body.f === 'imagen') {

        let prod = {
            id: req.body.id,
            imagen: req.body.imagen
        }

        try {

            const result = await excuteQuery({
                query: `
                UPDATE productos 
                SET imagen = '${prod.imagen}'                            
                WHERE idproducto = ${prod.id}
                `

            });

            if (result) {
                res.json({
                    msg: "Imagen Subida",
                    body: result
                })


            }



        } catch (error) {
            console.log(error);

        }

        return prod;

    } else if (req.body.f && req.body.f === 'imagennull') {

        let prod = {
            id: req.body.id,
            imagen: req.body.imagen
        }

        try {

            const result = await excuteQuery({
                query: `
                UPDATE productos 
                SET imagen = NULL                           
                WHERE idproducto = ${prod.id}
                `

            });

            if (result) {
                res.json({
                    msg: "Imagen Subida",
                    body: result
                })


            }



        } catch (error) {
            console.log(error);

        }

        return prod;
    }
}
