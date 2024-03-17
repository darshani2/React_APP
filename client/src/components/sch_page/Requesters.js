// Donations.js

import React, { useState } from 'react';
import '../../App.css';

import Bag1 from '../../images/Bag1.png';
import book from '../../images/book.png';
import sneakers from '../../images/sneakers.png';


const Requesters = () => {
  const data = [
    {
      id: 1,
      imgSrc: sneakers,
    },
    {
      id: 2,
      imgSrc: book,
    },
    {
      id: 3,
      imgSrc: Bag1,
    },
  ];

  const [selected, setSelected] = useState(false);

  const handleImageClick = () => {
    setSelected(!selected);
  };

  const handleDonateClick = () => {
    // Add logic to handle the donation
    alert('Request processing...');
  };

  return (
    <div className={`don-sec ${selected ? 'selected' : ''}`} onClick={handleImageClick}>
      <div className="row">
        {data.map((item) => (
          <div key={item.id} className="col-lg-4">
            <ItemCard title={item.title} imgSrc={item.imgSrc} />
          </div>
        ))}
      </div>
      {selected && <button onClick={handleDonateClick}>Request</button>}
    </div>
  );
};

const ItemCard = ({ title, imgSrc }) => {
  return (
    <div className="don-box">
      <img src={imgSrc} alt={title}></img>
      <h3>{title}</h3>
      <a href='MakeReq' className='btn1'>Request Now</a>  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href='SchoolPage' className='btn1'>Back</a>
    </div>
  );
};

export default Requesters;


