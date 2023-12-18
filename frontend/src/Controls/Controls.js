import React, { useState, useEffect } from 'react';
import './Controls.css';
import InsiderSearch from './ControlSearch';
import InsiderSentiment from './InsiderSentiment';
import AnalystRecommendation from './AnalystRecommendation';

function Controls({currentStock, timelineOption, insiderName,
    setInsiderName, setInsiderGraphData}) {

    return (
        <div className="cardContainer">
            <div className='insiderCardContainer'>
                <InsiderSentiment currentStock={currentStock}></InsiderSentiment>
                <AnalystRecommendation currentStock={currentStock}></AnalystRecommendation>
                {/* TODO: If you find a good API, enable insider search in the future
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
                </div> */}
            </div>
        </div>
    );
  }
  
  export default Controls;
  