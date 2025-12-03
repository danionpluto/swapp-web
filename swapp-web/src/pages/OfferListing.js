import React, { useEffect, useState } from "react";
import { auth, db, FieldPath } from "../config/firebase/firebase";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";

function OfferListing() {
  const [user, setUser] = useState(null);
  const [incomingOffers, setIncomingOffers] = useState([]);
  const [outgoingOffers, setOutgoingOffers] = useState([]);
  const [view, setView] = useState("incoming");

  useEffect(() => {
    const fetchAll = async () => {
      const userDoc = await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .get();
      setUser({ id: userDoc.id, ...userDoc.data() });

      if (view === "incoming") {
        const incomingOfferSnap = await db
          .collection("offers")
          .where("seller", "==", user.id)
          .get();

        const incoming = await Promise.all(
          incomingOfferSnap.docs.map(async (doc) => {
            const data = doc.data();

            const buyerDoc = await db.collection("users").doc(data.buyer).get();
            const buyerData = buyerDoc.data();

            const itemDoc = db
              .collection("listings")
              .where(FieldPath.documentId(), "==", data.item)
              .get();
            const itemData = itemDoc.data();

            return {
              id: doc.id,
              ...data,
              ...buyerData,
              ...itemData,
            };
          })
        );

        setIncomingOffers(incoming);
      }

      if (view === "outgoing") {
        const outgoingOfferSnap = await db
          .collection("offers")
          .where("buyer", "==", user.id)
          .get();

        const outgoing = await Promise.all(
          outgoingOfferSnap.docs.map(async (doc) => {
            const data = doc.data();

            const sellerDoc = await db
              .collection("users")
              .doc(data.seller)
              .get();
            const sellerData = sellerDoc.data();

            const itemDoc = db
              .collection("listings")
              .where(FieldPath.documentId(), "==", data.item)
              .get();
            const itemData = itemDoc.data();

            return {
              id: doc.id,
              ...data,
              ...sellerData,
              ...itemData,
            };
          })
        );

        setOutgoingOffers(outgoing);
      }
    };

    fetchAll();
  }, [user, view, outgoingOffers, incomingOffers]);

  if (!user) {
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
