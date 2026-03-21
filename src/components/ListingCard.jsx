import React from "react";

function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={listing?.previewImage?.url}
        alt={listing?.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing?.name}</h3>
        <p className="text-gray-500 text-sm mt-1">
          Rating: {listing?.starRating || "N/A"}
        </p>
        <p className="text-blue-600 font-bold mt-2">
          ${listing?.price?.rate || "N/A"} / night
        </p>
      </div>
    </div>
  );
}

export default ListingCard;