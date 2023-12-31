import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="https://img.freepik.com/premium-vector/letter-n-arrow-logo-template_23987-64.jpg?w=360" alt="Company Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          {/* <li>
            <a href="/home">Prepaid</a>
          </li>
          <li>
            <a href="/home">Postpaid</a>
          </li> */}
          <li>
            <a href="/recharge">Recharge</a>
          </li>
          <li>
            <a href="/home">Pay Bills</a>
          </li>
        </ul>
      </nav>
      <div className="profile-logo">
        <a href="/profile">
          <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
