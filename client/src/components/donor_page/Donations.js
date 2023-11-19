// Donations.js

import React, { useState } from 'react';
import '../../App.css';

import bag4 from '../../images/bag4.png';
import book from '../../images/book.png';
import sneakers from '../../images/sneakers.png';


const Donations = () => {
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
      imgSrc: bag4,
    },
  ];

  const [selected, setSelected] = useState(false);

  const handleImageClick = () => {
    setSelected(!selected);
  };

  const handleDonateClick = () => {
    // Add logic to handle the donation
    alert('Donation processing...');
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
      {selected && <button onClick={handleDonateClick}>Donate</button>}
    </div>
  );
};

const ItemCard = ({ title, imgSrc }) => {
  return (
    <div className="don-box">
      <img src={imgSrc} alt={title}></img>
      <h3>{title}</h3>
      <a href='makedon' className='btn1'>Donate Now</a>
    </div>
  );
};

export default Donations;


