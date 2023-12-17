import React, { useState, useEffect } from 'react';
import './Controls.css';
import InsiderInfoRow from './InsiderInfoRow';
import InsiderSearch from './ControlSearch';
import { getInsiderSentiment } from '../testData/APITesting';

function Controls({currentStock, timelineOption, insiderName,
    setInsiderName, setInsiderGraphData}) {
    
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

    return (
        <div className="cardContainer">
            <div className='insiderCardContainer'>
                <div className='insiderContainer'>
                    <div className='insiderHeader'>
                        Insider Sentiment
                    </div>
                    <div className='insiderItemContainer insiderInfoContainer'>
                        <InsiderInfoRow name="Date of Recording" value={insiderSentiments.dateRecorded} positive={null}></InsiderInfoRow>
                        <InsiderInfoRow name="Monthly Share Purchase Ratio" value={insiderSentiments.mspr} positive={true}></InsiderInfoRow>
                        <InsiderInfoRow name="Net Insider Share Change" value={insiderSentiments.netChange} positive={false}></InsiderInfoRow>
                    </div>
                </div>
                <div className='insiderContainer insiderSearchContainer'>
                    <div className='insiderHeader'>Insider Search</div>
                    <div className={(insiderName === "-" || !insiderName) ? 'nullName currentInsiderContainer' : 'insiderName currentInsiderContainer'}>
                        {(insiderName === "-" || !insiderName) ? "-" : insiderName}
                    </div>
                    <div className='insiderItemContainer'>
                        <InsiderSearch
                            currentStock={currentStock}
                            timelineOption={timelineOption}
                            setInsiderName={setInsiderName}
                            setInsiderGraphData={setInsiderGraphData}></InsiderSearch>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Controls;
  