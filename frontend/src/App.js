import './App.css';
import StockOverlay from './StockOverlay/StockOverlay.js';
import { useState, useMemo } from 'react';
import Navbar from './Navbar/Navbar.js';
import About from './About/About.js';
import ControlsAndGraph from './ControlsAndGraph/ControlsAndGraph.js';

function App() {
  const [currentPage, setCurrentPage] = useState("Home")
  console.log("App component rerendered");

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}></Navbar>
      {(currentPage === "Home") ? 
      <>
      <StockOverlay></StockOverlay>
      <ControlsAndGraph></ControlsAndGraph>
      </> :
      <About></About>
    }

    </div>
    
  );
}

export default App;
