import React from "react";
import profilepic from '../pics/profilepic.png';
import "./Profile.css";
import { auth, db } from "../config/firebase/firebase";

function Profile() {
    // NEW FIREBASE STUFF
    const [user, setUser] = useState({ id: "", firstName: "", lastName: "", bio: "" });
    const [listings, setListings] = useState([]);

    // NEW FIREBASE STUFF
    useEffect(() => {
        async function fetchUserData() {
            const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
            setUser({ id: userDoc.id, ...userDoc.data() });
            const userListings = await db.collection("listings").where("userId", "==", auth.currentUser.uid).get();
            setListings(userListings.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
        fetchUserData();
    }, []);


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


/**
 * function Listings({ listings, onDelete }) {
    return (
        <div className="listings">
            {listings.map((item) => (
                <div key={item.id} className="item-card">
                    <button onClick={() => onDelete(item.id)}>×</button>
                    <div className="item-details">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

 */

/**
 * function Profile() {
    const [user, setUser] = useState({ id: "", firstName: "", lastName: "", bio: "" });
    const [listings, setListings] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
            setUser({ id: userDoc.id, ...userDoc.data() });
            const userListings = await db.collection("listings").where("userId", "==", auth.currentUser.uid).get();
            setListings(userListings.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
        fetchUserData();
    }, []);

    return (
        <div className="profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={user.avatar || "default_avatar.png"} alt="Avatar" />
                </div>
                <div className="profile-info">
                    <h2>
                        {user.firstName} {user.lastName}
                    </h2>
                    <p>{user.bio}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
 */