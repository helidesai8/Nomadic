// Author: Meer Patel

import React from 'react';
import { Flex, Box, Heading, Image, Text } from '@chakra-ui/react';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const History: React.FC = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 4, 5, 5];


    return (
        <Box>
            <Flex w="95%" m="auto" flexDir="column">
                <br />
                <Text fontSize="x-large" textAlign="left" fontWeight="normal" m="3">History</Text>

                <Flex overflowX="auto" overflowY="hidden" whiteSpace="nowrap" width="95vw">
                    {arr.map((item, index) => (
                        <Box key={index} mx="3" border="1px solid lightgray" borderRadius="2xl" my="3" width="400px">
                            <Box p="5">
                                <Box height="300px" overflow="hidden" borderRadius="lg">
                                    <Image
                                        src='https://picsum.photos/800/600'
                                        alt='Travel destination'
                                        objectFit="cover"
                                        height="100%"
                                        width="100%"
                                    />
                                </Box>
                                <Box mt="3">
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Heading size='md' textAlign="center">London</Heading>
                                        <Text color='blue.600' fontSize='xl'>$450</Text>
                                    </Flex>
                                    <Flex justifyContent="space-between" alignItems="center" mt="2">
                                        <Flex alignItems="center">
                                            <MdOutlineLocationOn />
                                            <Text size='md' textAlign="center" ml="2">UK</Text>
                                        </Flex>
                                        <Flex alignItems="center">
                                            <FaStar color='yellow' size="25px" style={{ marginRight: "15px" }} />
                                            <Text color='blue.600' fontSize='xl'>4.7</Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
}

export default History;
