import React from "react";

function ListingCard({ listing }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        borderRadius: "8px",
        width: "250px",
      }}
    >
      <img
        src={listing.previewImage?.url}
        alt={listing.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{listing.name}</h3>
      <p>Price: ${listing.price?.rate}</p>
      <p>Rating: {listing.starRating || "N/A"}</p>
    </div>
  );
}

export default ListingCard;