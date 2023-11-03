import React from "react";
import '../../App.css';
import Navbar from './Navbar';

export default function OurMission() {
  return (
    <>
    <Navbar/>
    <div className="ourmission">
      <h1>Our Mission</h1>
      <h3>Our mission is to empower and uplift the lives of school children in need. We aim to:</h3>

      <p> * Provide financial support for school fees, uniforms, and educational materials to ensure that
      every child can attend school. <br/>
      * Offer additional resources such as tutoring and mentorship programs to enhance learning outcomes.<br/>
      * Create a safe and nurturing environment for children, fostering personal growth and development. <br/>
      * Collaborate with communities, schools, and individuals to raise awareness and resources for our cause.<br/>
      * Ensure that no child's potential is limited by their financial circumstances, and that every child
      can dream, learn, and succeed.<br/>
      <h4>Together, we can make a lasting difference in the lives of these children, helping them build a brighter,
      more promising future.</h4>
      </p>
    </div>
    </>
  );
}
