import React, {useState, useEffect} from "react";
import SearchResults from "./StockSearchResults";
import { searchSymbols } from "../testData/APITesting";
import "./StockControls.css"
import { IconContext } from "react-icons/lib";
import { IoIosSearch } from "react-icons/io";

// const mockSearchResults = {
//     count: 4,
//     result: [
//         {symbol: "APPL"},
//         {symbol: "APC.BE"},
//         {symbol: "AAPL.SW"}
//     ]
// }

const Search = ({ticker, timelineOption, setTicker, setStockGraphData, setStockName}) => {
    const [input, setInput] = useState("")
    const [bestMatches, setBestMatches] = useState([])
    const clear = () => {
        setInput("")
        setBestMatches([])
    }

    useEffect(() => {
        updateBestMatches();
    }, [input]);

    const updateBestMatches = async() => {
        // setBestMatches(mockSearchResults.result)
        console.log("updating search dropdown");
        console.log(input);
        try {
            if (input) {
                const searchResults = await searchSymbols(input)
                const result = searchResults.result
                console.log(result);
                setBestMatches(result)
            }
        }
        catch(error){
            setBestMatches([])
            console.log(error);
        }
    }

    const updateTicker = (newTicker, fullName) => {
        setTicker(newTicker)
        setStockName(fullName)
        clear()
    }

    return (
        <div className="searchBarAndResults">
            <div className="searchBoxWithIcon">
                <div className="searchBarContainer">
                    <div className="searchIcon">
                        <IconContext.Provider value={{size: 20}}>
                            <IoIosSearch />
                        </IconContext.Provider>
                    </div>
                    <input type="text"
                    value={input}
                    className="searchStockBar"
                    placeholder="Search for a stock..."
                    onChange={(event) => {
                        setInput(event.target.value)
                    }}
                    >
                    </input>
                    {input && <button className="clearSearchButton" onClick={clear}>
                        X</button>}
                </div>
            </div>

            {input && (bestMatches.length > 0)}
                    {/* <form className="searchBarWithButton">
                        <input className="balsl" type="search" placeholder="Search..." />
                    </form> */}
                    {(input && (bestMatches.length > 0)) ? <SearchResults results={bestMatches}
                                                            timelineOption={timelineOption}
                                                            updateTicker={updateTicker}
                                                            setStockGraphData={setStockGraphData}></SearchResults> : null}
        </div>
    )
}

export default Search;