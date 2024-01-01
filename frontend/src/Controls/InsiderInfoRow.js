import './Controls.css'

function InsiderInfoRow({name, value, positive}){
    return (
        <>
        <div className='insiderInfoRow'>
            <div className='insiderInfoItemLeft'>{name}</div>
            {positive === null ? <div className='insiderInfoItemRight nullColor'>{value}</div> :
                (positive) ? <div className='insiderInfoItemRight positiveColor'>+{value}</div> : 
                <div className='insiderInfoItemRight negativeColor'>{value}</div>}
            
        </div>
        </>
        
    )
}

export default InsiderInfoRow