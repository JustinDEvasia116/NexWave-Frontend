import React from 'react';
import Slider from 'react-slick';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomepageMasthead from '../../../assets/Homepage-masthead.png';
import Plus599golgappadesk from '../../../assets/Plus599golgappadesk.png';
import Fiberhmpgdesk from '../../../assets/Fiberhmpgdesk.png';
import { Link } from 'react-router-dom';

export const HomeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item">
          <img src={HomepageMasthead} alt="Image 1" className="slider-image" />
          <div className="content-overlay">
            <h2 className="content-heading">It's time To embrace digital life</h2>
          </div>
        </div>
        <div className="slider-item">
          <img src={Plus599golgappadesk} alt="Image 2" className="slider-image" />
          <div className="content-overlay">
            <h2 className="content-heading">Bring the world to your home</h2>
          </div>
        </div>
        <div className="slider-item">
          <img src={Fiberhmpgdesk} alt="Image 3" className="slider-image" />
          <div className="content-overlay">
            <h2 className="content-heading">This is what we called unlimited digital life!</h2>
          </div>
        </div>
      </Slider>
      <div className='iconscontainer'>
        <div className='icons'>
          <Link to="/recharge"className="link-container"> {/* Wrap icon in a Link */}
            <div className='svg-container'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon">
                <path d="M17 7h1v1a1 1 0 102 0V7h1a1 1 0 100-2h-1V4a1 1 0 00-2 0v1h-1a1 1 0 100 2z" fill="blue"></path>
                <path d="M14 6c.003-.336.037-.67.1-1H5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3v-6a5 5 0 01-5.24.47 4.89 4.89 0 01-2-1.84A5 5 0 0114 6zM8 8a1.5 1.5 0 011.47 1.79A1.49 1.49 0 018.29 11a1.49 1.49 0 01-.86-.08 1.55 1.55 0 01-.68-.56A1.5 1.5 0 018 8zm2 8H6a1 1 0 01-1-1 3 3 0 016 0 1 1 0 01-1 1z" fill="blue"></path>
              </svg>
            </div>
            <h4>Recharge</h4>
          </Link>
          
        </div>
        <div className='icons'>
          <Link to="/recharge"className="link-container"> {/* Wrap icon in a Link */}
            <div className='svg-container'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon">
                <path d="M16 7h4a2 2 0 00-.59-1.41l-3-3A2 2 0 0015 2v4a1 1 0 001 1zm-2.12 1.12A3 3 0 0113 6V2H6.5A2.49 2.49 0 004 4.5v15A2.49 2.49 0 006.5 22h11a2.49 2.49 0 002.5-2.5V9h-4a3 3 0 01-2.12-.88zM14 14a3 3 0 01-1.11 2.33l1.56.78A1 1 0 0114 19a.929.929 0 01-.45-.11l-4-2A1 1 0 0110 15h1a1 1 0 100-2H9a1 1 0 110-2h5a1 1 0 010 2h-.18a3 3 0 01.18 1z" fill="blue"></path>
              </svg>
            </div>
            <h4>Pay Bills</h4>
          </Link>
          
        </div>
        <div className='icons'>
          <Link to="/registration"className="link-container"> {/* Wrap icon in a Link */}
            <div className='svg-container'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon">
                <path d="M16 2h-5a3 3 0 00-2.38 1.13l-3 3.7A3 3 0 005 8.7V19a3 3 0 003 3h8a3 3 0 003-3V5a3 3 0 00-3-3zM7 12h3v3H7v-3zm5 8H8a1 1 0 01-1-1v-2h5v3zm5-1a1 1 0 01-1 1h-2v-3h3v2zm0-4h-5v-3h5v3z" fill="blue"></path>
              </svg>
            </div>
            <h4>Get SIM</h4>
          </Link>
          
        </div>
        <div className='icons'>
          <Link to="/registration" className="link-container">
            <div className='svg-container'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg " className="svg-icon">
                <path d="M19 4h-4c-.94 0-1.84.45-2.4 1.2l-2 2.67c-.39.52-.6 1.15-.6 1.8V18c0 1.65 1.35 3 3 3h6c1.65 0 3-1.35 3-3V7c0-1.65-1.35-3-3-3zm-7 7h2v3h-2v-3zm4 8h-3c-.55 0-1-.45-1-1v-2h4v3zm4-1c0 .55-.45 1-1 1h-1v-3h2v2zm0-4h-4v-3h4v3zM8 9.19c0-.06.01-.12.02-.19H8c-.94 0-1.84.45-2.4 1.2l-2 2.67c-.39.52-.6 1.15-.6 1.8V18c0 1.65 1.35 3 3 3h3.03C8.4 20.16 8 19.13 8 18V9.19zM9.71 4.3l-2-2A.996.996 0 106.3 3.71l.29.29H3c-.55 0-1 .45-1 1s.45 1 1 1h3.59l-.29.29a.996.996 0 00.71 1.7c.26 0 .51-.1.71-.29l2-2a.996.996 0 000-1.41l-.01.01z" fill="blue"></path>
              </svg>
            </div>
            <div className="link-text">
              <h4>Port SIM</h4>
            </div>
          </Link>
        </div>
        <div className='icons'>
          <Link to="/recharge" className="link-container"> {/* Wrap icon in a Link */}
            <div className='svg-container'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon">
                <path d="M19 4H5a3 3 0 00-3 3v8a3 3 0 003 3h3v1a2 2 0 003.2 1.6l3.47-2.6H19a3 3 0 003-3V7a3 3 0 00-3-3zm-7 12.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm1.32-4.62l-.33.24A1 1 0 0111 12a2.18 2.18 0 011.17-1.76c.56-.4.83-.61.83-1.24a1.17 1.17 0 00-1-1 1.17 1.17 0 00-1 1 1 1 0 01-2 0 3.16 3.16 0 013-3 3.16 3.16 0 013 3 3.31 3.31 0 01-1.68 2.88z" fill="blue"></path>
              </svg>
            </div>
            <h4>Support</h4>
          </Link>
          
        </div>
      </div>

    </div>
  );
};
