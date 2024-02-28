import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function MakeReq() {
    const[name,setName] = useState()
    const[email,setEmail] = useState()
    const[quantity,setQuantity] = useState()
    const[phone,setPhone] = useState()
    const[item,setSize] = useState()
    const[location,setLocation] = useState()
    const navigate = useNavigate()

    const Donate = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/user/makereq', {name,email,quantity,phone,item, location})
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
        navigate('/')
    }

    return (
        <div className='schPage'>
            <div className='border'>
                <form onSubmit={Donate}>
                    <h2>Make a Request</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>School Name</strong></label>
                        <input type='text' placeholder='Enter Name' className='form-control'
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong> School Email</strong></label>
                        <input type='email' placeholder='Enter Email' className='form-control' 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    
                
                    <div className='mb-3'>
                        <label htmlFor='quantity'><strong>Quantity</strong></label>
                        <input type='text' placeholder='Enter Quantity' className='form-control' 
                        onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='phone'><strong>Phone number</strong></label>
                        <input type='text' placeholder='Enter Phone' className='form-control' 
                        onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor='item'><strong>Size Of Item</strong></label>
                        <input type='text' placeholder='Enter size' className='form-control' 
                        onChange={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='location'><strong>Location</strong></label>
                        <input type='text' placeholder='Enter Location' className='form-control' 
                        onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    <Link to="/schHis" className="btn1"> Submit </Link>
                </form>
            </div>
        </div>
    );
}

export default MakeReq;

