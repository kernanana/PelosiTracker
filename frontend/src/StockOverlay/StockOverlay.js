import './StockOverlay.css'
import StockNews from './StockNews'
import msft_logo from '../Images/msft_logo.png'
import aapl_logo from '../Images/aapl_logo.png'
import nvda_logo from '../Images/nvda_logo.png'
import meta_logo from '../Images/meta_logo.png'

function StockOverlay() {
    const stockNews1 = {
        newsHeader: "MSFT",
        logoImage: msft_logo
    }
    const stockNews2 = {
        newsHeader: "NVDA",
        logoImage: nvda_logo
    }
    const stockNews3 = {
        newsHeader: "AAPL",
        logoImage: aapl_logo
    }
    const stockNews4 = {
        newsHeader: "META",
        logoImage: meta_logo
    }

    return (
        <div className='overlayContainer'>
            <StockNews newsData={stockNews1}></StockNews>
            <StockNews newsData={stockNews2}></StockNews>
            <StockNews newsData={stockNews3}></StockNews>
            <StockNews newsData={stockNews4}></StockNews>
        </div>
    )
}

export default StockOverlay