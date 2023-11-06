import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function MakeReq() {
    const[name,setName] = useState()
    const[email,setEmail] = useState()
    const[nic,setNIC] = useState()
    const[item,setItem] = useState()
    const[quantity,setQuantity] = useState()
    const[location,setLocation] = useState()
    const navigate = useNavigate()

    const Donate = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/user/makereq', {name,email,nic,item,quantity,location})
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
                        <label htmlFor='nic'><strong>Principal NIC</strong></label>
                        <input type='text' placeholder='Enter NIC' className='form-control' 
                        onChange={(e) => setNIC(e.target.value)}/>
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor='item'><strong>Types of Item</strong></label>
                        <select
                            className='form-control'
                            onChange={(e) => setItem(e.target.value)}
                            //value={itemType}
                            //onChange={handleItemTypeChange}
                        >
                            <option value='' disabled hidden>
                                Select an Item
                            </option>
                            <option value='footwear'>Footwear</option>
                            <option value='book'>Book</option>
                            <option value='pen'>Pen</option>
                            <option value='pencil'>Pencil</option>
                            <option value='eraser'>Eraser</option>
                            <option value='bag'>Bag</option>
                        </select>
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
                    <Link to="/schHis" className="btn1"> Submit </Link>
                </form>
            </div>
        </div>
    );
}

export default MakeReq;

