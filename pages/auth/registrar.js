import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import FormRegistro from '../../components/Auth/FormRegistro'
import toastr from 'toastr'


const Registrar = () => {

    let usuarioRef = React.createRef()
    let contrasenaRef = React.createRef()
    let nombreRef = React.createRef()
    let apellidoRef = React.createRef()

    const [errores, guardarErrores] = useState(null)



    const registrarUsuario = async () => {

        let datos = {
            usuario: usuarioRef.current.value,
            contrasena: contrasenaRef.current.value,
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value
        }

        if (usuarioRef.current.value === "") {

            guardarErrores("Debes ingresar el usuario")

        } else if (contrasenaRef.current.value === "") {

            guardarErrores("Debes ingresar la contraseña")

        } else if (apellidoRef.current.value === "") {

            guardarErrores("Debes ingresar el apellido")

        } else if (nombreRef.current.value === "") {

            guardarErrores("Debes ingresar el nombre")

        } else {

            await axios.post('/api/Auth/Registro/', datos)
                .then(res => {

                    if (res.data === 'Usuario Existente') {

                        toastr.warning("El usuario que quiere registrar, ya existe", "ATENCION")

                        guardarErrores("El usuario que quiere registrar, ya existe")

                    } else if (res.data === 'Usuario Registrado') {

                        toastr.success("El usuario ingresado se registro con exito", "ATENCION")

                        guardarErrores("El usuario ingresado se registro con exito")

                    }

                })
                .catch(error => {
                    console.log(error)
                    toastr.error("Ocurrio un error al registrar el usuario")

                })
        }
    }

    return (
        <Layout>
            <FormRegistro
                usuarioRef={usuarioRef}
                contrasenaRef={contrasenaRef}
                nombreRef={nombreRef}
                apellidoRef={apellidoRef}
                registrarUsuario={registrarUsuario}
                errores={errores}
            />
        </Layout>
    )
}

export default Registrar