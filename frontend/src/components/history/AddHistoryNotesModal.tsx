// Author: Meer Patel

import { Box, Button, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import axios from 'axios';

const AddHistoryNotesModal = ({ location, note, id }: { location: string, note: string, id: string | undefined }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState(note)
    const toast = useToast()
    useEffect(() => {
        setInput(note);
    }, [note]);

    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => setInput((e.target as HTMLTextAreaElement).value)
    const isError = input === ''

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/booking/${id}`, { note: input });
            if (response.status === 200) {
                if (response.data.success) {
                    toast({
                        title: 'Note updated',
                        description: 'Your note has been updated successfully.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    });
                    // onClose(); // Close the modal after successful submission
                }
            } else {
                // Handle non-200 responses
                console.error('Failed to update note:', response);
            }
        } catch (error) {
            // Handle errors
            console.error('Error updating note:', error);
        }
    };

    return (
        <Box>
            <Button colorScheme="green" onClick={onOpen}><FaEdit /></Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Notes for {location}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Note</FormLabel>
                            <Textarea value={input} onChange={handleInputChange} />
                            {!isError ? (
                                <FormHelperText>
                                    Enter the memorable moments that you had with your friend or family.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Note is required.</FormErrorMessage>
                            )}
                            <Button isDisabled={isError} w="100%" my="5" colorScheme="blue" onClick={handleSubmit}>Submit</Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default AddHistoryNotesModal
