/* eslint-disable @typescript-eslint/no-unused-vars */

// Author: Meer Patel

import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Recommendations: React.FC = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`/api/v1/tours`).then((response) => {
            console.log("res", response.data)
            setCards(response.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    console.log("cards", cards)
    if (loading) return <Center my="5">Loading...</Center>
    return (
        <Box w="95%" m="auto">
            <Heading m="4">Recommendations</Heading>
            <Flex overflowX="auto" whiteSpace="nowrap" mb="6">
                {cards?.map((card: any) => (
                    <Flex
                        key={card.id}
                        position="relative"
                        height="400px"
                        width="400px"
                        flex="0 0 auto"
                        m={4}
                        overflow="hidden"
                        border="1px solid lightgray"
                        boxShadow="xl"
                        borderRadius="20px"
                        className="card"
                    >
                        <Box
                            height="100%"
                            width="100%"
                            overflow="hidden"
                            position="relative"
                            backgroundImage={`url(${card.image})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            className="mainImgBox"
                        >
                            <Box
                                className="cardContentWrapper"
                                position="absolute"
                                bottom="0"
                                width="100%"
                                height="100%"
                                overflow="hidden"
                            >
                                <Box
                                    className="cardContent"
                                    p="4"
                                    fontSize="large"
                                    position="absolute"
                                    bottom="-5%"
                                    left="0"
                                    width="100%"
                                    background="linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))"
                                    transform="translateY(120%)"
                                    transition="transform 0.5s ease"
                                    zIndex="10"
                                >
                                    <Box w="95%" m="auto" my="8">
                                        <Box >

                                            <Flex alignItems="center" justifyContent="space-between" mb="2">
                                                <Flex alignItems="center" justifyContent="center">
                                                    <FaLocationDot />
                                                    <Text ml="1">{card.city}</Text>
                                                </Flex>
                                                <Flex alignItems="center" justifyContent="center">
                                                    <RxLapTimer />
                                                    <Text ml="1">{card.duration} days</Text>
                                                </Flex>
                                                <Flex alignItems="center" justifyContent="center">
                                                    <FaStar />
                                                    <Text ml="1">5k+ Rating</Text>
                                                </Flex>

                                            </Flex>
                                        </Box>

                                        <Text fontWeight="bolder" fontSize="2xl" mb="5">{card.location}</Text>
                                        <Flex justifyContent="space-between" alignItems=" center" m="auto">
                                            <Button onClick={() => navigate(`/tours/${card.id}`)}>Book Now</Button>
                                            <Text ml="1">${card.price}</Text>
                                        </Flex>
                                    </Box>
                                </Box>

                            </Box>
                        </Box >
                    </Flex >
                ))}
            </Flex >
        </Box >
    );
};

export default Recommendations;
