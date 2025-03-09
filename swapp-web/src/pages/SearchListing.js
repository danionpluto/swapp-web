import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./SearchListing.css";


function SearchListing() {
 const [listings, setListings] = useState([]);
 const [selectedCategories, setSelectedCategories] = useState([]);
 const categories = ["Clothing", "Jewelry", "Home", "Books", "Technology", "Other", "Textbooks"];


 const fetchListings = async () => {
   try {
     const q = query(collection(db, "Listings"), orderBy("date", "desc"));
     const querySnapshot = await getDocs(q);


     const listingsArray = querySnapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     }));


     setListings(listingsArray);
   } catch (error) {
     console.error("Error fetching listings: ", error);
   }
 };


 useEffect(() => {
   fetchListings();
 }, []);


 const handleCategoryClick = (category) => {
   setSelectedCategories((prev) =>
     prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
   );
 };


 const filteredListings = selectedCategories.length
   ? listings.filter((listing) => listing.category.some((cat) => selectedCategories.includes(cat)))
   : listings;


 return (
   <div className="search-listing-page">
     {/* Sidebar for categories */}
     <aside className="sidebar">
       <h3>Category</h3>
       <ul className="category-list">
         {categories.map((category) => (
           <li
             key={category}
             className={`category-item ${selectedCategories.includes(category) ? "selected" : ""}`}
             onClick={() => handleCategoryClick(category)}
           >
             {category}
           </li>
         ))}
       </ul>
     </aside>


     { }
     <main className="content">
       <div className="header-section">
         <h2 className="header-title">For You</h2>
         <p className="header-subtitle">Items</p>
       </div>


       { }
       <div className="product-list">
         {filteredListings.length > 0 ? (
           filteredListings.map((listing) => (
             <div key={listing.id} className="item-card">
               <img
                 className="product-image"
                 src={listing.imgUrls?.[0] || "/default-image.jpg"}
                 alt={listing.title || "Unnamed Item"}
               />
               <p>{listing.title || "Unnamed Item"}</p>
               <p>${listing.price ? listing.price.toLocaleString() : "N/A"}</p>
             </div>
           ))
         ) : (
           <p>No listings found for the selected category.</p>
         )}
       </div>
     </main>
   </div>
 );
}


export default SearchListing;


