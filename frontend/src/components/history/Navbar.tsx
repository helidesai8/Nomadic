// Author: Meer Patel
import { Box, Flex, Input, Image, useDisclosure, Button } from "@chakra-ui/react"
// import { Input } from '@mui/material'
import { IoSettingsSharp } from "react-icons/io5";
import { useMediaQuery } from '@chakra-ui/react'
import { RxHamburgerMenu } from "react-icons/rx";
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

const Navbar = () => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                isLargerThan1280 ? <Flex borderBottom="1px solid lightgray" background="black" color="white" p="5">
                    < Flex width="90%" m="auto" justifyContent="space-between" alignItems="center" >
                        <Box fontSize="2xl">
                            <Image
                                src='/logo_white.png'
                                // height="10vh"
                                w="5vw"
                                alt='nomadic'
                                borderRadius='lg'
                            />
                        </Box >
                        <Box w="50%">
                            <Flex justifyContent="center" alignItems="center" fontSize="larger">
                                <Box mx="3">

                                    Home
                                </Box>
                                <Box mx="3">

                                    Destination
                                </Box>
                                <Box mx="3">

                                    FAQ
                                </Box>
                                <Box mx="3">

                                    Contact us
                                </Box>
                                <Box mx="3">

                                    History
                                </Box>
                                <Box mx="3">

                                    <Input placeholder="Search"></Input>
                                </Box>
                                <Box mx="3">
                                    <IoSettingsSharp size="25px" />
                                </Box>

                            </Flex>
                        </Box>
                    </Flex >
                </Flex > : <Box>
                    <Flex backgroundColor="black" p="3" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Image
                                src='/logo_white.png'
                                // height="10vh"
                                w="15vw"
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                        </Box>
                        <Box >
                            <Button onClick={onOpen} backgroundColor="transparent">

                                <RxHamburgerMenu color='white' />
                            </Button>
                            <Drawer
                                isOpen={isOpen}
                                placement='right'
                                onClose={onClose}

                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />

                                    <Flex mt="10" fontSize="larger" flexDir="column">
                                        <Box mx="3" my="1">

                                            Home
                                        </Box>
                                        <Box mx="3" my="1">

                                            Destination
                                        </Box>
                                        <Box mx="3" my="1">

                                            FAQ
                                        </Box>
                                        <Box mx="3" my="1">

                                            Contact us
                                        </Box>
                                        <Box mx="3">

                                            History
                                        </Box>

                                    </Flex>
                                </DrawerContent>
                            </Drawer>
                        </Box>
                    </Flex>
                </Box>}
        </>

    )
}

export default Navbar