import InsiderInfoRow from './InsiderInfoRow';
import './Controls.css';
import React, { useState, useEffect } from 'react';
import { getInsiderSentiment } from '../testData/APITesting';


function InsiderSentiment({currentStock}) {
    const [insiderSentiments, setInsiderSentiments] = useState({
        dateRecorded: "-",
        mspr: "-",
        netChange: "-" 
    })

    const getAndUpdateInsiderSentiments = async() => {
        if (currentStock && !(currentStock === "-")) {
            const newData = await getInsiderSentiment(currentStock)
            setInsiderSentiments(newData)
        }
    }

    useEffect(() => {
        getAndUpdateInsiderSentiments()
    }, [currentStock])

    return(
        <div className='insiderContainer'>
            <div className='insiderHeader'>
                Insider Sentiments
            </div>
            <div className='insiderItemContainer insiderInfoContainer'>
                <InsiderInfoRow name="Date of Recording" value={insiderSentiments.dateRecorded} positive={null}></InsiderInfoRow>
                <InsiderInfoRow name="Monthly Share Purchase Ratio" value={insiderSentiments.mspr} positive={true}></InsiderInfoRow>
                <InsiderInfoRow name="Net Insider Share Change" value={insiderSentiments.netChange} positive={false}></InsiderInfoRow>
            </div>
        </div>
    )
}

export default InsiderSentiment 