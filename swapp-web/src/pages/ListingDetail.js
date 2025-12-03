import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";

function ListingDetail() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [similarData, setSimilarData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const listingQ = query(
        collection(db, "listings"),
        where("id", "==", listingId)
      );
      const listingSnap = await getDocs(listingQ);

      if (listingSnap.empty) return;

      const listing = listingSnap.docs[0].data();
      setListingData(listing);

      const userQ = query(
        collection(db, "users"),
        where("id", "==", listing.sellerId)
      );
      const userSnap = await getDocs(userQ);
      setSellerData(userSnap.empty ? null : userSnap.docs[0].data());

      const similarQ = query(
        collection(db, "listings"),
        where("category", "==", listing.category)
      );
      const similarSnap = await getDocs(similarQ);
      setSimilarData(similarSnap.docs.map((doc) => doc.data()));
    };

    fetchAll();
  }, [listingData, sellerData]);

  if (listingData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Link
          style={{
            fontWeight: "bolder",
            fontSize: "large",
            margin: "1rem",
            color: "black",
          }}
          to="/SearchListing"
        >
          &lt; Back
        </Link>
      </div>

      <div className="image-list">
        {listingData.imgUrls &&
          listingData.imgUrls.map((url, i) => (
            <img key={i} src={url} alt={`${i + 1}`} />
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
            {similarData &&
              similarData.imgUrls.map((url, i) => (
                <img key={i} src={url} alt={`${i + 1}`} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;
