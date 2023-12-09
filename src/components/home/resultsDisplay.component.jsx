import axios from "axios";
import { calculateDistance } from "../../helpers/BrowseAPI.helper"

export default function ResultDisplay({ items, latitude, longitude, search, setShowResults, clickPlace }) {

    function findDirections(lat, lng) {
        search(lat, lng)
        setShowResults(false)
    }

    return (
        Object.keys(items).map((restaurant) => {
            return <div key={items[restaurant].id} className="flex flex-col p-3 gap-2 border-slate-900 select-none cursor-pointer" onClick={() => clickPlace(items[restaurant])}>
                <div className="flex w-full justify-between items-center">
                    <span className="overflow-hidden">{items[restaurant].title}</span>
                    <div className="flex items-center gap-2">
                        {items[restaurant].openingHours ?
                            items[restaurant].openingHours[0].isOpen === true ?
                                <span className='border bg-green-500 p-1 px-2 rounded-lg text-xs'>Open</span>
                                :
                                <span className='bg-red-500 p-1 px-2 rounded-lg text-xs'>Closed</span>
                            :
                            ""
                        }
                        <div className="flex text-xs px-2 py-1 border-green-500 border rounded-md items-center">Click here for ratings</div>
                        <div className="flex text-xs p-1 border-red-500 border rounded-md items-center cursor-pointer" onClick={(event) => { event.stopPropagation(); findDirections(items[restaurant].position.lat, items[restaurant].position.lng) }} style={{ borderRadius: "1rem" }}><span className="material-symbols-outlined">pin_drop</span></div>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-sm">{calculateDistance(latitude, longitude, items[restaurant].position.lat, items[restaurant].position.lng)} away</span>
                </div>
                <div className="flex gap-2 text-sm text-gray-400">
                    {items[restaurant].categories.map((item, idx) => {
                        return <span key={idx}>{item.name}</span>
                    })}
                </div>

                <div className="flex text-xs text-gray-400">
                    Click for more info.
                </div>
            </div>
        })
    )
}