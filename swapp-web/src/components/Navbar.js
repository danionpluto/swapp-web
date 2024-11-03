// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: for custom styling
import {auth} from "../firebase.js";
import logo from '../pics/logo.png';

const Navbar = ({ user }) => {
    const handleLogout = () => {
      auth.signOut();
    };
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
        <Link to="/">Home </Link>
        </li>
        {user ? (
            <>     
        <li>
        <Link to="/Chat">Chat </Link>
        </li>
        <li>
        <Link to="/Profile">Profile </Link>
        </li>
        <li>
        <Link to="/SearchListing">Search Listing </Link>
        </li>
        <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
        </>
        
        ):(
            <>
            <li>
        <Link to="/SignUp">Sign Up </Link>
        </li>

        <li>
        <Link to="/LogIn">LogIn </Link>
        </li>
            </>
        )}
        
        
        
            
        
        
      </ul>
    </nav>
  );
};

export default Navbar;