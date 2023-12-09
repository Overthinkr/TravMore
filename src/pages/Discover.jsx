import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../contexts/locationContext.context";
import LocationTag from "../components/discover/LocationTag.component";
import { browseResponse, calculateDistance } from "../helpers/BrowseAPI.helper";
import DiscoverCard from "../components/discover/Card.component";

export default function Discover() {
  const [footerHeight, setFooterHeight] = useState();
  const [wrapperWidth, setWrapperWidth] = useState();

  const [places, setPlaces] = useState();

  const location = useContext(LocationContext);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    const wrapper = document.querySelector(".discover-wrapper");
    if (footer) {
      setFooterHeight(footer.clientHeight);
    }
    if (wrapper) {
      setWrapperWidth(wrapper.clientWidth);
    }
  }, []);

  const [currentCategory, setCurrentCategory] = useState("100-1000-0000");

  useEffect(() => {
    if (location?.latitude == null) return;
    axios.get(`https://browse.search.hereapi.com/v1/browse?at=${location.latitude},${location.longitude}&categories=${currentCategory}&limit=100&lang=en&apiKey=${import.meta.env.VITE_APIKEY}`).then((res) => {
  
    setPlaces(res.data)
    })
  }, [currentCategory, location])

  function getPlaces(category) {
    setCurrentCategory(category);
  }

  const [currentShort, setCurrentShort] = useState(0);

  function shortsNext() {
    setCurrentShort((e) => e + 1);
  }
  function shortsBefore() {
    setCurrentShort((e) => e - 1);
  }

  useEffect(() => {
    const element = document.querySelector(`#data-id-${currentShort}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

  }, [currentShort]);

  return (
    <div
      className="flex w-full justify-center rounded-xl overflow-hidden select-none"
      style={{ height: `calc(100vh - ${footerHeight}px)` }}
    >
      <div className="flex discover-wrapper max-w-md justify-between flex-col w-full rounded-xl overflow-hidden">
        {/* Controls, Categories etc */}
        <div
          className="absolute flex gap-2 my-2 ml-2 overflow-x-scroll location-tags-discover items-center"
          style={{ maxWidth: `${wrapperWidth}px` }}
        >
          <LocationTag text={"Restaurants"} fn={"100-1000-0000"} getPlaces={getPlaces} currentCategory={currentCategory} />
          <LocationTag text={"Casual Dining"} fn={"100-1000-0001"} getPlaces={getPlaces} currentCategory={currentCategory} />
          <LocationTag text={"Fine Dining"} fn={"100-1000-0002"} getPlaces={getPlaces} currentCategory={currentCategory} />
          <LocationTag text={"Cafeteria"} fn={"100-1000-0007"} getPlaces={getPlaces} currentCategory={currentCategory} />
          <LocationTag text={"Fast Food"} fn={"100-1000-0009"} getPlaces={getPlaces} currentCategory={currentCategory} />
          <LocationTag text={"Bar"} fn={"200-2000-0011"} currentCategory={currentCategory} />
        </div>
        <div className="flex flex-col overflow-hidden">
          {places?.items ?
            places.items.map((responseData, index) => {

              return (
                <DiscoverCard
                  key={index}
                  ID={index}
                  locationData={responseData}
                  location={location}
                  footerHeight={footerHeight}
                  next={shortsNext}
                  before={shortsBefore}
                />
              );
            }) :
            ""}
        </div>
      </div>
    </div>
  );
}
