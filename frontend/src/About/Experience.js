import './Experience.css'

function Experience(){
    return (
        <div className='experienceContainer'>
            <div className='experienceHeader'>⏳Here is an overview of my past:</div>
            <ul className="experienceBulletList">
                <li className='experienceBullet'>2024 - will graduate Rose-Hulman Institute of Technology with a BS in Software Engineering this May</li>
                <li className='experienceBullet'>2023 - Software Engineering in DevOps internship at Hexagon Manufacturing Intelligence</li>
                <li className='experienceBullet'>2022 - Software Engineering internship at Rose-Hulman Ventures</li>
                <li className='experienceBullet'>2020 - graduated high school and moved to Terre Haute, IN from Thousand Oaks, California</li>
            </ul>
            <div className='experienceBody'>
                🤗Here is a link to my personal web portfolio:&nbsp;
                <a className='textLink' href='https://kernanana.github.io/react-portfolio/'>My Portfolio</a>
            </div>
            <br></br>
            <div className='experienceBody'>
                😎As of January 2024, I am currently looking for a full-time position for a May 2024 start. Please reach out to me on&nbsp; 
                <a className='textLink' href='https://www.linkedin.com/in/kernan-lee-4b0a501b6'>LinkedIn</a> if you know of any opportunities or recruiters!
            </div>
        </div>
        
    )
}

export default Experience