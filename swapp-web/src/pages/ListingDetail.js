import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";

function ListingDetail() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState(null);

  useEffect(() => {
    if (!listingId) return;

    const q = query(collection(db, "listings"), where("id", "==", listingId));
    getDocs(q)
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
  }, [listingId]);

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
      </div>

      <div></div>
    </div>
  );
}

export default ListingDetail;
