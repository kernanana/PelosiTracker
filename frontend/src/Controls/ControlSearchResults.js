import React from "react"
import "./Controls.css"
import {getInfoOnInsider} from "../testData/APITesting.js"

const InsiderSearchResults = ({results, ticker, timelineOption, updateInsider, setInsiderGraphData}) => {
    // console.log("insider results", results);
    const updateInsiderTableAndGraph = async(insiderName) => {
        updateInsider(insiderName)
        const newGraphData = await getInfoOnInsider(insiderName, ticker, timelineOption)
        setInsiderGraphData(newGraphData)
    }

    return (<div className="searchResultContainer">
        {results.map((item) => {
            return <div key={item.name} 
                    className="searchResultOption"
                    onClick={() => updateInsiderTableAndGraph(item.name)}>
                <span>{item.name}</span>
            </div>
        })}
    </div>)
}

export default InsiderSearchResults