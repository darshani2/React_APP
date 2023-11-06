
import React from "react"
import '../../App.css';
import Navbar from './Navbar';
export default function Home() {

  const indentStyle = {
    whiteSpace: 'pre-line',
    fontFamily : 'Helvetica', 
};

  return (
    <div>
      <Navbar/>
      <h1 className="home" style={indentStyle}>
                    Hand 
                    <br/>&nbsp; &nbsp;&nbsp;&nbsp; To
                    <br/>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hand
                    
    </h1>
    </div>
  )
}
