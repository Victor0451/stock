import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,

} from '@chakra-ui/react';


import Link from 'next/link';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';


const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>

            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box color={useColorModeValue('black', 'white')}  >

                    <Link href="/">
                        <Button as={Button} ml="2" >
                            Inicio
                        </Button>
                    </Link>

                    <Menu >
                        <MenuButton as={Button} ml="2" >
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
                        <MenuButton as={Button} ml="2" >
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
                        <MenuButton as={Button} ml="2">
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
                </Box>


                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={7}>
                        <Button onClick={toggleColorMode} color={useColorModeValue('black', 'white')}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    )
}

export default NavBar