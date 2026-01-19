import React, { useEffect, useState } from "react";
import profilepic from "../pics/profilepic.png";
import "./Profile.css";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

function Profile() {
  // NEW FIREBASE STUFF
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState(null);

  // NEW FIREBASE STUFF
  //useEffect(() => {
  //    async function fetchUserData() {
  //        const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
  //        setUser({ id: userDoc.id, ...userDoc.data() });
  //        const userListings = await db.collection("listings").where("userId", "==", auth.currentUser.uid).get();
  //        setListings(userListings.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  //    }
  //    fetchUserData();
  //}, []);

  const fetchAll = async () => {
    const userQuerySnap = await getDocs(
      query(
        collection(db, "USERS"),
        where("email", "==", auth.currentUser.email)
      )
    );
    const userDoc = userQuerySnap.docs[0];
    setUser({ id: userDoc.id, ...userDoc.data() });

    const userListings = await getDocs(
      query(collection(db, "Listings"), where("sellerId", "==", userDoc.id))
    );
    setListings(
      userListings.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (!user || !listings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {/* placeholder pfp */}
          <img src={profilepic} alt="Avatar" />
        </div>
        <div className="profile-info">
          <h2>
            {user.firstName} {user.lastName}{" "}
            <span className="username">{user.email.split("@")[0]}</span>
          </h2>
          <p>Major &nbsp;|&nbsp; Class of 202x</p>
          <div className="profile-stats">
            <div>
              0 <span>Followers</span>
            </div>
            <div>
              0 <span>Following</span>
            </div>
          </div>
          <p className="profile-description">{user.bio}</p>
        </div>
      </div>

      {/* Selling Section */}
      <div className="selling-section">
        <h3>Selling:</h3>
        <div className="items-grid">
          {/* Repeat this block for each item */}
          {listings.map((listing) => (
            <Link to={`/Listing/${listing.id}`}>
              <div key={listing.id} className="item-card">
                <img
                  className="item-image"
                  src={listing.imgUrls[0]}
                  alt={listing.name}
                />
                <div className="item-details">
                  <span className="item-name">{listing.title}</span>
                  <span className="item-price">${listing.price}</span>
                </div>
              </div>
            </Link>
          ))}
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
