export default function Investcard({ location, country, description }) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{location}</h1>
        <p className="text-md">{country}</p>
      </div>
      <div className="flex flex-col">
        <button className="bg-purple-800 rounded-lg p-2 m-2">Know more</button>
        <button className="bg-purple-800 rounded-lg p-2 m-2">Invest</button>
      </div>
    </div>
  );
}
