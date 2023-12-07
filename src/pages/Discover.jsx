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

const Card = ({ title, distance, location, image }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 200], [-50, 50]);
  const opacity = useTransform(x, [-100, 0, 100], [0.2, 1, 0.4]);
  const animscontrol = useAnimation();

  return (
    <motion.div style={opacity}>
      <motion.div
        drag="x"
        dragConstraints={{ x: 0 }}
        rotate={rotate}
        x={x}
        onDragEnd={(event, info) => {
          if (info.point.x < 200) {
            animscontrol.start({ x: 0 });
          } else if (info.point.x > -200) {
            animscontrol.start({ x: 0 });
          } else {
            animscontrol
              .start({ x: info.point.x < 0 ? -1000 : 1000 })
              .then(() => {
                x.set(0);
                animscontrol.set({ x: 0 });
              });
          }
        }}
      >
        <div className="w-full h-full">
          <div>
            <img src={image} alt={title} />
          </div>
          <div>
            <div>
              <h2>{title}</h2>
              <p>{location}</p>
            </div>
            <div>
              <p>{distance}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Discover() {
  let cards = [
    {
      title: "Buckingham Palace",
      distance: "1.2 miles",
      location: "London",
      image: "https://source.unsplash.com/featured/?buckingham-palace",
    },
    {
      title: "The Eiffel Tower",
      distance: "416 miles",
      location: "Paris",
      image: "https://source.unsplash.com/featured/?eiffel-tower",
    },
    {
      title: "The Colosseum",
      distance: "897 miles",
      location: "Rome",
      image: "https://source.unsplash.com/featured/?colosseum",
    },
    {
      title: "The Statue of Liberty",
      distance: "3,459 miles",
      location: "New York",
      image: "https://source.unsplash.com/featured/?statue-of-liberty",
    },
    {
      title: "Leaning Tower of Pisa",
      distance: "1,062 miles",
      location: "Pisa",
      image: "https://source.unsplash.com/featured/?leaning-tower-of-pisa",
    },
    {
      title: "The Great Wall of China",
      distance: "5,995 miles",
      location: "China",
      image: "https://source.unsplash.com/featured/?great-wall-of-china",
    },
    {
      title: "The Great Pyramid of Giza",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?pyramid",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
  ];

  const [footerHeight, setFooterHeight] = useState();
  const [headerHeight, setHeaderHeight] = useState();
  const [wrapperWidth, setWrapperWidth] = useState();
  const [wrapperHeight, setWrapperHeight] = useState();

  const location = useContext(LocationContext);


  useEffect(() => {
    const footer = document.querySelector('.footer');
    const header = document.querySelector('.header');
    const wrapper = document.querySelector('.discover-wrapper');
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
  }, [])

  useEffect(() => {
    if (location?.latitude == null) return;
    // axios.get(`https://browse.search.hereapi.com/v1/browse?at=${location.latitude},${location.longitude}&categories=100-1000-0000&limit=100&lang=en&apiKey=${import.meta.env.VITE_APIKEY}`).then((res) => {
    //   console.log(res.data)
    // })
  }, [location])

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
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentShort])

  return (
    <div className="flex w-full justify-center rounded-xl overflow-hidden select-none" style={{ height: `calc(100vh - ${footerHeight + headerHeight}px)` }}>
      <div className="flex discover-wrapper max-w-md justify-between flex-col w-full rounded-xl overflow-hidden">
        {/* Controls, Categories etc */}
        <div className="absolute flex gap-2 my-2 ml-2 overflow-x-scroll location-tags-discover items-center" style={{ maxWidth: `${wrapperWidth}px` }}>
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
          {
            bResponse.map((responseData, index) => {
              return <DiscoverCard key={index} ID={index} locationData={responseData} location={location} wrapperHeight={wrapperHeight} next={shortsNext} before = {shortsBefore} />
            })
          }
        </div>
      </div>
    </div>
  )
}
