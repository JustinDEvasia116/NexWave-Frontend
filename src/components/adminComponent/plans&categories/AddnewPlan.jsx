import React, { useState,useEffect } from 'react';
import "./AddnewPlan.css"
import { adminInstance } from '../../../../axios';


const AddnewPlan = () => {
  const [name, setName] = useState('');
  const [dataLimit, setDataLimit] = useState('');
  const [voiceLimit, setVoiceLimit] = useState('');
  const [smsLimit, setSmsLimit] = useState('');
  const [price, setPrice] = useState('');
  const [validity, setValidity] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation
    if (!name || !dataLimit || !voiceLimit || !smsLimit || !price || !validity || !category) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
      const planData = {
        name,
        data_limit: parseInt(dataLimit),
        voice_limit: parseInt(voiceLimit),
        sms_limit: parseInt(smsLimit),
        price: parseFloat(price),
        validity: parseInt(validity),
        category
      };
  
      const response = await adminInstance.post('plans/create/', planData,
      {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Plan created:', response.data);
  
      // Reset form fields
      setName('');
      setDataLimit('');
      setVoiceLimit('');
      setSmsLimit('');
      setPrice('');
      setValidity('');
      setCategory('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminInstance.get('categories/');
        setCategories(response.data);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="form-containers">
      <h2>Add New Recharge Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-fields">
          <label htmlFor="dataLimit">Data Limit:</label>
          <input
            type="number"
            id="dataLimit"
            value={dataLimit}
            onChange={(e) => setDataLimit(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-fields">
          <label htmlFor="voiceLimit">Voice Limit:</label>
          <input
            type="number"
            id="voiceLimit"
            value={voiceLimit}
            onChange={(e) => setVoiceLimit(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-fields">
          <label htmlFor="smsLimit">SMS Limit:</label>
          <input
            type="number"
            id="smsLimit"
            value={smsLimit}
            onChange={(e) => setSmsLimit(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-fields">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-fields">
          <label htmlFor="validity">Validity:</label>
          <input
            type="number"
            id="validity"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            min="0"
            required
          />
        </div>

    <div className="form-fields">
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

        <button type="submit">Add</button>
      </form>
    </div>

  );
};

export default AddnewPlan;
