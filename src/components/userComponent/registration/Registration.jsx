import React, { useState, useEffect } from 'react';

import './Registration.css';
import simcard from '../../../assets/SimcardIcon.svg';
import deliveryIcon from '../../../assets/SimcardIcon.svg';
import axios from 'axios';
import { auth } from '../../../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { instance } from '../../../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Registration() {
    const [showOTP, setShowOTP] = useState(false);
    const [showPlanSelection, setShowPlanSelection] = useState(false);
    const [showAddressInput, setShowAddressInput] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [user, setUser] = useState(null)
    const [otp, setOtp] = useState(null)
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null)


    const handleGenerateOTP = async (e) => {
        e.preventDefault();
        if (!name || !/^[A-Za-z]+$/.test(name)) {
            toast.error('Please enter a valid name');
            return;
        }

        // Validate mobile number input
        if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
            toast.error('Please enter a valid mobile number');
            return;
        }

        // Add the "+91" prefix to the mobile number
        const formattedMobileNumber = "+91" + mobileNumber;
        try {
            const verifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
            setRecaptchaVerifier(verifier);
            const confirmationResult = await signInWithPhoneNumber(auth, formattedMobileNumber, recaptchaVerifier);
            setUser(confirmationResult);
            setShowOTP(true);
            setShowPlanSelection(false);
            setShowAddressInput(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (!otp || !/^\d{6}$/.test(otp)) {
            toast.error('Please enter a valid OTP ');
            return;
        }
        try {
            console.log(otp);
            await user.confirm(otp);
            console.log(user)
            // You can store the user details in your database here
        } catch (error) {
            console.log(error);
            toast.error('Incorrect OTP. Please try again.');
            return;
        }
        setShowPlanSelection(true);
        setShowOTP(false);
        setShowAddressInput(false);
    };

    const handlePlanSelection = (e) => {
        e.preventDefault();
        const selectedValue = document.querySelector('input[name="plan"]:checked').value;
        setSelectedPlan(selectedValue);
        setShowOTP(false);
        setShowPlanSelection(false);
        setShowAddressInput(true);

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const mob_number = "+91" + mobileNumber;
        console.log("mobile", mob_number);
      
        const buildingName = e.target.elements.flatHouseNo.value.trim();
        const location = e.target.elements.location.value.trim();
        const area = e.target.elements.area.value.trim();
        const pincode = e.target.elements.pincode.value.trim();
   
      
        if (!buildingName || !location || !area || !pincode) {
          toast.error('Please fill in all the required fields.');
          return;
        }
      
        const formData = new FormData();
        formData.append('mob_number', mob_number);
        formData.append('connection_type', selectedPlan);
        formData.append('address.street', buildingName);
        formData.append('address.city', location);
        formData.append('address.state', area);
        formData.append('address.zip_code', pincode);
        formData.append('profile_name', name);
        formData.append('document_file', e.target.elements.identityDocument.files[0]);
        formData.append('photo', e.target.elements.photo.files[0]);
      
        try {
          const response = await instance.post('connections/create/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          console.log(response.data); // Handle the response as per your requirements
      
          // Additional logic or handling for successful connection creation
        } catch (error) {
          console.log(error);
          // Handle any error that occurs during the API call
        }
      
        // Reset the form after submission
        e.target.reset();
      };
      

    return (
        <div className="registration-page">
            <div className="card">
                <div className="card-header">
                    <img src={simcard} alt="Font Awesome Icon" />
                </div>
                <div >
                    {showOTP ? (
                        <div className='card-body'>
                            <h2>Enter OTP</h2>
                            <form>
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text" placeholder="Enter OTP" />
                                <button type="submit" onClick={handleNext}>Next</button>
                            </form>
                        </div>
                    ) : showPlanSelection ? (
                        <div className='plan'>
                            <h2>Select Plan</h2>
                            <p>Choose your plan: Prepaid or Postpaid</p>
                            <form>
                                <label>
                                    <input type="radio" name="plan" value="prepaid" />
                                    <span className="radio-label">Prepaid</span>
                                </label>
                                <label>
                                    <input type="radio" name="plan" value="postpaid" />
                                    <span className="radio-label">Postpaid</span>
                                </label>
                                <button type="submit" onClick={handlePlanSelection}>Next</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            {showAddressInput ? (
                                <div className='adress'>

                                <h2>Deliver Here</h2>
                                <p>Where do you want your new NexWave SIM to be delivered?</p>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="flatHouseNo" placeholder="Flat, House No., Floor, Company" />
                                    <input type="text" name="location" placeholder="Location" />
                                    <input type="text" name="area" placeholder="Area" />
                                    <input type="text" name="pincode" placeholder="Pincode" />
                                    <div className="file-upload">
                                        <label htmlFor="identityDocument">Your Adhaar (JPG, JPEG, PNG, PDF)</label>
                                        <input type="file" id="identityDocument" name="identityDocument" accept=".jpg,.jpeg,.png,.pdf" />
                                    </div>

                                    <div className="file-upload">
                                        <label htmlFor="photo">Your Photo (JPG, JPEG, PNG)</label>
                                        <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png" />
                                    </div>
                                    <button type="submit">Book SIM Delivery</button>
                                </form>
                            </div>
                            ) : (
                                <div className='card-body'>
                                    <h2>Get a SIM</h2>
                                    <p>Just validate your number, share your address, and we'll deliver it to your doorstep for FREE</p>
                                    <form>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Mobile Number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                        <div id="recaptcha-container"></div>
                                        <p>You will receive an OTP on your number.</p>
                                        <button type="submit" onClick={handleGenerateOTP}>Generate OTP</button>
                                    </form>
                                </div>

                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Registration;
