import React from 'react';
import { useState, useEffect } from 'react';
import './Navbar.css'

function Navbar({currentPage, setCurrentPage}) {
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
  
  
    const controlNavbar = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 0) {
          setShowNavbar(true)
        }
        else if ((currentScrollY > lastScrollY)) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      
        setLastScrollY(currentScrollY);
      };
  
    useEffect(() => {
      window.addEventListener('scroll', controlNavbar);
      return () => {
         window.removeEventListener('scroll', controlNavbar);
      };
    }, [lastScrollY]);

    return (
        <nav className={`navContainer ${showNavbar ? '' : 'hidden'}`}>
            <div className='navHeader'>
                <div className='navHeader'>Stock Trade Tracker</div>
            </div>
            <ul className='navOptions'>
                <div className={(currentPage === "Home") ? 'selectedPage navLink' : 'navLink'} onClick={() => setCurrentPage("Home")}>Home</div>
                <div className={(currentPage === "About") ? 'selectedPage navLink' : 'navLink'} onClick={() => setCurrentPage("About")}>About</div>
            </ul>
        </nav>
    );
}

export default Navbar;