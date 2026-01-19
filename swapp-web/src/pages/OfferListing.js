import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  documentId,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";
import { use } from "react";

function OfferListing() {
  const [user, setUser] = useState(null);
  const [incomingOffers, setIncomingOffers] = useState([]);
  const [outgoingOffers, setOutgoingOffers] = useState([]);
  const [view, setView] = useState("outgoing");

  const fetchAll = async () => {
    const userSnap = await getDocs(
      collection(db, "USERS"),
      where("email", "==", auth.currentUser.email)
    );
    setUser({ id: userSnap.docs[0].id, ...userSnap.docs[0].data() });

    const incomingOfferSnap = await getDocs(
      collection(db, "OFFERS"),
      where("buyer", "==", userSnap.docs[0].id)
    );

    const incoming = await Promise.all(
      incomingOfferSnap.docs.map(async (doc) => {
        const sellerDocs = await getDocs(
          collection(db, "USERS"),
          where(documentId(), "==", doc.data().seller)
        );

        const listingDocs = await getDocs(
          collection(db, "Listings"),
          where(documentId(), "==", doc.data().item)
        );

        if (sellerDocs.empty || listingDocs.empty) return null;

        return {
          ...sellerDocs.docs[0].data(),
          ...listingDocs.docs[0].data(),
        };
      })
    );
    setIncomingOffers(incoming);

    const outgoingOfferSnap = await getDocs(
      collection(db, "OFFERS"),
      where("seller", "==", userSnap.docs[0].id)
    );

    const outgoing = await Promise.all(
      outgoingOfferSnap.docs.map(async (doc) => {
        const buyerDocs = await getDocs(
          collection(db, "USERS"),
          where(documentId(), "==", doc.data().buyer)
        );

        const listingDocs = await getDocs(
          collection(db, "Listings"),
          where(documentId(), "==", doc.data().item)
        );

        if (buyerDocs.empty || listingDocs.empty) return null;

        return {
          ...buyerDocs.docs[0].data(),
          ...listingDocs.docs[0].data(),
        };
      })
    );

    setOutgoingOffers(outgoing);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (!user && !incomingOffers && !outgoingOffers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Offers</h1>
      <div>
        <div>
          <button onClick={() => setView("incoming")}>Incoming</button>
          <button onClick={() => setView("outgoing")}>Outgoing</button>
        </div>
        {view === "incoming" ? (
          <div className="offer-list">
            {incomingOffers.map((offer, i) => (
              <div key={i + 1} className="offer">
                <img src={offer.imgUrls[0]} alt={`${i + 1}`} />
                <div className="offer-detail">
                  <p>{offer.title}</p>
                  <p>Listing: ${offer.price}</p>
                  <p>Your Offer: ${offer.amount}</p>
                  {/* edit link to direct to the link corresponding to chat components */}
                  <Link to={`/chat/:${offer.seller}`}>
                    <button>
                      {offer.firstName} {offer.lastName}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {outgoingOffers.map((offer, i) => (
              <div key={i + 1} className="offer">
                <img src={offer.imgUrls[0]} alt={`${i + 1}`} />
                <div className="offer-detail">
                  <p>{offer.title}</p>
                  <p>Listing: ${offer.price}</p>
                  <p>Your Offer: ${offer.amount}</p>
                  {/* edit link to direct to the link corresponding to chat components */}
                  <Link to={`/chat/:${offer.buyer}`}>
                    <button>
                      {offer.firstName} {offer.lastName}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferListing;
