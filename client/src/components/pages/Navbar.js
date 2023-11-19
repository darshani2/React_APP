import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from '../Dropdown';
 
function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        Gift4Kids
        <i className='fab fa-firstdraft' />
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>

      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/AboutUs' className='nav-links' onClick={closeMobileMenu}>
            About Us
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/OurMission' className='nav-links' onClick={closeMobileMenu}>
            Our Mission
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/Gallery' className='nav-links' onClick={closeMobileMenu}>
            Gallery
          </Link>
        </li>
        
        <li
          className='nav-item'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {loggedInUser ? ( // Check if the user is logged in
            <Link className='nav-links' onClick={closeMobileMenu}>
              {loggedInUser} <i className='fas fa-caret-down' />
            </Link>
          ) : (
            <Link className='nav-links' onClick={closeMobileMenu}>
              Login <i className='fas fa-caret-down' />
            </Link>
          )}
          {dropdown && <Dropdown />}
        </li>
      </ul>
      <Button />
    </nav>
  );
}

export default Navbar;
