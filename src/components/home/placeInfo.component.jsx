import { Fragment, useEffect, useRef, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { calculateDistance } from '../../helpers/BrowseAPI.helper';
import { motion } from "framer-motion";
import axios from 'axios';

export default function PlaceInfo({ info, latitude, longitude, setDetailsModal, setDisplayModal, setShowResults, findDirections }) {
    const [rating, setRating] = useState(0)

    const reviewRef = useRef();

    const handleRating = (rate) => {
        setRating(rate)
    }

    const [review, setReview] = useState(false);

    const [ambience, setAmbience] = useState(0);
    const [environment, setEnvironment] = useState(0);
    const [overall, setOverall] = useState(0);
    const [parking, setParking] = useState(0);

    const [ratingSubmit, setRatingSubmit] = useState(0);
    const [reviewSubmit, setReviewSubmit] = useState(0);

    const [currentRating, setCurrentRating] = useState();

    const [currentReviews, setCurrentReviews] = useState([]);

    useEffect(() => {
        axios.get(`https://travmoreapi.up.railway.app/get_rating?placeID=${info.id}`).then((res) => {
            setCurrentRating(res.data?.rating)
        })
        axios.get(`https://travmoreapi.up.railway.app/get_reviews?placeID=${info.id}`).then((res) => {
            setCurrentReviews(res.data)
        })
    }, [])

    console.log(currentReviews)

    function submitRating() {
        if (rating === 0) return;
        setRatingSubmit(1);
        axios.post(`https://travmoreapi.up.railway.app/add_rating?rating=${rating}&placeID=${info.id}`).catch(() => {
            setRatingSubmit(3)
        }).finally(() => {
            setRatingSubmit(2);
        })
    }

    function submitReview() {
        if (overall === 0 || parking === 0 || ambience === 0 || environment === 0 || reviewRef.current.value === null) return;
        setReviewSubmit(1)
        axios.post(`https://travmoreapi.up.railway.app/add_review?placeID=${info.id}&OverallRating=${overall}&ParkingRating=${parking}&AmbienceRating=${ambience}&TreatmentRating=${environment}&review_text=${reviewRef.current.value}`).catch(() => {
            setReviewSubmit(3);
        }).finally(() => {
            setReviewSubmit(2)
            setReview(false)
        })
    }

    if (!info) return;

    return (
        <div className="flex flex-col w-full bg-black p-4 rounded-lg overflow-y-auto" style={{ maxHeight: "calc(90vh - 8rem)", maxWidth: "500px" }}>
            <div className="flex justify-between items-center">
                <span>{info.title}</span>
                <div className="flex gap-2 items-center">
                    <div className="flex text-xs p-1 border-red-500 border rounded-md items-center cursor-pointer" onClick={(event) => { event.stopPropagation(); findDirections(info.position.lat, info.position.lng); setDetailsModal(); setDisplayModal(false); setShowResults(false); }} style={{ borderRadius: "1rem" }}><span className="material-symbols-outlined">pin_drop</span></div>
                    {info.openingHours &&
                        info.openingHours[0].isOpen === true ?
                        <span className='border bg-green-500 p-1 px-2 rounded-lg text-xs'>Open</span>
                        :
                        <span className='bg-red-500 p-1 px-2 rounded-lg text-xs'>Closed</span>
                    }
                    <div className="flex text-xs px-2 py-1 border-red-500 border rounded-md items-center">{currentRating ? Math.round(currentRating * 100) / 100 : "No ratings available"}</div>
                    <motion.span whileHover={{
                        scale: 1.05,
                        transition: { duration: .3 },
                    }}
                        whileTap={{ scale: 0.9 }}
                        className=" bg-red-700 p-1 px-2 text-xs rounded-lg" onClick={() => { setDetailsModal(); setDisplayModal(false); }}><span className="material-symbols-outlined text-sm">close</span>
                    </motion.span>
                </div>
            </div>

            <div className="flex text-xs py-1">
                {calculateDistance(latitude, longitude, info.position.lat, info.position.lng)} away
            </div>

            <div className="flex gap-2 py-2 text-xs text-gray-400">
                {info.categories.map((item, idx) => {
                    return <span className='border border-gray-400 p-1 px-2 rounded-lg items-center self-center' key={idx}>{item.name}</span>
                })}
            </div>
            <div className="flex text-sm py-2 text-gray-400">
                {info.address.label}
            </div>

            {
                review ?
                    <div className="flex flex-col gap-4 text-sm items-center">
                        {
                            reviewSubmit !== 2 ?
                                <div className="flex text-base justify-center py-2">
                                    Add a review
                                </div>
                                : ""
                        }

                        <div className="flex gap-1 items-center">
                            Overall
                            <Rating iconsCount={5} size={25} SVGclassName={"inline-block"}
                                onClick={(rate) => {
                                    setOverall(rate)
                                }} />
                        </div>
                        <div className="flex gap-1 items-center">
                            Ambience
                            <Rating iconsCount={5} size={25} SVGclassName={"inline-block"}
                                onClick={(rate) => {
                                    setAmbience(rate)
                                }} />
                        </div>
                        <div className="flex gap-1 items-center">
                            Parking
                            <Rating iconsCount={5} size={25} SVGclassName={"inline-block"}
                                onClick={(rate) => {
                                    setParking(rate)
                                }} />
                        </div>
                        <div className="flex gap-1 items-center">
                            Treatment
                            <Rating iconsCount={5} size={25} SVGclassName={"inline-block"}
                                onClick={(rate) => {
                                    setEnvironment(rate)
                                }} />
                        </div>

                        <textarea className='w-full p-2 rounded-md' rows="3" placeholder='Add a review...' ref={reviewRef} />

                        <div className="flex gap-2">
                            <button className='bg-red-500' onClick={() => { setReview(false) }}>Cancel Review</button>
                            <button onClick={submitReview}>
                                {
                                    reviewSubmit === 0 && "Submit Review"
                                }
                                {
                                    reviewSubmit === 1 && "Submitting Review"
                                }
                                {
                                    reviewSubmit === 2 && "Submitted Review"
                                }
                                {
                                    reviewSubmit === 3 && "Failed Submission"
                                }</button>
                        </div>

                    </div>
                    :
                    <Fragment>
                        {info.openingHours ?
                            info.openingHours[0].text &&
                            <div className="flex flex-col w-full justify-center items-center gap-2 text-sm py-2">
                                <div className="flex">
                                    Opening Hours
                                </div>
                                <span className='border p-1 px-2 rounded-lg text-xs w-fit'>{info.openingHours[0].text}</span>
                            </div>

                            :
                            ""
                        }

                        <div className="flex flex-col text-sm py-2 select-text">
                            <div className="flex">Contact</div>
                            <div className="flex flex-wrap gap-2 items-center">
                                {info.contacts &&
                                    info.contacts[0].phone &&
                                    info.contacts[0].phone.map((phone) => {
                                        return <div key={phone.value} className="flex text-sm py-2 text-gray-300 gap-1 items-center">
                                            <span className="material-symbols-outlined text-sm">phone</span>{phone.value}
                                        </div>
                                    })
                                }
                                {info.contacts &&
                                    info.contacts[0].mobile &&
                                    info.contacts[0].mobile.map((phone) => {
                                        return <div key={phone.value} className="flex text-sm py-2 text-gray-300 gap-1 items-center">
                                            <span className="material-symbols-outlined text-sm">phone</span>{phone.value}
                                        </div>
                                    })
                                }
                            </div>

                            {info.contacts &&
                                info.contacts[0].www &&
                                info.contacts[0].www.map((phone, idx) => {
                                    return <div key={idx} className="flex py-2 text-gray-300 gap-1 text-xs items-center">
                                        <span className="material-symbols-outlined text-sm">public</span>{phone.value}
                                    </div>
                                })
                            }
                        </div>

                        <div className="flex flex-col justify-center items-center gap-2 py-3 text-xs">
                            <Rating iconsCount={5} size={25} SVGclassName={"inline-block"}
                                onClick={handleRating} />
                            <button className="text-xs w-fit" onClick={submitRating}>{
                                ratingSubmit === 0 && "Submit Rating"
                            }
                                {
                                    ratingSubmit === 1 && "Uploading Rating"
                                }
                                {
                                    ratingSubmit === 2 && "Submitted Rating"
                                }
                                {
                                    ratingSubmit === 3 && "Failed Submition"
                                }</button>
                        </div>

                        <div className="flex justify-center items-center">
                            <button className="text-xs w-fit" onClick={() => { setReview(true) }}>Add a review</button>
                        </div>

                        <div className="flex text-sm py-2 justify-center items-center gap-2">
                            <span>Reviews</span>
                        </div>

                        <div className="flex flex-col text-sm py-2 gap-2">
                            {
                                currentReviews.length === 0 ?

                                    "No reviews yet" :
                                    currentReviews.map((review) => {
                                        return <div className="flex flex-col">
                                            <div className="flex w-full justify-between">
                                                {review.UserID}
                                                <div className="flex text-xs items-center gap-2">
                                                    <div className="flex  px-2 py-1 border-red-500 border rounded-md items-center gap-1"><span className="material-symbols-outlined text-xs">star</span>{review.OverallRating}</div>
                                                    <div className="flex px-2 py-1 border-red-500 border rounded-md">
                                                        Ambience: {review.AmbienceRating}
                                                    </div>
                                                    <div className="flex px-2 py-1 border-red-500 border rounded-md">
                                                        Treatment: {review.TreatmentRating}
                                                    </div>
                                                    <div className="flex px-2 py-1 border-red-500 border rounded-md">
                                                        Parking: {review.ParkingRating}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex text-sm py-2">
                                                {review.ReviewText}
                                            </div>
                                        </div>
                                    })
                            }
                        </div>
                    </Fragment>
            }


        </div>
    )
}