import './App.css';
import StockOverlay from './StockOverlay/StockOverlay.js';
import { useState, useMemo, useEffect } from 'react';
import Navbar from './Navbar/Navbar.js';
import About from './About/About.js';
import {combineGraphData} from './testData/DataConversions.js'
import Chart from './chart/Chart.js'
import Controls from './Controls/Controls.js'
import StockControls from './StockControls/StockControls.js';

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
  console.log("App component rerendered");

  useEffect(() => {
    console.log(stockGraphData);
    const reformattedGraphData = combineGraphData(stockGraphData);
    setFinalGraphData(reformattedGraphData)
    const graphData = reformattedGraphData.graphData
    if (graphData.length > 0) {
      const currVal = graphData[graphData.length - 1]["value"]
      setCurrentValue(currVal)
    }
  }, [timelineOption, stockGraphData])
  
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

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}></Navbar>
      {(currentPage === "Home") ? 
      <div className='everything'>
      <StockOverlay 
        setstockTicker={setstockTicker} 
        setStockName={setStockName} 
        timelineOption={timelineOption}
        setStockGraphData={setStockGraphData}
        >  
      </StockOverlay>
      <div className="ccContainer">
        <div className='reorderContainer'>
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
      </div>
      </div> :
      <About></About>
    }

    </div>
    
  );
}

export default App;
