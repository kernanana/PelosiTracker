import './StockControls.css';
import StockSearch from './StockSearch.js'
import StockInfoRow from './StockInfoRow.js';
import TimelineOptions from './TimelineOptions.js';
import { useEffect, useState } from 'react';
import {formatFromDateForProfitAPI} from '../testData/DataConversions.js'

function StockControls({stockTicker, stockName, currentValue, setstockTicker, timelineOption,
    setStockGraphData, setTimelineOption, setInsiderName, setInsiderGraphData, setStockName}) {
    const [reformattedFromDate, setReformattedFromDate] = useState("-")
    
    useEffect(() => {
        const formattedDate = formatFromDateForProfitAPI(timelineOption)
        setReformattedFromDate(formattedDate)
    }, [timelineOption])

    return (
        <div className="top stockCardContainer" >
            <div className='stockInfoContainer stockSearchContainer'>
                <div className='stockSearchBox'>
                    <div className='stockInfoHeader'>
                        Stock Search
                    </div>
                    <div className="preventSearchResultOverflow"> </div>
                    <div className='stockSearchItemsContainer'>
                        {/* <div className='preventSearchResultOverflow'></div> */}
                        <TimelineOptions ticker={stockTicker}
                                        timelineOption={timelineOption}
                                        setTimelineOption={setTimelineOption}
                                        setStockGraphData={setStockGraphData}
                                        setInsiderName={setInsiderName}
                                        setInsiderGraphData={setInsiderGraphData}></TimelineOptions>
                        <div className="preventSearchResultOverflow2"> </div>
                        <div>
                        <StockSearch ticker={stockTicker}
                                    timelineOption={timelineOption}
                                    setTicker={setstockTicker}
                                    setStockGraphData={setStockGraphData}
                                    setInsiderName={setInsiderName}
                                    setInsiderGraphData={setInsiderGraphData}
                                    setStockName={setStockName}
                        ></StockSearch>
                        </div>
                    </div>
                </div>
            </div>
            <div className='stockInfoContainer'>
                <div className='stockInfoHeader'>
                    Stock Info
                </div>
                <StockInfoRow name="Ticker" value={stockTicker}></StockInfoRow>
                <StockInfoRow name="Name" value={stockName}></StockInfoRow>
                <div className='bottom stockInfoRow'>
                    <div className='stockInfoItemLeft'>Value</div>
                    <div className='rightUSDValue'>${currentValue}</div>
                </div>
                <div className='bottom stockInfoRow'>
                    <div className='stockInfoItemLeft'>From Date</div>
                    <div className='stockInfoItemRight'>{reformattedFromDate}</div>
                </div>
            </div>

        </div>
    );
  }

  export default StockControls;
  