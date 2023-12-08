import { calculateDistance } from "../../helpers/BrowseAPI.helper"

export default function ResultDisplay({ items, latitude, longitude }) {



    return (
        Object.keys(items).map((restaurant) => {
            return <div className="flex flex-col p-3 gap-4 border-slate-900">
                <div className="flex w-full justify-between">
                    <span className="overflow-hidden">{items[restaurant].title}</span>
                    <span>{calculateDistance(latitude, longitude, items[restaurant].position.lat, items[restaurant].position.lng)} away</span>
                </div>

                <div className="flex gap-2 text-sm text-gray-400">
                    {items[restaurant].categories.map((item) => {
                        return <span>{item.name} </span>
                    })}
                </div>

                <div className="flex text-xs text-gray-400">
                    {
                        items[restaurant].address.label
                    }
                </div>
            </div>
        })
    )
}