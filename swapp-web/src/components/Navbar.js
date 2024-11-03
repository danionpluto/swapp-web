// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: for custom styling
import {auth} from "../firebase.js";
import logo from '../pics/logo.png';
import { FaHome, FaUser, FaTag, FaComments, FaHeart } from 'react-icons/fa';

const Navbar = ({ user }) => {
    const handleLogout = () => {
      auth.signOut();
    };
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
        <Link className= "link" to="/"><FaHome size={44} /> </Link>
        </li>
        {user ? (
            <>     
        <li>
        <Link  className= "link" to="/Chat"><FaComments size={44} /> </Link>
        </li>
        <li>
        <Link className= "link" to="/SearchListing"><FaTag size={44} /> </Link>
        </li>
        <li>
        <Link className= "link" to="/Profile"><FaUser size={44} /></Link>
        </li>
        <li>
        <button className="nav-button1" onClick={handleLogout}>Log Out</button>
            </li>
        </>
        
        ):(
        <>
        <li>
        <Link className="nav-button1" to="/SignUp">Sign Up </Link>
        </li>

        <li>
        <Link className="nav-button2" to="/LogIn">Log In </Link>
        </li>
            </>
        )}
        
        
        
            
        
        
      </ul>
    </nav>
  );
};

export default Navbar;