export default function LocationTag({ text, fn, getPlaces, currentCategory }) {
    
    return (
        <div onClick={() => {
            getPlaces(fn);
        }} className={"flex p-2 px-3 text-sm cursor-pointer rounded-xl w-max whitespace-nowrap" + (fn === currentCategory ? " bg-blue-500" : " bg-slate-900")}>
            {text}
        </div>
    )
}