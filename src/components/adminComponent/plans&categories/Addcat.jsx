import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminInstance } from '../../../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./AddnewPlan.css"

const Addcat = () => {
    const [catname, setCatname] = useState('');
    const navigate = useNavigate(); // Fix: Add parentheses to useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        if (!catname) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const catData = {
                "name": catname
                }
                

            const response = await adminInstance.post('plan-categories/add/',catData, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('category created:', response.data);

            // Reset form fields
            setCatname('');

        } catch (error) {
            console.error('Error:', error);
        }

        navigate('/admins/recharge/add');
    };
    return (
        <div className="form-containers">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-fields">
                    <label htmlFor="name">Category:</label>
                    <input
                        type="text"
                        id="name"
                        value={catname}
                        onChange={(e) => setCatname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Addcat