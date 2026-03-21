import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnb19.p.rapidapi.com/api/v2",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "airbnb19.p.rapidapi.com",
  },
});

export const fetchListings = async (placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4") => {
  const response = await api.get("/searchPropertyByPlaceId", {
    params: {
      placeId: placeId,
    },
  });

  return response.data;
};

export default api;