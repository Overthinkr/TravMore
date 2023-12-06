import { calculateDistance } from "../../helpers/BrowseAPI.helper";

export default function DiscoverCard({ locationData, location, wrapperHeight }) {

    return (
        <div className="flex flex-col h-full" style={{height:`${wrapperHeight}px`}}>
            <div className="flex h-full bg-cover">
                <img src="https://source.unsplash.com/featured/?buckingham-palace" />
            </div>
            <div className="flex bg-white text-black font-medium p-5" >
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <span>{locationData.title}</span>
                        <span className="text-xs text-gray-800">{calculateDistance(parseFloat(locationData.position.lat), parseFloat(locationData.position.lng), location.latitude, location.longitude)} away</span>
                    </div>

                    <span>5 Star Cuh</span>
                </div>
            </div>
        </div>

    )
}