import React from 'react';
import './About.css'
import Socials from './Socials'
import Experience from './Experience';
import Me from '../Images/meandatree.jpg'

function About() {
    return (
        <div className='aboutBackground'>
            <div className='aboutHeaderContainer'>
                <img className='meImage' src={Me}></img>
                <div className='aboutHeaderIntroduction'>
                <div>
                    At the start of this site's development, I had  
                    put off learning two very important skills for the modern software engineer:
                    <span className='highlight'> (1)</span> learning React and <span className='highlight'>(2)</span> managing retirement account investments. This project represents a creative effort 
                    to kill both birds with one stone.
                    <br></br><br></br>
                    <span className='highlight'>IMPORTANT:</span> It's worth mentioning that I am currently a 4th year undergrad student at Rose-Hulman Institute of 
                    Technology. As a result of having the financial circumstance of a college student, I have opted for various FREE
                    API services to gather financial data which comes with rate limits. This means that information for this site is limited -- 
                    clicking buttons too quickly may cause data to stop loading. Please reach out to me if you recommend any stock market API 
                    services with more generous call rates than: Finnhub, Twelve Data, or Profit.com. Thank you for visiting my site!

                </div>
                </div>
            </div>
            <Socials></Socials>
            <Experience></Experience>
            <div className='empty'></div>
        </div>
    )
}

export default About