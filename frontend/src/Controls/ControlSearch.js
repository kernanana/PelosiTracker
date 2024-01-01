import React, {useState, useEffect} from "react";
import InsiderSearchResults from "./ControlSearchResults"
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons/lib";

const InsiderSearch = ({currentStock, timelineOption, setInsiderName, setInsiderGraphData}) => {
    const [input, setInput] = useState("")
    const [bestMatches, setBestMatches] = useState([])
    const clear = () => {
        setInput("")
        setBestMatches([])
    }

    useEffect(() => {
        console.log("updating insider best matches because new", input, timelineOption);
        updateBestMatches();
    }, [input, timelineOption]);

    const updateBestMatches = async() => {
        // setBestMatches(mockSearchResults.result)
        console.log("updating search dropdown");
        try {
            if (input && currentStock) {
                // const searchResults = await searchInsiderInfo(currentStock, timelineOption)
                // const result = searchResults.result
                // setBestMatches(result)
            }
        }
        catch(error){
            setBestMatches([])
            console.log(error);
        }
    }

    const updateInsider = (newName) => {
        setInsiderName(newName)
        clear()
    }

    return (
        <div className="searchBarAndResults">
            <div className="searchBoxWithIcon">
                <div className="searchIcon">
                    <IconContext.Provider value={{size: 20}}>
                        <IoIosSearch />
                    </IconContext.Provider>
                </div>
                <input type="text"
                value={input}
                className="insiderSearchBox"
                placeholder="Search for an Insider..."
                onChange={(event) => {
                    setInput(event.target.value)
                }}
                >
                </input>
                {input && <button className="clearSearchButton" onClick={clear}>X</button>}
            </div>
            
                
            {(input && (bestMatches.length > 0)) ? 
            <InsiderSearchResults 
                results={bestMatches} 
                ticker={currentStock}
                timelineOption={timelineOption}
                updateInsider={updateInsider}
                setInsiderGraphData={setInsiderGraphData}></InsiderSearchResults> : 
            null}
        </div>
    )
}

export default InsiderSearch;