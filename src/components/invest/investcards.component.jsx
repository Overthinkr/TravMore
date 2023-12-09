export default function Investcard({ location, country, description }) {
  return (
    <>
      <div className="flex flex-row w-fit justify-between text-center items-center border border-gray-600 rounded-2xl">
        <div className="flex flex-col mx-6">
          <h1 className="text-xl font-bold">{location}</h1>
          <p className="text-md">{country}</p>
        </div>
        <div className="flex flex-col p-2">
          <button className="bg-purple-800 rounded-lg p-2 m-2 cursor-not-allowed">
            Know more
          </button>
          <button className="bg-purple-800 rounded-lg p-2 m-2 cursor-not-allowed">
            Invest
          </button>
        </div>
      </div>
    </>
  );
}
