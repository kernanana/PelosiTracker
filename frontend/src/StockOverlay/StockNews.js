import { useState, useEffect } from 'react'
import './StockOverlay.css'
import { getStockQuote } from '../testData/APITesting'

function StockNews({newsData}) {
    const [stockQuote, setStockQuote] = useState({
        symbol: "-",
        value: "-",
        change: "-",
        percentChange: "-"
    });

    console.log('StockNews rendered for', newsData.newsHeader, "with data:", stockQuote);

    const fetchStockQuote = async () => {
        const response = await getStockQuote(newsData.newsHeader);
        setStockQuote(response);

    };

    useEffect(() => {
        fetchStockQuote();
      }, []);

    const setGraphDataToNewStock = () => {
        console.log("set graph to", newsData.newsHeader);
    }

    return (
        <div className='overlayUnitContainer' onClick={setGraphDataToNewStock}>
            <div className='overlayUnit'>
                <div className='overlayHeaderContainer'>
                    <div className='overlayHeaderImage'>
                        <img className='stockLogo' src={newsData.logoImage}></img>
                    </div>
                    <div className='overlayHeader'>{newsData.newsHeader}</div>
                    <div className='overlayHeaderCurrency'>USD</div>
                </div>
                <div className='overlayCPriceContainer'>
                    <div className='overlayCurrentPrice'>${stockQuote.value}</div>
                </div>
                <div className='overlayPriceChangesContainer'>
                    {(stockQuote.change) === "-" ?
                        <div className='overlayPriceChangeValue'>${stockQuote.change}</div>:
                        (stockQuote.change >= 0 ?
                            <div className='overlayPriceChangeValue'>${stockQuote.change}</div>:
                            <div className='negativeValue overlayPriceChangeValue'>-${stockQuote.change * -1}</div>)}
                    {((stockQuote.percentChange === "-") || (stockQuote.percentChange >= 0)) ?
                        <div className='overlayPriceChangePercent'>{stockQuote.percentChange}%</div> :
                        <div className='negativeValue overlayPriceChangePercent'>{stockQuote.percentChange}%</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default StockNews