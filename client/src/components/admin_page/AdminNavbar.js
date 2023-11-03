import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import axios from 'axios';

function AdminNavbar() {
  const [click, setClick] = useState(false);
  const navigate =  useNavigate();
  const closeMobileMenu = () => setClick(false);

  const location = useLocation();
  const isSchoolPage = location.pathname === '/AdminPage'; 
  const [userData, setUserData] = useState();

  const handleLogout = () => {

    axios
      .post('http://localhost:8081/logout')
      .then((res) => {
        if (res.status === 200) {
          setUserData(null);
          navigate('/'); 
        } else {
          alert('Logout failed. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Error while logging out:', err);
        alert('An error occurred while logging out.');
      });
  };

  return (
    <>
      {isSchoolPage && (
        <nav className='schNavbar'>
          <Link to='/AdminPage' className='navbar_logo' onClick={closeMobileMenu}>
            Admin Page
            <i className='fab fa-firstdraft' />
          </Link>
          

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/AdminPage' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
            <Link to='/donorDetails' className='nav-links' onClick={closeMobileMenu}>
              Donor Details
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/schoolDetails' className='nav-links' onClick={closeMobileMenu}>
              School Details
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/requests' className='nav-links' onClick={closeMobileMenu}>
              Requests
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/donations' className='nav-links' onClick={closeMobileMenu}>
              Donations
            </Link>

            <li className='nav-item'>
              <Link className='nav-links' onClick={handleLogout}>
                Logout
              </Link>
            </li>
            
          </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default AdminNavbar;
