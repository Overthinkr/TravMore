import { calculateDistance } from "../../helpers/BrowseAPI.helper"

export default function ResultDisplay({ items, latitude, longitude }) {



    return (
        Object.keys(items).map((restaurant) => { 
            return <div className="flex flex-col p-3 gap-4 border-slate-900">
                <div className="flex w-full justify-between">
                    <span>{items[restaurant].title}</span>
                    <span>{calculateDistance(latitude, longitude, items[restaurant].position.lat, items[restaurant].position.lng)} away</span>
                </div>

                <span>Click for more...</span>
            </div>
        })
    )
}