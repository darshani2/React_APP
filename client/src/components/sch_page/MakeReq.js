import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MakeReq() {
    const { id } = useParams();
    const [itemType, setItemType] = useState(''); // State to store the selected item type

    const handleItemTypeChange = (e) => {
        setItemType(e.target.value);
    };

    useEffect(() => {
        axios.get('http://localhost:8081/makereq/' + id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className='schPage'>
            <div className='border'>
                <form>
                    <h2>Make a Request</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>School Name</strong></label>
                        <input type='text' placeholder='Enter Name' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong> School Email</strong></label>
                        <input type='email' placeholder='Enter Email' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='nic'><strong>Principal NIC</strong></label>
                        <input type='text' placeholder='Enter NIC' className='form-control' />
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor='item'><strong>Types of Item</strong></label>
                        <select
                            className='form-control'
                            value={itemType}
                            onChange={handleItemTypeChange}
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
                        <input type='text' placeholder='Enter Quantity' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='location'><strong>Location</strong></label>
                        <input type='text' placeholder='Enter Location' className='form-control' />
                    </div>
                    <button className='btn'>Donate</button>
                </form>
            </div>
        </div>
    );
}

export default MakeReq;

