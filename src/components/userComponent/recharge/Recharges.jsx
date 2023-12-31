import React, { useState, useEffect, useRef } from 'react';
import './Recharge.css'; // Import your CSS file for recharge page styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPrice, setSelectedPlan, setSelectedNumber } from '../../../features/auth/authSlice';
import jwt_decode from 'jwt-decode';
import { adminInstance, instance } from '../../../../axios';

const Recharges = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allPlans, setAllplans] = useState([]);
  const [rechargePlans, setRechargePlans] = useState([]);
  const [rechargeNum, setRechargeNum] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [inputError, setInputError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPrice = useSelector((state) => state.auth.selectedPrice);
  const selectedPlan = useSelector((state) => state.auth.selectedPlan);
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const accessToken = authTokens && authTokens.access;
  const recharge_num = accessToken && jwt_decode(accessToken).username;

  useEffect(() => {
    if (recharge_num) {
      setRechargeNum(recharge_num.substring(3));
    }
  }, []);

  useEffect(() => {
    // Fetch and set the categories
    adminInstance
      .get('categories/')
      .then((response) => {
        setCategories(response.data);
        console.log(response.data); // Log the response data
      })
      .catch((error) => console.error(error));

    // Fetch and set the recharge plans based on the selected category
    // Replace this with your own logic to fetch the data from your backend
    adminInstance
      .get('recharge-plans/')
      .then((response) => {
        setAllplans(response.data);
        if (Array.isArray(response.data)) { // Check if response.data is an array
          const filteredPlans = response.data.filter((plan) => plan.category === 1);
          setRechargePlans(filteredPlans);
        } else {
          console.error('Response data is not at all an array:', response.data);
        }
      })
      .catch((error) => console.error(error));

    setSelectedCategory('Popular Plans');
  }, [rechargeNum]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setRechargeNum(input);
      setInputError('');
    } else {
      setInputError('Only digits are allowed.');
    }
  };

  const handlePageClick = (event) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      console.log("numberlength: ", rechargeNum.length)
      console.log("numberlength: ", rechargeNum)
      if (rechargeNum.length === 10) {
        setIsEditing(false);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        document.addEventListener('click', handlePageClick);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handlePageClick);
      };
    }
  }, [isEditing]);

  const parentRef = useRef(null);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category.name);

    // If the category is "Recommended Plans," make an API call to fetch the recommended plans
    if (category.name === "Recommended Plans") {
      try {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        const response = await instance.get('recommended_plans/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });
        if (Array.isArray(response.data)) { // Check if response.data is an array
          setRechargePlans(response.data);
        } else {
          console.error('Response data is not at all an array:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // For other categories, filter the plans based on the category ID as before
      const filteredPlans = allPlans.filter((plan) => plan.category === category.id);
      setRechargePlans(filteredPlans);
    }
  };

  const handleBuyButtonClick = (plan) => {
    dispatch(setSelectedPrice(plan.price));
    dispatch(setSelectedPlan(plan.id));
    dispatch(setSelectedNumber(rechargeNum));
    navigate('/payment');
  };

  return (
    <div className="recharge-container">
      <div className="recharge-left-section">
        <div className="recharge-card">
          <div className="recharge-card-content">
            <h2>Select Plan</h2>
            {isEditing ? (
              <div className="recharge-card-info" ref={parentRef}>
                <input
                  type="text"
                  value={rechargeNum}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="input-field" // Add the class name here
                  placeholder='Enter Mobile Number'
                />

                {inputError && <p className="input-error">{inputError}</p>}
              </div>
            ) : (
              <div className="recharge-card-info">
                {rechargeNum.length === 10 ? (
                  <p>{rechargeNum}</p>
                ) : (
                  <input
                    type="text"
                    value={rechargeNum}
                    onChange={handleInputChange}
                    maxLength={10}
                    style={{ border: 'none', outline: 'none' }}
                    readOnly
                    placeholder='Enter Mobile Number'
                  />
                )}
                <button className="edit-button" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
            )}

            <div className="plan-categories">
              {categories.map((category) => (
                <p key={category.id} onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recharge-right-section">
        <div className="recharge-card">
          {selectedCategory ? (
            <>
              <h2>{selectedCategory}</h2>
              {rechargePlans.length > 0 ? (
                <ul className="recharge-plans-list">
                  {rechargePlans.map((plan) => (
                    <div key={plan.id}>
                      <li>
                        <div className="plan-item">
                          <h3>Plan</h3>
                          <p>${plan.name}</p>
                        </div>
                        <div className="plan-item">
                          <h3>Validity</h3>
                          <p>{plan.validity} days</p>
                        </div>
                        <div className="plan-item">
                          <h3>Data</h3>
                          <p>{plan.data_limit} GB</p>
                        </div>
                        <a href="#" className="view-details">
                          View Details
                        </a>
                        <button className="buy-button" onClick={() => handleBuyButtonClick(plan)}>
                          Buy
                        </button>
                      </li>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No recharge plans available for the selected category.</p>
              )}
            </>
          ) : (
            <p>Please select a category to view the recharge plans.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recharges;
