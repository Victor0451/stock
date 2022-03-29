import { IncomingForm } from 'formidable'
import fs from 'fs'
import mv from 'mv';


export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req, res) => {

    const { method } = req

    if (method === "POST") {

        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm()

            form.parse(req, (err, fields, files) => {
                if (err) return reject(err)
                console.log(fields, files)
                console.log(files.file.filepath)
                let oldPath = files.file.filepath;
                let newPath = `./public/${files.file.originalFilename}`;
                mv(oldPath, newPath, function (err) {
                });
                res.json("Imagen Subida")
            })
        })

    }

    if (method === "DELETE") {

        try {

            let file = `./public/${req.query.file}`;

            fs.unlinkSync(file);

            res.json("Archivo Eliminado")

        } catch (error) {

            res.json({
                msg: "Ocurrio un error",
                error: error
            })

        }



    }

}