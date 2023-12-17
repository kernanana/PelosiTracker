import './StockControls.css'

function StockInfoRow({name, value}){
    return (
        <div className='stockInfoRow'>
            <div className='stockInfoItemLeft'>{name}</div>
            <div className='stockInfoItemRight'>{value}</div>
        </div>
    )
}

export default StockInfoRow