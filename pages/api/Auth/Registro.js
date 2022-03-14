import crypto from 'crypto';
import excuteQuery from '../../../config/db';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';


export default async function handlerUser(req, res) {

    const { method } = req

    if (method === "POST") {
        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM usuarios WHERE usuario = ?',
                values: [req.body.usuario],
            });

            if (result[0]) {
                res.json("Usuario Existente")
            } else {

                const salt = crypto.randomBytes(16).toString('hex');
                const hash = crypto
                    .pbkdf2Sync(req.body.contrasena, salt, 1000, 64, 'sha512')
                    .toString('hex');
                const user = {
                    usuario: req.body.usuario,
                    contrasena: req.body.contrasena,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    hash,
                    salt,
                    alta: moment().format('YYYY-MM-DD HH:mm:ss'),

                };

                try {
                    const result = await excuteQuery({
                        query: 'INSERT INTO usuarios (usuario, contrasena, nombre, apellido, hash, salt, alta) VALUES(?, ?, ?, ?, ?, ?, ?)',
                        values: [user.usuario, user.contrasena, user.nombre, user.apellido, user.hash, user.salt, user.alta],
                    });

                    if (result) {
                        res.json("Usuario Registrado")
                    }

                } catch (error) {
                    console.log(error);
                }

                return user;

            }

        } catch (error) {
            console.log(error);
        }

    } else if (method === "GET") {


        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM usuarios WHERE usuario = ?',
                values: [req.query.usuario],
            });

            if (result[0]) {
                const inputHash = crypto
                    .pbkdf2Sync(req.query.contrasena, result[0].salt, 1000, 64, 'sha512')
                    .toString('hex');


                if (result[0].hash === inputHash) {

                    res.json({
                        msg: "Usuario Valido",
                        body: result[0],
                        token: uuidv4()
                    })




                } else if (result[0].hash !== inputHash) {

                    res.json("Contraseña Invalida")

                }


            } else if (!result[0]) {

                res.json("Usuario Inexistente")

            }

        } catch (error) {
            console.log(error);
        }


    }

}

