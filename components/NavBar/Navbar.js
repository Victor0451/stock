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

                    Logo


                    <Menu >
                        <MenuButton as={Button} ml="2" >
                            Categorias
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Download</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem>
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