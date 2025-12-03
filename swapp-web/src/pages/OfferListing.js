import React, { useEffect, useState } from "react";
import { auth, db, FieldPath } from "../config/firebase/firebase";
import "./ListingDetail.css";
import { Link, useParams } from "react-router-dom";

function OfferListing() {
  const [user, setUser] = useState(null);
  const [incomingOffers, setIncomingOffers] = useState([]);
  const [outgoingOffers, setOutgoingOffers] = useState([]);
  const [view, setView] = useState("incoming");
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const userDoc = await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .get();
      setUser({ id: userDoc.id, ...userDoc.data() });

      if (view === "incoming") {
        const incoming = await db
          .collection("offers")
          .where("seller", "==", user.id)
          .get();

        setIncomingOffers(
          incoming.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const itemIds = incomingOffers.map((offer) => offer.itemId);

        const itemsSnap = db
          .collection("listings")
          .where(FieldPath.documentId(), "in", itemIds)
          .get();

        const items = itemsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(items);
      }

      if (view === "outgoing") {
        const outgoing = await db
          .collection("offers")
          .where("buyer", "==", user.id)
          .get();

        setOutgoingOffers(
          outgoing.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const itemIds = outgoingOffers.map((offer) => offer.itemId);

        const itemsSnap = db
          .collection("listings")
          .where(FieldPath.documentId(), "in", itemIds)
          .get();

        const items = itemsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(items);
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
                <img src={items[i].imgUrl[0]} alt={`${i + 1}`} />
                <div className="offer-detail">
                  <p>{items[i].title}</p>
                  <p>Listing: ${items[i].price}</p>
                  <p>Your Offer: ${items[i].price}</p>
                  {/* edit link to direct to the link corresponding to chat components */}
                  <Link to={`/chat/:${offer[i].sellerId}`}>
                    <button>View Chat</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {outgoingOffers.map((offer, i) => (
              <div key={i + 1} className="offer">
                <img src={items[i].imgUrl[0]} alt={`${i + 1}`} />
                <div className="offer-detail">
                  <p>{items[i].title}</p>
                  <p>Listing: ${items[i].price}</p>
                  <p>Your Offer: ${items[i].price}</p>
                  {/* edit link to direct to the link corresponding to chat components */}
                  <Link to={`/chat/:${offer[i].sellerId}`}>
                    <button>View Chat</button>
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
