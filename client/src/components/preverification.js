import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PreVerification() {
  useEffect(() => {
    // Disable the ability to go back
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButtonPress);

    return () => {
      window.removeEventListener('popstate', handleBackButtonPress);
    };
  }, []);

  const handleBackButtonPress = (e) => {
    // Push a new entry onto the history stack
    window.history.pushState(null, null, window.location.pathname);
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Check your emails for Verification</p>
      <p> <Link to='/'>Return to Home</Link> </p>
    </div>
  );
}

export default PreVerification;
