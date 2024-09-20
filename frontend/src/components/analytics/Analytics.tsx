// Author: Meer Patel

import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Grid, Card, CardContent, Typography } from '@mui/material';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [totalUsersData, setTotalUsersData] = useState([]);
    const [totalRevenueData, setTotalRevenueData] = useState([]);

    useEffect(() => {
        // Fetch data for total users
        axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/analytics/gettotalusers`)
            .then(response => {
                const { data } = response;
                setTotalUsersData(data.totalUsersData);
            })
            .catch(error => console.error('Error fetching total users data:', error));

        // Fetch data for total revenue
        axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/analytics/gettotalrevenue`)
            .then(response => {
                const { data } = response;
                setTotalRevenueData(data.totalRevenueData);
            })
            .catch(error => console.error('Error fetching total revenue data:', error));
    }, []);

    const totalUsersChartData = {
        labels: totalUsersData.map(item => item.date),
        datasets: [
            {
                label: 'Total Users',
                data: totalUsersData.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const totalRevenueChartData = {
        labels: totalRevenueData.map(item => item.date),
        datasets: [
            {
                label: 'Total Revenue',
                data: totalRevenueData.map(item => item.amount),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Users Over Time</Typography>
                        <Line data={totalUsersChartData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Revenue Over Time</Typography>
                        <Bar data={totalRevenueChartData} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Analytics;
