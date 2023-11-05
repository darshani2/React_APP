import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function Verification() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...'); 
  const { role } = useParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      console.log('Token received:', token);

      // Use jwt-decode to decode the JWT token
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      if (decodedToken) {
        const userRole = decodedToken.data.role;
        // console.log(userRole)

        axios
          .post(`http://localhost:8081/user/${userRole}/verify?token=${token}`)
          .then((response) => {
            console.log('Verification response:', response);
            setVerificationStatus('Email verified successfully');
            setTimeout(() => {
              setVerificationStatus('Redirecting to Home page');
              setTimeout(() => {
                navigate(
                  `/${
                    userRole === 'admin'
                      ? 'AdminPage'
                      : userRole === 'donor'
                      ? 'DonorPage'
                      : 'SchoolPage'
                  }`
                );
              }, 2000);
            }, 3000);
          })
          .catch((error) => {
            console.error('Verification error:', error);
            setVerificationStatus('Email verification failed');
          });
      }
    }
  }, [location.search]);

  return (
    <div>
      <h2>Email Verification {role} </h2>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default Verification;
