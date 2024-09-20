// Author: Meer Patel


import { Box, Button, Center, Image, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
const UserHistoryDetailsModal = ({ data, totalCost, noOfPeople, bookingDate }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log("dtaa", data);

    const arrow = "-->"

    const dateConverter = (date: any) => {
        return new Date(date).toDateString()
    }
    return (
        <div>
            <Button color="white" backgroundColor="#10346e" onClick={onOpen} _hover={{ backgroundColor: "gray", color: "white" }} >Show Details</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{data.name}, {data.city}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody px="10">
                        <Center borderRadius="xl" overflow="hidden">
                            <Image src={data.image} height="50vh" w="100%"></Image>
                        </Center>
                        <Box mt="3">
                            <span className='boldfont'>Start Date: </span><span> {dateConverter(data.startDate)}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>End Date: </span><span>{dateConverter(data.endDate)}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Number of individuals: </span><span>{noOfPeople}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Duration: </span><span>{data.duration} Days</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Total Cost: </span><span>{totalCost}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Booking Date: </span><span>{dateConverter(bookingDate)}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Accommodation Details: </span><span>{data.accommodationDetails}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Transportation Details: </span><span>{data.transportationDetails}</span>
                        </Box>
                        <Box>
                            <span className='boldfont'>Activities: </span><span>{data.activities} </span>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal></div>
    )
}

export default UserHistoryDetailsModal