import './TimelineOptions.css';
import { getInfoOnSymbol } from '../testData/APITesting';

function TimelineOptions ({ticker, timelineOption, setTimelineOption, setStockGraphData, setInsiderName, setInsiderGraphData}) {
    const updateTimeLineAndGraphData = async(timeOption) => {
        setInsiderGraphData([])
        setInsiderName("")
        setTimelineOption(timeOption)
        if (ticker) {
            const newGraphData = await getInfoOnSymbol(ticker, timeOption)
            console.log("switch graph by timeline", newGraphData);
            setStockGraphData(newGraphData)
        }
    }
    return(
        <div className='tlButtonContainer'>
            {timelineOption === "1W" ? 
                <button className="tlButton selected" onClick={() => setTimelineOption("1W")}>1W</button>: 
                <button className="tlButton notSelected" onClick={() => updateTimeLineAndGraphData("1W")}>1W</button>
            }
            {timelineOption === "2W" ? 
                <button className="tlButton selected" onClick={() => setTimelineOption("2W")}>2W</button>: 
                <button className="tlButton notSelected" onClick={() => updateTimeLineAndGraphData("2W")}>2W</button>
            }
            {timelineOption === "1M" ? 
                <button className="tlButton selected" onClick={() => setTimelineOption("1M")}>1M</button>: 
                <button className="tlButton notSelected" onClick={() => updateTimeLineAndGraphData("1M")}>1M</button>
            }
            {timelineOption === "3M" ? 
                <button className="tlButton selected" onClick={() => setTimelineOption("3M")}>3M</button>: 
                <button className="tlButton notSelected" onClick={() => updateTimeLineAndGraphData("3M")}>3M</button>
            }
            </div>
    )
}

export default TimelineOptions