import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Makedon() {
    const[name,setName] = useState()
    const[email,setEmail] = useState()
    const[phone,setPhone] = useState()
    const[nic,setNIC] = useState()
    const[item,setSize] = useState()
    const[quantity,setQuantity] = useState()
    const[location,setLocation] = useState()

    const Donate = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/user/makedonation', {name,email,phone,nic,item,quantity,location})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    return (
        <div className='donPage'>
            <div className='border'>
                <form onSubmit={Donate}>
                    <h2>Make Donations</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' placeholder='Enter Name' className='form-control' 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' className='form-control' 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='phone'><strong>Phone number</strong></label>
                        <input type='text' placeholder='Enter Phone' className='form-control' 
                        onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='nic'><strong>NIC</strong></label>
                        <input type='text' placeholder='Enter NIC' className='form-control' 
                        onChange={(e) => setNIC(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='nicitem'><strong>Size Of Item</strong></label>
                        <input type='text' placeholder='Enter size' className='form-control' 
                        onChange={(e) => setSize(e.target.value)}/>
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor='quantity'><strong>Quantity</strong></label>
                        <input type='text' placeholder='Enter Quantity' className='form-control' 
                        onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='location'><strong>Location</strong></label>
                        <input type='text' placeholder='Enter Location' className='form-control' 
                        onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    <Link to="/donhis" className="btn1"> Donate </Link>
                </form>
            </div>
        </div>
    );
}

export default Makedon;
