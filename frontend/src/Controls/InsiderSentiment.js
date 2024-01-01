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
    const [valueColors, setValueColors] = useState({
        dateRecorded: null,
        mspr: null,
        netChange: null
    })

    useEffect(() => {
        changeColorValues()
    }, [insiderSentiments])

    const changeColorValues = () => {
        const newColors = { ...valueColors };

        if (insiderSentiments.mspr === "-") {
            newColors.mspr = null;
        } else {
            const num = Number(insiderSentiments.mspr);
            newColors.mspr = num >= 0;
        }

        if (insiderSentiments.netChange === "-") {
            newColors.netChange = null;
        } else {
            const num = Number(insiderSentiments.netChange);
            newColors.netChange = num >= 0;
        }

        setValueColors(newColors);
    }

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
                <InsiderInfoRow name="Monthly Share Purchase Ratio" value={insiderSentiments.mspr} positive={valueColors.mspr}></InsiderInfoRow>
                <InsiderInfoRow name="Net Insider Share Change" value={insiderSentiments.netChange} positive={valueColors.netChange}></InsiderInfoRow>
            </div>
        </div>
    )
}

export default InsiderSentiment 