import axios from "axios";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../contexts/locationContext.context";
import LocationTag from "../components/discover/LocationTag.component";
import { browseResponse, calculateDistance } from "../helpers/BrowseAPI.helper";
import DiscoverCard from "../components/discover/Card.component";

export default function Discover() {
  const [footerHeight, setFooterHeight] = useState();
  const [headerHeight, setHeaderHeight] = useState();
  const [wrapperWidth, setWrapperWidth] = useState();
  const [wrapperHeight, setWrapperHeight] = useState();

  const location = useContext(LocationContext);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    const header = document.querySelector(".header");
    const wrapper = document.querySelector(".discover-wrapper");
    if (footer) {
      setFooterHeight(footer.clientHeight);
    }
    if (header) {
      setHeaderHeight(header.clientHeight);
    }
    if (wrapper) {
      setWrapperWidth(wrapper.clientWidth);
      setWrapperHeight(wrapper.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (location?.latitude == null) return;
    // axios.get(`https://browse.search.hereapi.com/v1/browse?at=${location.latitude},${location.longitude}&categories=100-1000-0000&limit=100&lang=en&apiKey=${import.meta.env.VITE_APIKEY}`).then((res) => {
    //   console.log(res.data)
    // })
  }, [location]);

  const bResponse = browseResponse;

  const [currentShort, setCurrentShort] = useState(0);

  function shortsNext() {
    setCurrentShort((e) => e + 1);
  }
  function shortsBefore() {
    setCurrentShort((e) => e - 1);
  }

  useEffect(() => {
    const element = document.querySelector(`#data-id-${currentShort}`);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentShort]);

  return (
    <div
      className="flex w-full justify-center rounded-xl overflow-hidden select-none"
      style={{ height: `calc(100vh - ${footerHeight + headerHeight}px)` }}
    >
      <div className="flex discover-wrapper max-w-md justify-between flex-col w-full rounded-xl overflow-hidden">
        {/* Controls, Categories etc */}
        <div
          className="absolute flex gap-2 my-2 ml-2 overflow-x-scroll location-tags-discover items-center"
          style={{ maxWidth: `${wrapperWidth}px` }}
        >
          <LocationTag text={"Restaurants"} />
          <LocationTag text={"Hotels"} />
          <LocationTag text={"Fast Food"} />
          <LocationTag text={"Shops"} />
          <LocationTag text={"Shops"} />
          <LocationTag text={"Shops"} />
          <LocationTag text={"Shops"} />
          <LocationTag text={"Shops"} />
        </div>
        <div className="flex flex-col overflow-hidden">
          {bResponse.map((responseData, index) => {
            return (
              <DiscoverCard
                key={index}
                ID={index}
                locationData={responseData}
                location={location}
                wrapperHeight={wrapperHeight}
                next={shortsNext}
                before={shortsBefore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
