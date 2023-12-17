import './App.css';
import Chart from './chart/Chart.js'
import Controls from './Controls/Controls.js'
import StockControls from './StockControls/StockControls.js';
import StockOverlay from './StockOverlay/StockOverlay.js';
import { useEffect, useState, useMemo } from 'react';
import {combineGraphData} from './testData/DataConversions.js'
import Navbar from './Navbar/Navbar.js';
import About from './About/About.js';

function App() {
  const [currentPage, setCurrentPage] = useState("Home")
  const [stockTicker, setstockTicker] = useState("-")
  const [stockName, setStockName] = useState("-")
  const [currentValue, setCurrentValue] = useState("-")
  const [insiderName, setInsiderName] = useState("-")
  const [stockGraphData, setStockGraphData] = useState([])
  const [timelineOption, setTimelineOption] = useState("2W")
  const [insiderGraphData, setInsiderGraphData] = useState([])
  const [finalGraphData, setFinalGraphData] = useState([])

  useEffect(() => {
    const combinedData = combineGraphData(stockGraphData, insiderGraphData);
    setFinalGraphData(combinedData)
    if (combinedData.length > 0) {
      const currVal = combinedData[combinedData.length - 1]["value"]
      setCurrentValue(currVal)
    }
  }, [timelineOption, stockGraphData, insiderGraphData])
  
  useEffect(() => {
    console.log("data has been updated", 
      "stockTicker:", stockTicker,
      "stockName:", stockName,
      "insiderName", insiderName,
      "timelineOption", timelineOption,
      "stockGraphData", stockGraphData,
      "insiderGraphData", insiderGraphData,
      "finalGraphData", finalGraphData);
  },[stockTicker, insiderName, timelineOption, stockGraphData, insiderGraphData, finalGraphData, stockName])

  const memoizedStockOverlay = useMemo(() => {
    return <StockOverlay />;
  }, []);

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}></Navbar>
      {/* <Intro></Intro> */}
      {(currentPage === "Home") ? 
      <>
      {memoizedStockOverlay}
      <div className="ccContainer">
      
        <div className='chartContainer'>
          <Chart finalGraphData={finalGraphData}></Chart>
          <Controls
            currentStock={stockTicker}
            currentValue={currentValue}
            timelineOption={timelineOption}
            insiderName={insiderName}
            setInsiderName={setInsiderName}
            setInsiderGraphData={setInsiderGraphData}></Controls>
        </div>
        <div className='scContainer'>
          <StockControls stockTicker={stockTicker}
                        stockName={stockName}
                        currentValue={currentValue}
                        setstockTicker={setstockTicker}
                        setStockGraphData={setStockGraphData}
                        timelineOption={timelineOption}
                        setTimelineOption={setTimelineOption}
                        setInsiderName={setInsiderName}
                        setInsiderGraphData={setInsiderGraphData}
                        setStockName={setStockName}></StockControls>
        </div>
      </div>
      </> :
      <About></About>
    }

    </div>
    
  );
}

export default App;
