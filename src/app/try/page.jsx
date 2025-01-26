"use client";

// components/Map.js
import { useEffect, useState } from "react";

const Map = ({ latitude, longitude }) => {
  const apiKey = "AIzaSyD6mwup-abMNZ0c0nXeeT_6OFuZ39RS5KE"; // Replace with your API key
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=15`;

  return (
    <div style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

// pages/location.js

const LocationPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (error) => {
          setError("Unable to retrieve your location.");
          console.error("Error getting location:", error);
        },
        options
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Location</h1>
      <button onClick={getLocation}>Get My Location</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {latitude && longitude && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <Map latitude={latitude} longitude={longitude} />
        </div>
      )}
    </div>
  );
};

export default LocationPage;