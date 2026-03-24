# Airbnb-Inspired Booking Platform

A production-grade accommodation booking platform built with **React + Vite**, inspired by modern applications like Airbnb.

This project demonstrates  concepts such as **state management, API integration, caching, and performance optimization**.

---

## 🌐 Live Demo

👉 https://your-vercel-link.vercel.app

---





##  Features

* Search for properties using API
* View detailed listing information
* Add and remove favorites
* Book properties
* Dynamic filtering (price, location, rating)
* Fast navigation with caching
* Fully responsive design

---

## Technologies Used

* **React (Vite)**
* **Axios** (API requests)
* **TanStack Query (React Query)** (server state & caching)
* **React Router** (routing)
* **Context API** (global state management)
* **Zustand / Redux Toolkit** (advanced state management)
* **Tailwind CSS** (styling)

---

##  API Integration

This project uses the **Airbnb API via RapidAPI**.





All API requests are centralized in:

```
src/services/api.ts
```

This file:

* Configures Axios instance
* Sets base URL
* Attaches headers
* Uses environment variables for security

---


## 🔄 State Management

### Local State

* Form inputs
* UI interactions

### Global State (Context API)

* Favorites
* Filters

### Advanced State (Zustand / Redux)

* Booking logic
* Shared complex state

### Server State (TanStack Query)

* Listings data
* Listing details
* API caching

---

## ⚡ Performance & Caching

* Uses **TanStack Query** for:

  * Caching API responses
  * Background updates
  * Query invalidation

* Prevents unnecessary API calls

* Improves page load speed

* Enables smooth navigation


---

## ❗ Error Handling

* Handles API errors gracefully
* Displays user-friendly messages
* Prevents UI crashes
* Handles rate limit issues

---

## 💾 Persistence

* Favorites stored in **localStorage**
* Cached data improves performance

---

## 📱 User Experience (UX)

* Responsive design (mobile, tablet, desktop)
* Smooth transitions
* Instant feedback
* No unnecessary reloads

---

## 🔧 Known Issues

* Case-sensitive import errors during deployment (Linux vs Windows)
* API rate limits from RapidAPI

---

## 📌 Future Improvements

* Full authentication system
* Backend integration
* Payment system
* Real booking confirmation
* Advanced filters

---

## 👤 Author

**Monia Nijimbere**

* GitHub: https://github.com/Nijimbere722


