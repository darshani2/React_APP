import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import { BellFill  } from 'react-bootstrap-icons';


export function Button() {
  return (
    <>
    <Link to='NotificationPage'>
      <BellFill color='royalblue' />
    </Link>
    </>
  );
}
