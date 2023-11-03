import React, { useState } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import './SchNavbar.css';
import axios from 'axios';

function SchNavbar() {
  const [click, setClick] = useState(false);
  
  const closeMobileMenu = () => setClick(false);

  const location = useLocation();
  const isSchoolPage = location.pathname === '/SchoolPage'; // Update with the correct path
  const [userData, setUserData] = useState();
  const navigate =  useNavigate();

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
          <Link to='/SchoolPage' className='navbar_logo' onClick={closeMobileMenu}>
            School Page
            <i className='fab fa-firstdraft' />
          </Link>
          

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/SchoolPage' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
            <Link to='/makeReq' className='nav-links' onClick={closeMobileMenu}>
              Make Request
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/receivedDonations' className='nav-links' onClick={closeMobileMenu}>
              Received Donations
            </Link>
          </li>
      
       <li className='nav-item'>
              <Link className='nav-links' onClick={handleLogout}>
                Logout
              </Link>
            </li>
            </ul>
        </nav>
      )}
    </>
  );
}

export default SchNavbar;
