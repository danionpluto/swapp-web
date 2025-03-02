import React from 'react';
import './Home.css'; 
import mockupImage from '../pics/mockup.png'; 
import heartIcon from '../pics/hearticon.png';
import bookmarkIcon from '../pics/bookmarkicon.png';
import logo from '../pics/logo.png';
import { Link } from 'react-router-dom';
 
function Home() {
  return (
    <div className="home">
      {/* Header */}
      

      {/* Latest Items */}
      <section className="latest-items">
        {/* <h2>Latest</h2> */}
        
      </section>

      {/* Banner Text */}
      <section className="banner">
        <h1>TRADE, STYLE, REPEAT</h1>
        <p>WITH PRE-LOVED CORNELL ITEMS ON CAMPUS</p>
      </section>

      {/* Download Section */}
      <section className="download-section">
        <p>
          Interested in reducing textile waste while improving your style?{' '}
          <a href="https://apps.apple.com/us/app/swapp-trade-items-on-campus/id1598697038" target="_blank" rel="noopener noreferrer">
            Download the App here
          </a>
        </p>
      </section>

      {/* Mobile App Preview */}
      <section className="app-preview">
        <img src={mockupImage} alt="Mobile App Preview" className="hand"/>
      </section>
    </div>
  );
}

export default Home;
