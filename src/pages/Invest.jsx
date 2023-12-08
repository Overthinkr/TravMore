import Investcard from "../components/invest/investcards.component";

export default function Invest() {
  let locations = [
    {
      location: "Bhutan",
      country: "Asia",
      description: "Bhutan is a country in South Asia",
    },
    {
      location: "Bhutan",
      country: "Asia",
      description: "Bhutan is a country in South Asia",
    },
    {
      location: "Bhutan",
      country: "Asia",
      description: "Bhutan is a country in South Asia",
    },
    {
      location: "Bhutan",
      country: "Asia",
      description: "Bhutan is a country in South Asia",
    },
    {
      location: "Bhutan",
      country: "Asia",
      description: "Bhutan is a country in South Asia",
    },
  ];

  return (
    <div className="m-auto mx-8 flex justify-center flex-col">
      <div className="flex justify-center flex-col gap-4">
        <h1 className="text-xl font-bold">Up and coming tourist spots....</h1>
        <p className="text-md">
          Get in on the ground floor. Invest in these tourist spots and watch
          them grow
        </p>
      </div>
      <div>
        {locations &&
          locations.map((location, index) => {
            console.log(location);
            <Investcard
              key={index}
              location={location.location}
              country={location.country}
              description={location.description}
            />;
          })}
      </div>
    </div>
  );
}
