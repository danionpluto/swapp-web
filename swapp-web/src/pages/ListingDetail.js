import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";

function ListingDetail() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [similarData, setSimilarData] = useState(null);

  const fetchAll = async () => {
    const listingQ = query(
      collection(db, "Listings"),
      where(documentId(), "==", listingId)
    );
    const listingSnap = await getDocs(listingQ);
    const listing = listingSnap.docs[0].data();
    setListingData(listing);

    const userQ = query(
      collection(db, "USERS"),
      where(documentId(), "==", listing.sellerId)
    );
    const userSnap = await getDocs(userQ);
    setSellerData(userSnap.docs[0].data());

    const similarQ = query(
      collection(db, "Listings"),
      where("category", "array-contains", listing.category[0])
    );
    const similarSnap = await getDocs(similarQ);
    setSimilarData(
      similarSnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );
  };

  useEffect(() => {
    fetchAll();
  }, [listingId]);

  console.log(similarData);

  if (!listingData || !sellerData || !similarData) {
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
            <img key={listingData.id} src={url} alt={`${i + 1}`} />
          ))}
      </div>

      <div className="listing-detail">
        <div>
          <h2>Seller</h2>
          <div>
            <p>
              {sellerData.firstName} {sellerData.lastName}
            </p>
          </div>
        </div>
        <div>
          <h1>{listingData.title}</h1>
          <p>${listingData.price}</p>
          <p>Condition: {listingData.condition}</p>
        </div>

        <div>
          <h2>Listing Details</h2>
          <p>{listingData.description}</p>
          {/* Ask Emily about this */}
          <button className="sell-button">Sold</button>
        </div>

        <div>
          <h2>See Similar Listings</h2>
          <div className="similar-items-list">
            {similarData &&
              similarData
                .filter(
                  (doc) =>
                    doc.imgUrls &&
                    doc.imgUrls.length > 0 &&
                    doc.id !== listingId
                )
                .map((doc, i) => (
                  <Link key={doc.id} to={`/Listing/${doc.id}`}>
                    <img src={doc.imgUrls[0]} alt={`${i + 1}`} />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;
