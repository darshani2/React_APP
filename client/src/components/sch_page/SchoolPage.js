import React from 'react';
import SchNavbar from './SchNavbar';
import '../../App.css';

function SchoolPage() {
  const indentStyle = {
    whiteSpace: 'pre-line',
    fontFamily : 'Arial', 
};

  return (
    <div>
      <SchNavbar />
      <h1 className="schoolbg" style={indentStyle}>
      Welcome to the School Home Page
    </h1>
    </div>
  );
};

export default SchoolPage;



