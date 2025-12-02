import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";

function ListingDetail() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState(null);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    if (!listingId) return;

    const listingQ = query(
      collection(db, "listings"),
      where("id", "==", listingId)
    );
    getDocs(listingQ)
      .then((snapshot) => {
        if (!snapshot.empty) {
          setListingData(snapshot.docs[0].data());
        } else {
          setListingData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching listing:", error);
        setListingData(null);
      });

    const userQ = query(
      collection(db, "users"),
      where("id", "==", listingData.sellerId)
    );

    getDocs(userQ)
      .then((snapshot) => {
        if (!snapshot.empty) {
          setSellerData(snapshot.docs[0].data());
        } else {
          setSellerData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching seller:", error);
        setSellerData(null);
      });
  }, [listingId, sellerData]);

  if (listingData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="image-list">
          {listingData.imgUrls &&
            listingData.imgUrls.map((url, i) => (
              <img key={i} src={url} alt={`${i}`} />
            ))}
        </div>

        <div className="listing-detail">
          <div>
            <h2>Seller</h2>
            <div>
              <p>
                {sellerData.firstname} {sellerData.lastname}
              </p>
            </div>
          </div>
          <div>
            <h1>{listingData.title}</h1>
            <p>{listingData.price}</p>
            <p>Condition: {listingData.condition}</p>
          </div>

          <div>
            <h2>Listing Details</h2>
            <p>{listingData.description}</p>
            {/* Ask Emily about this */}
            <button className="sell-button">Sold</button>
          </div>

          <div>
            <h2>See Smilar Listings</h2>
            <div className="similar-items-list">
              {listingData.category &&
                listingData.imgUrls.map((url, i) => (
                  <img key={i} src={url} alt={`${i}`} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default ListingDetail;
