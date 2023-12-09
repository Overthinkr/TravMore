import { calculateDistance } from "../../helpers/BrowseAPI.helper"

export default function ResultDisplay({ items, latitude, longitude, search, setShowResults }) {

    function onClickItem(lat, lng) {
        search(lat, lng)
        setShowResults(false)
    }
    return (
        Object.keys(items).map((restaurant) => {
            console.log(items[restaurant].id)
            return <div key={items[restaurant].id} className="flex flex-col p-3 gap-4 border-slate-900" onClick={() => onClickItem(items[restaurant].position.lat, items[restaurant].position.lng)}>
                <div className="flex w-full justify-between">
                    <span className="overflow-hidden">{items[restaurant].title}</span>
                    <span>{calculateDistance(latitude, longitude, items[restaurant].position.lat, items[restaurant].position.lng)} away</span>
                </div>
                <span className="text-xs">Click for Directions</span>
                <div className="flex gap-2 text-sm text-gray-400">
                    {items[restaurant].categories.map((item) => {
                        return <span>{item.name}</span>
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