import React from 'react'
import Navbar from '../components/history/Navbar'
import UserHistory from '../components/history/UserHistory'
import Recommendations from '../components/history/Recommendations'
import Header from '../components/ui/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@mui/material'
import Footer from '../components/ui/Footer'


const HistoryPage = () => {
    return (
        <div>

            <Header />
            <ChakraProvider >
                <br />
                <br />
                <br />
                <br />
                <UserHistory />
                <Recommendations />
                {/* <br /> */}
            </ChakraProvider>
            <Footer />
        </div>
    )
}

export default HistoryPage