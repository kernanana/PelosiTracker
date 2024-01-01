import './StockOverlay.css'
import StockNews from './StockNews'
import msft_logo from '../Images/msft_logo.png'
import aapl_logo from '../Images/aapl_logo.png'
import nvda_logo from '../Images/nvda_logo.png'
import meta_logo from '../Images/meta_logo.png'
import React,{ memo } from 'react'

const StockOverlay = React.memo(({setstockTicker, setStockName, timelineOption, setStockGraphData}) =>  {
    console.log("StockOverlay Rendered");
    const stockNews1 = {
        newsHeader: "MSFT",
        fullName: "MICROSOFT CORP",
        logoImage: msft_logo
    }
    const stockNews2 = {
        newsHeader: "NVDA",
        fullName: "NVIDIA CORP",
        logoImage: nvda_logo
    }
    const stockNews3 = {
        newsHeader: "AAPL",
        fullName: "APPLE INC",
        logoImage: aapl_logo
    }
    const stockNews4 = {
        newsHeader: "META",
        fullName: "META PLATFORMS INC-CLASS A",
        logoImage: meta_logo
    }

    return (
        <div className='overlayContainer'>
            <StockNews newsData={stockNews1}
                    setstockTicker={setstockTicker} 
                    setStockName={setStockName} 
                    timelineOption={timelineOption}
                    setStockGraphData={setStockGraphData}></StockNews>
            <StockNews newsData={stockNews2}
                    setstockTicker={setstockTicker} 
                    setStockName={setStockName} 
                    timelineOption={timelineOption}
                    setStockGraphData={setStockGraphData}></StockNews>
            <StockNews newsData={stockNews3}
                    setstockTicker={setstockTicker} 
                    setStockName={setStockName} 
                    timelineOption={timelineOption}
                    setStockGraphData={setStockGraphData}></StockNews>
            <StockNews newsData={stockNews4}
                    setstockTicker={setstockTicker} 
                    setStockName={setStockName} 
                    timelineOption={timelineOption}
                    setStockGraphData={setStockGraphData}></StockNews>
        </div>
    )
})

export default StockOverlay