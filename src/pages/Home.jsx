import { useContext, useState } from "react";
import MapElement from "../components/maps.component";
import { LocationContext } from "../contexts/locationContext.context";

export default function Home() {
  const location = useContext(LocationContext);
  
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
