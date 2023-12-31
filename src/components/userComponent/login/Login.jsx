import React, { useState } from 'react';
import './Login.css';
import { userLogin } from '../../../features/auth/authSlice';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
  const [otpMode, setOtpMode] = useState(false);
  const [mob_number,setMob_Number] = useState('')
  const navigate = useNavigate()

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    const mobileNumberInput = document.getElementById('mobile-number');
    
    const mobileNumber = mobileNumberInput.value;
  
    // // Validate the mobile number
    const isValidMobileNumber = /^[6-9]\d{9}$/.test(mobileNumber);
  
    if (!isValidMobileNumber) {
      // Display an error message or apply some styling to indicate the validation error
      
      toast.error('invalid mobile number');
      return;
    }
    // // Add +91 to the mobile number
    const formattedMobileNumber = "+91"+ mobileNumber;
    setMob_Number(formattedMobileNumber)
    // // Make a POST request to the API endpoint
    const response = await instance.post('generate-otp/', {
      mob_number: formattedMobileNumber,
    });
      // Handle the response
    if (response.status === 200) {
      setOtpMode(true);
      toast.success("OTP send successfully")
    } else {
      // Handle error
      console.log('Failed to generate OTP');
      toast.error("Failed to generate OTP")
      
    }
    setOtpMode(true);
  };
  
  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    const otpInput = document.getElementById('otp');
    const otp = otpInput.value;
  
    try {
      const response = await props.userLogin(mob_number, otp);
      console.log('response: ', response);
      if (response.status === 200) {
        // Authentication succeeded
        toast.success("Welcome User")
        navigate('/profile');
      } else {
        // Authentication failed
        toast.error('Failed to authenticate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error);
    }
  };
  


  return (
    <div className="login-body">
      <div className="left-section">
        <h2>Manage your Digital Life with the NexWave app</h2>
        <div>
          <h3>Recharge, pay bills, and check balance</h3>
          <h3>Shop, UPI, and health</h3>
          <h3>Movies, music, and games</h3>
          <h3>Instant help with NexWave</h3>
        </div>
      </div>
      <div className="right-section">
        <div className="card">
          <h2>Welcome To NexWave</h2>
          <p>Log in to unlock a world of digital experiences.</p>
          {otpMode ? (
            <form onSubmit={handleSubmitOTP}>
              <div className="mob">
                <h3>Mobile</h3>
              </div>

              <input id='otp' type="text" placeholder="Enter your OTP" />
              <button type="submit">Submit OTP</button>
            </form>
          ) : (
            <form onSubmit={handleGenerateOTP}>
              <div className="mob">
                <h3>Mobile</h3>
              </div>
              <div className="placeholder-line"></div>

              <input id="mobile-number" type="text" className="mobile-input" placeholder="Enter your mobile number" />
              <button type="submit">Generate OTP</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  userLogin
};
export default connect(null, mapDispatchToProps)(Login);
