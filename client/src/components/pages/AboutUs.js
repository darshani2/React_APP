import React from "react";
import '../../App.css';
import Navbar from './Navbar';

export default function AboutUs() {
  return (
    <>
    <Navbar/>
    <div className="aboutus">
      
      <img src="./images/logo_new.png" alt="" /> 
      
      <div className="text-column">
        <h1>Introducing New Club Logo</h1>
        <h3>Boundary with a circle around it</h3>
        <p>A commitment to social service, without going beyond the<br/>
         responsibilities and duties of a Leo, without expecting any power or<br/>
          reward benefits.</p>

        <h3>The two majestic lions holding the shield with the Leo logo</h3>
        <p>Despite the limited resources and obstacles, making the most of all <br/>
         the resources and doing their best for the future of our Leo  <br/>
         community and that he dedicates his life for the betterment.</p>

        <h3>The Shield with the Leo logo</h3>
        <p>The human qualities that are required to function as a Leo</p>

        <h3>The Crown</h3>
        <p>Achieving a clear, acceptable, and dignified sense of our Leo <br/>
         community in the minds of everyone in the society who are maturing <br/>
          day by day through the experience gained through the opportunities <br/>
           obtained.</p>

        <h3>Hand to hand</h3>
        <p>This is our theme. This means that we will continue to provide our <br/>
         service to all those who are in constant need of help.</p>
      </div>
    </div>
    </>
  );
}
