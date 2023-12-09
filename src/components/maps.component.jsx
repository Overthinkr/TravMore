import H from '@here/maps-api-for-javascript';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import RestIcon from "../assets/restaurant-icon.svg";
import { motion } from "framer-motion";
import ResultDisplay from './home/resultsDisplay.component';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { optionsHelper } from '../helpers/Home.helper';
import PlaceInfo from './home/placeInfo.component';

export default function MapElement({ latitude, longitude }) {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    const restaurantGroup = useRef(null);
    const routingGroup = useRef(null);

    const apikey = "L0-2LCY4n1A2kedFrMAlPVsd9bjfFL9RmaA-JTv-Sgg";

    const [restaurants, setRestaurants] = useState();

    const [showResults, setShowResults] = useState(false);

    const [searchLink, setLink] = useState("");

    const [routingEnabled, setRoutingEnabled] = useState(false);

    const [detailsModal, setDetailsModal] = useState();
    const [displayModal, setDisplayModal] = useState(false);
    // const [routingDest, setRoutingDest] = useState();
    // const [routingTime, setRoutingTime] = useState({});

    function clickPlace(info) {
        setDisplayModal(true)
        setShowResults(false);
        setDetailsModal(info)
    }

    function searchArea() {
        if (searchLink === "") return;
        const { lat, lng } = map.current.getCenter()
        axios.get(`https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&limit=100&categories=${searchLink}&apiKey=${apikey}`).then((res) => {

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
        map.current.removeObject(restaurantGroup.current);
        restaurantGroup.current = new H.map.Group();
        map.current.addObject(restaurantGroup.current);
    }

    function clearRoute() {
        map.current.removeObject(routingGroup.current);
        setRoutingEnabled(false);
    }

    const router = platform.current?.getRoutingService(null, 8);


    var destination = { lat: latitude, lng: longitude };

    const onResult = function (result) {
        if (result.routes.length) {
            console.log(result)
            const lineStrings = [];
            result.routes[0].sections.forEach((section) => {
                lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
            });

            const multiLineString = new H.geo.MultiLineString(lineStrings);

            const routeLine = new H.map.Polyline(multiLineString, {
                style: {
                    strokeColor: 'blue',
                    lineWidth: 3
                }
            });

            const startMarker = new H.map.Marker({ lat: latitude, lng: longitude });

            const endMarker = new H.map.Marker(destination);

            routingGroup.current = new H.map.Group();
            routingGroup.current.addObjects([routeLine, startMarker, endMarker]);

            map.current.addObject(routingGroup.current);

            map.current.getViewModel().setLookAtData({
                bounds: routingGroup.current.getBoundingBox()
            });

            // setRoutingTime({ arrival: result.routes[0].sections[0].arrival.time, departure: result.routes[0].sections[0].departure.time });
            setRoutingEnabled(true);
        };
    };

    function search(searchLat, searchLng) {
        if (routingEnabled) {
            clearRoute();
        }
        const routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'car',
            'origin': `${latitude},${longitude}`,
            'destination': `${searchLat},${searchLng}`,
            'return': 'polyline',
        };
        destination = { lat: searchLat, lng: searchLng }
        router.calculateRoute(routingParameters, onResult,
            function (error) {
                alert(error.message);
            });
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
                    padding: { top: 50, right: 50, bottom: 50, left: 50 },
                    pixelRatio: window.devicePixelRatio || 1
                });

                var ui = H.ui.UI.createDefault(newMap, defaultLayers);

                window.addEventListener('resize', () => newMap.getViewPort().resize());
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

    const options = optionsHelper;

    return (
        <Fragment>
            <motion.div
                className="absolute flex flex-col items-center select-none cursor-pointer z-10 gap-2" style={{ maxHeight: "80vh" }}>
                <div className="flex gap-2 mt-3 items-center">
                    <Dropdown options={options} onChange={(e) => { setLink(e.value) }} placeholder="Category" />


                    <motion.span className="flex bg-black p-3 rounded-xl items-center" onClick={searchArea} whileHover={{
                        scale: 1.05,
                        transition: { duration: .3 },
                    }}
                        whileTap={{ scale: 0.9 }}><span className="material-symbols-outlined">search</span></motion.span>
                    {
                        routingEnabled &&
                        <motion.span whileHover={{
                            scale: 1.05,
                            transition: { duration: .3 },
                        }}
                            whileTap={{ scale: 0.9 }}
                            className=" bg-red-700 px-4 py-2 rounded-xl" onClick={clearRoute}>Clear Route
                        </motion.span>
                    }
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
                                className=" bg-red-700 px-4 py-2 rounded-xl" onClick={clearRestaurants}>Clear
                            </motion.span>
                        </div>




                        {
                            showResults &&
                            <div className="flex flex-col bg-black p-2 rounded-lg overflow-auto" style={{ maxHeight: "calc(80vh - 8rem)", maxWidth: "500px" }}>
                                {
                                    restaurants &&
                                    <ResultDisplay items={restaurants} latitude={latitude} longitude={longitude} search={search} setShowResults={setShowResults} clickPlace={clickPlace} />
                                }
                            </div>
                        }

                        {/* {
                            routingEnabled &&
                            <div className="flex flex-col bg-black p-2 rounded-lg overflow-auto" style={{ maxHeight: "calc(80vh - 8rem)", maxWidth: "500px" }}>
                                <span>Destination: <span className=''></span></span>
                                {
                                    routingTime.arrival &&
                                    <span>{TimeCalculate(routingTime.arrival, routingTime.destination)}</span>
                                }
                            </div>
                        } */}

                    </div>
                }

                {
                    displayModal &&
                    <PlaceInfo info={detailsModal} findDirections={search} latitude={latitude} longitude={longitude} setDisplayModal={setDisplayModal} setDetailsModal={setDetailsModal} setShowResults={setShowResults} />
                }


            </motion.div>
            <div className='absolute' style={{ width: "100%", height: "80vh" }} ref={mapRef} />
        </Fragment>
    )
}