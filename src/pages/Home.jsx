import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "../services/api";
import ListingCard from "../components/ListingCard";

function Home() {
  // Fetch listings using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  if (isLoading) return <h2>Loading listings...</h2>;
  if (isError) return <h2>Error fetching listings. Try again.</h2>;

  // Extract listings array from API response
  const listings = data?.data?.body?.searchResults?.results || [];

  return (
    <div>
      <h1>Available Listings</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {listings.length === 0 && <p>No listings found.</p>}
        {listings.map((listing) => (
          <ListingCard key={listing.listing.id} listing={listing.listing} />
        ))}
      </div>
    </div>
  );
}

export default Home;