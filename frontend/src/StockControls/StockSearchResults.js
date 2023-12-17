import React from "react"
import "./StockControls.css"
import {getInfoOnSymbol} from '../testData/APITesting'

const SearchResults = ({results, timelineOption, updateTicker, setStockGraphData}) => {

    const updateStockTableAndGraph = async(symbol, fullName) => {
        const data = await getInfoOnSymbol(symbol, timelineOption)
        updateTicker(symbol, fullName)
        setStockGraphData(data)
    }

    return (<div className="searchResultContainer">
        {results.map((item) => {
            return <div key={item.symbol} 
                    className="searchResultOption"
                    onClick={() => updateStockTableAndGraph(item.symbol, item.description)}>
                <span>{item.symbol}</span>
            </div>
        })}
    </div>)
}

export default SearchResults