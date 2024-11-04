import React from "react";
import profilepic from '../pics/profilepic.png';
import "./Profile.css";

function Profile() {
    return (
        <div className="profile">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={profilepic} alt="Avatar" />
                </div>
                <div className="profile-info">
                    <h2>First Last, <span className="username">netid</span></h2>
                    <p>Major &nbsp;|&nbsp; Class of 202x</p>
                    <div className="profile-stats">
                        <div>0 <span>Followers</span></div>
                        <div>0 <span>Following</span></div>
                    </div>
                    <p className="profile-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac sem id mi sodales.</p>
                </div>
            </div>

            {/* Selling Section */}
            <div className="selling-section">
                <h3>Selling:</h3>
                <div className="items-grid">
                    {/* Repeat this block for each item */}
                    <div className="item-card">
                        <button className="remove-item">×</button>
                        <div className="item-image">
                            {/* Placeholder for image */}
                        </div>
                        <div className="item-details">
                            <span className="item-name">Shirt</span>
                            <span className="item-price">$40</span>
                        </div>
                    </div>
                    <div className="item-card">
                        <button className="remove-item">×</button>
                        <div className="item-image">
                            {/* Placeholder for image */}
                        </div>
                        <div className="item-details">
                            <span className="item-name">Jacket</span>
                            <span className="item-price">$40</span>
                        </div>
                    </div>
                    {/* Add more items as needed */}
                    <div className="item-card">
                        <button className="remove-item">×</button>
                        <div className="item-image">
                            {/* Placeholder for image */}
                        </div>
                        <div className="item-details">
                            <span className="item-name">Shoes</span>
                            <span className="item-price">$40</span>
                        </div>
                    </div>
                    <div className="item-card">
                        <button className="remove-item">×</button>
                        <div className="item-image">
                            {/* Placeholder for image */}
                        </div>
                        <div className="item-details">
                            <span className="item-name">Shirt</span>
                            <span className="item-price">$40</span>
                        </div>
                    </div>
                    <div className="item-card">
                        <button className="remove-item">×</button>
                        <div className="item-image">
                            {/* Placeholder for image */}
                        </div>
                        <div className="item-details">
                            <span className="item-name">Pants</span>
                            <span className="item-price">$40</span>
                        </div>
                    </div>
                    <div className="item-card">
                        <button className="remove-item">×</button>
                        <div className="item-image">
                            {/* Placeholder for image */}
                        </div>
                        <div className="item-details">
                            <span className="item-name">Shirt</span>
                            <span className="item-price">$40</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

