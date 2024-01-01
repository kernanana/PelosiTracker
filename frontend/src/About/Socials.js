import './Socials.css'
import InstaLogo from '../Images/Instagram_OW.png'
import LinkedInLogo from '../Images/LinkedIn_BW.png'

function Socials() {
    return (
        <div className='socialsContainer'>
            <div className='logoContainer'>
                <a href='https://www.linkedin.com/in/kernan-lee-4b0a501b6'>
                    <img className='socialLogo' src={LinkedInLogo}></img>
                </a>
            </div>
            <div className='logoContainer'>
                <a href='https://www.instagram.com/kernana_lee/?igshid=YmMyMTA2M2Y%3D'>
                    <img className='socialLogo' src={InstaLogo}></img>
                </a>
            </div>
            
        </div>
    )
}

export default Socials