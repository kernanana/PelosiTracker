import './Chart.css';
import {ResponsiveContainer, ComposedChart,Line,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import { useEffect } from 'react';
import { useState } from 'react';

function Chart({finalGraphData}) {
    useEffect(() => {
      console.log("FINAL graphData", finalGraphData);
    }, [finalGraphData])
    return (
            <div className='stockTableContainer' >
                <ResponsiveContainer width="99%" height="99%">
                <ComposedChart
                    data={finalGraphData}
                    margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                    }}
                    className="chart">
                    <defs>
                      <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8800" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFA500" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date"/>
                    <YAxis yAxisId="stock" orientation="left" label={{ value: 'Stock Value (USD)', angle: 90, position: 'insideLeft'}} domain={[490,520]}/>
                    <YAxis yAxisId="insider" orientation="right" label={{ value: 'Shares Bought', angle: 90, position: 'insideRight' }}></YAxis>
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="stock" type="monotone" dataKey="value" fill="url(#color)" stroke="#FF5B00">
                    
                    </Area>
                    <Bar yAxisId="insider" dataKey="buy" stackId={"a"} barSize={20} fill="#413ea0" />
                    <Bar yAxisId="insider" stackId="a" dataKey="sell" fill="#8b0000" />
                </ComposedChart>
                </ResponsiveContainer>
            </div>
    );
  }
  
  export default Chart;