import React, { useState } from 'react'
import {
    useColorMode,
    Flex,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Badge,
    useMediaQuery
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import toastr from 'toastr'
import Options from './Opciones'


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const [display, changeDisplay] = useState('none')



    const cerrarSesion = () => {

        jsCookie.remove("token")
        jsCookie.remove("usuario")

        toastr.info("Sesion cerrada correctamente", "ATENCION")

        setTimeout(() => {
            Router.push('/')
        }, 1000);


    }

    let usuario = jsCookie.get("usuario")

    const [resp] = useMediaQuery('(min-width: 767px)')

    return (
        <Box className='row'>
            <Flex className='col-md-10'>
                <Flex
                    //position="fixed"
                    top="1rem"
                    right="1rem"
                    align="center"

                >
                    {/* Desktop */}
                    <Flex
                        display={['none', 'none', 'flex', 'flex']}

                    >
                        <Link href="/" passHref>
                            <Button
                                variant="ghost"
                                borderRadius="10"
                                _hover={{
                                    bg: "gray.300",
                                    borderRadius: "10",
                                    color: "black"
                                }}
                            >
                                Home
                            </Button>
                        </Link>

                        <Menu                     >
                            <MenuButton
                                ml="2"
                                variant="ghost"
                                borderRadius="10"
                                _hover={{
                                    bg: "gray.300",
                                    borderRadius: "10",
                                    color: "black"
                                }}

                            >
                                Categorias
                            </MenuButton>
                            <MenuList>
                                <Link href="/categorias/nueva">
                                    <MenuItem>Nueva categoria</MenuItem>
                                </Link>
                                <Link href="/categorias/listado">
                                    <MenuItem>Listado de categorias</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>

                        <Menu >
                            <MenuButton
                                ml="5"
                                variant="ghost"
                                borderRadius="10"
                                _hover={{
                                    bg: "gray.300",
                                    borderRadius: "10",
                                    color: "black"
                                }}
                            >
                                Proveedores
                            </MenuButton>
                            <MenuList>
                                <Link href="/proveedores/nueva">
                                    <MenuItem>Nuevo proveedor</MenuItem>
                                </Link>
                                <Link href="/proveedores/listado">
                                    <MenuItem>Listado de proveedores</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton
                                ml="5"
                                variant="ghost"
                                borderRadius="10"
                                _hover={{
                                    bg: "gray.300",
                                    borderRadius: "10",
                                    color: "black"
                                }}
                            >
                                Productos
                            </MenuButton>
                            <MenuList>
                                <Link href="/stock/nuevo">
                                    <MenuItem>Nuevo producto</MenuItem>
                                </Link>
                                <Link href="/stock/listado">
                                    <MenuItem>Listado de productos</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>


                    </Flex>

                    {/* Mobile */}
                    <IconButton
                        aria-label="Open Menu"
                        size="lg"
                        mr={2}
                        icon={
                            <HamburgerIcon />
                        }
                        onClick={() => changeDisplay('flex')}
                        display={['flex', 'flex', 'none', 'none']}
                    />

                    {resp === false ? (
                        <Options
                            cerrarSesion={cerrarSesion}
                            isDark={isDark}
                            toggleColorMode={toggleColorMode}
                            usuario={usuario}

                        />
                    ) : null}

                </Flex>

                {/* Mobile Content */}
                <Flex
                    w='100vw'
                    display={display}
                    bgColor="gray.50"
                    zIndex={20}
                    h="100vh"
                    pos="fixed"
                    top="0"
                    left="0"
                    overflowY="auto"
                    flexDir="column"
                >
                    <Flex justify="flex-end" >
                        <IconButton
                            mt={2}
                            mr={2}
                            aria-label="Open Menu"
                            size="lg"
                            icon={
                                <CloseIcon
                                    color={"black"}
                                />
                            }
                            onClick={() => changeDisplay('none')}
                        />
                    </Flex>

                    <Flex
                        flexDir="column"
                        align="center"
                    >
                        <Link href="/" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Home"
                                my={5}
                                w="100%"
                                color={"black"}

                            >
                                Home
                            </Button>
                        </Link>


                        <Link href="/categorias/listado" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="About"
                                my={5}
                                w="100%"
                                color={"black"}

                            >
                                Categorias
                            </Button>
                        </Link>

                        <Link href="/proveedores/listado" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Proveedores"
                                my={5}
                                w="100%"
                                color={"black"}

                            >
                                Proveedores
                            </Button>
                        </Link>

                        <Link href="/productos/listado" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Productos"
                                my={5}
                                w="100%"
                                color={"black"}

                            >
                                Productos
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>

            {resp === true ? (
                <Options
                    cerrarSesion={cerrarSesion}
                    isDark={isDark}
                    toggleColorMode={toggleColorMode}
                    usuario={usuario}

                />
            ) : null}


        </Box >

    )
}

export default Navbar