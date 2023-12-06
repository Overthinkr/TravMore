import { useEffect, useRef, useState } from "react";
import MapElement from "../components/maps.component";

export default function Home() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!location) {
      getLocation();
    }
  }, [location]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div className="flex w-full justify-center">
      {location ? (
        <MapElement
          latitude={location.latitude}
          longitude={location.longitude}
        />
      ) : (
        <div className="flex">Fetching Local Coordinates</div>
      )}
    </div>
  );
}
