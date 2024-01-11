import InsiderInfoRow from './InsiderInfoRow';
import './Controls.css';
import React, { useState, useEffect } from 'react';
import {ResponsiveContainer, BarChart,Line,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle, Cell} from 'recharts'
import { getAnalystRecommendation } from '../testData/APITesting';


function AnalystRecommendation({currentStock}) {
    const colors = ['rgb(23, 111, 55)', 'green', 'rgb(185, 139, 29)', 'rgb(147, 54, 54)', 'rgb(139, 0, 0)'];
    const [graphData, setGraphData] = useState([{
        option: "strongBuy",
        value: 0
    },
    {
        option: "buy",
        value: 0
    },
    {
        option: "hold",
        value: 0
    },
    {
        option: "sell",
        value: 0
    },
    {
        option: "strongSell",
        value: 0
    }]

    )

    const getAndUpdateAnalystGraphData = async() => {
        if (currentStock && !(currentStock === "-")) {
            const newData = await getAnalystRecommendation(currentStock)
            console.log("new analyst data", newData);
            setGraphData(newData.graphData)
        }
    }
    useEffect(() => {
        getAndUpdateAnalystGraphData()
    }, [currentStock])

    return (
        <div className='insiderContainer insiderSearchContainer'>
            <div className='insiderHeaderContainer'>
                <div className='insiderHeader'>Analyst Sentiments</div>
            </div>
            <div className='insiderItemContainer insiderInfoContainer analystChart'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    // width={500}
                    // height={300}
                    data={graphData}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                    }}
                    >
                    <XAxis dataKey="option" />
                    <Tooltip cursor={{fill: '#111'}}/>
                    <Bar dataKey="value"  >
                        {graphData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AnalystRecommendation