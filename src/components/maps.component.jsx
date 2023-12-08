import H from '@here/maps-api-for-javascript';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import RestIcon from "../assets/restaurant-icon.svg";
import { motion } from "framer-motion";
import ResultDisplay from './home/resultsDisplay.component';

export default function MapElement({ latitude, longitude }) {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    const restaurantGroup = useRef(null);

    const apikey = "L0-2LCY4n1A2kedFrMAlPVsd9bjfFL9RmaA-JTv-Sgg";

    const [restaurants, setRestaurants] = useState();

    const [showResults, setShowResults] = useState(false);

    function searchArea() {
        const { lat, lng } = map.current.getCenter()
        axios.get(`https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&limit=100&categories=100-1000-0000&apiKey=${apikey}`).then((res) => {

            setRestaurants((x) => {
                if (x) {
                    var tempDict = { ...x }
                    res.data.items.map((item) => {
                        tempDict[item.id] = item;
                    })
                    return tempDict;
                }
                var newDict = {};
                res.data.items.map((item) => {
                    newDict[item.id] = item;
                })
                return newDict;
            });
        })
    }

    function clearRestaurants() {
        setRestaurants();
        console.log(restaurantGroup.current)
        map.current.removeObject(restaurantGroup.current);
        restaurantGroup.current = new H.map.Group();
        map.current.addObject(restaurantGroup.current);
    }

    useEffect(
        () => {
            if (!latitude) return;

            if (!map.current) {
                platform.current = new H.service.Platform({ apikey });
                var defaultLayers = platform.current.createDefaultLayers();

                const newMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 16,
                    pixelRatio: window.devicePixelRatio || 1
                });

                var currentLocation = new H.map.Circle({ lat: latitude, lng: longitude }, 10);
                newMap.addObject(currentLocation);
                var currentLocation = new H.map.Circle({ lat: latitude, lng: longitude }, 125);

                newMap.addObject(currentLocation);

                restaurantGroup.current = new H.map.Group();

                newMap.addObject(restaurantGroup.current);

                const behavior = new H.mapevents.Behavior(
                    new H.mapevents.MapEvents(newMap)
                );

                map.current = newMap;
            }
        },

        [apikey, latitude, longitude]
    );
    useEffect(() => {
        if (!restaurants) return;
        var icon = new H.map.Icon(RestIcon);

        for (const [key, value] of Object.entries(restaurants)) {
            restaurantGroup.current.addObject(new H.map.Marker({ lat: value.position.lat, lng: value.position.lng }, { icon: icon }))
        }

    }, [restaurants])

    return (
        <Fragment>
            <motion.div
                className="absolute flex flex-col items-center select-none cursor-pointer z-10 gap-2 overflow-hidden" style={{ height: "80vh" }}>
                <div className="flex gap-2">
                    <motion.span className="bg-black p-3 rounded-xl mt-4" onClick={searchArea} whileHover={{
                        scale: 1.05,
                        transition: { duration: .3 },
                    }}
                        whileTap={{ scale: 0.9 }}>Search This Area</motion.span>
                </div>

                {
                    restaurants &&
                    Object.keys(restaurants).length > 0 &&
                    <div className="flex flex-col gap-2 items-center">

                        <div className="flex items-center gap-2">
                            <div className="flex bg-black px-4 py-2 rounded-lg" onClick={() => { setShowResults((e) => !e) }}>
                                {
                                    showResults ?
                                        "Close Results" :
                                        "Click here for Results"
                                }

                            </div>
                            <motion.span whileHover={{
                                scale: 1.05,
                                transition: { duration: .3 },
                            }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-black p-3 rounded-xl" onClick={clearRestaurants}>X
                            </motion.span>
                        </div>




                        {
                            showResults &&
                            <div className="flex flex-col bg-black p-2 rounded-lg overflow-auto" style={{ maxHeight: "calc(80vh - 8rem)" }}>
                                {
                                    restaurants &&
                                    <ResultDisplay items={restaurants} latitude={latitude} longitude={longitude} />
                                }
                            </div>
                        }

                    </div>
                }


            </motion.div>
            <div className='absolute' style={{ width: "100%", height: "80vh" }} ref={mapRef} />
        </Fragment>
    )
}