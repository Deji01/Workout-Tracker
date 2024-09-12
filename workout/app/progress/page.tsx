'use client'

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Progress() {
    const [weightData, setWeightData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Weight (kg)',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    })

    useEffect(() => {
        fetch('/api/progress')
            .then(res => res.json())
            .then(data => {
                setWeightData({
                    labels: data.map((entry: { date: any }) => entry.date),
                    datasets: [
                        {
                            label: 'Weight (kg)',
                            data: data.map((entry: { weight: any }) => entry.weight),
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }
                    ]
                })
            })
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Progress Tracking</h1>
            <div className="w-full h-64">
                <Line data={weightData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    )
};