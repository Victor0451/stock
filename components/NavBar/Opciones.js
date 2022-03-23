import React from 'react'
import {
    Switch,
    Flex,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Badge,


} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import Link from 'next/link'


const Opciones = ({ cerrarSesion, usuario, isDark, toggleColorMode }) => {
    return (
        <Flex className='col-md-2'>
            <Stack direction={'row'} spacing={7}>
                <Switch
                    mt={"2"}

                    color="green"
                    isChecked={isDark}
                    onChange={toggleColorMode}
                    justifyContent="flex-end"

                />
            </Stack>


            <Stack direction={'row'} spacing={7}>
                <Menu>
                    <MenuButton
                        ml="5"
                        mt="-1"
                        variant="ghost"
                        borderRadius="10"
                        _hover={{
                            bg: "gray.600",
                            borderRadius: "10",
                            color: "black"
                        }}
                    >
                        <Badge
                            fontSize='0.8em'
                            colorScheme='green'
                            borderRadius="10"
                            p="0.5"

                        >
                            {usuario}
                        </Badge>
                        <SettingsIcon
                            ml="1.5"
                        />

                    </MenuButton>
                    <MenuList>
                        <Link href="/auth/listado">
                            <MenuItem>Gestion de Usuario</MenuItem>
                        </Link>

                        <MenuItem onClick={cerrarSesion}>Cerrar Sesion</MenuItem>

                    </MenuList>
                </Menu>
            </Stack>
        </Flex>
    )
}

export default Opciones

