import { useState } from "react";
import { calculateDistance } from "../../helpers/BrowseAPI.helper";

export default function DiscoverCard({ locationData, location, wrapperHeight, ID, next, before }) {
    const [showAddress, setShowAddress] = useState(false);

    return (
        <div className="flex flex-col h-full justify-between bg-black" style={{ height: `${wrapperHeight}px`, minHeight: "-webkit-fill-available" }} id={`data-id-${ID}`}>
            <div className="flex min-h-0 justify-center items-center bg-cover overflow-hidden">
                <img src="https://source.unsplash.com/featured/?buckingham-palace" />
            </div>
            <div className="flex bg-white text-black font-medium p-5 flex-col gap-2" >
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <span>{locationData.title}</span>
                        <span className="text-xs text-gray-800">{calculateDistance(parseFloat(locationData.position.lat), parseFloat(locationData.position.lng), location.latitude, location.longitude)} away</span>
                    </div>

                    <span>5 Star Cuh</span>
                </div>

                <div className="flex text-xs gap-2">
                    {locationData.foodTypes.map((type) => {
                        return <div className="flex px-3 py-1 rounded-md" style={{ border: `2px solid #4169E1` }}>
                            {type.name}
                        </div>
                    })}
                </div>

                <div className="flex text-xs">
                    {
                        !showAddress &&
                        <button className="text-white" onClick={() => { setShowAddress(true) }}>Show Address</button>
                    }

                    {showAddress && <span onClick={() => { setShowAddress(false) }}>{locationData.address.label}</span>}
                </div>



                <div className="flex flex-1 w-full text-xl justify-between p-5">
                    <button className="text-white" onClick={next}>NO</button>
                    <button className="text-white" onClick={next}>YES</button>
                </div>
            </div>
        </div>

    )
}