import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";

const Card = ({ title, distance, location, image }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 200], [-50, 50]);
  const opacity = useTransform(x, [-100, 0, 100], [0.2, 1, 0.4]);
  const animscontrol = useAnimation();

  return (
    <motion.div style={opacity}>
      <motion.div
        drag="x"
        dragConstraints={{ x: 0 }}
        rotate={rotate}
        x={x}
        onDragEnd={(event, info) => {
          if (info.point.x < 200) {
            animscontrol.start({ x: 0 });
          } else if (info.point.x > -200) {
            animscontrol.start({ x: 0 });
          } else {
            animscontrol
              .start({ x: info.point.x < 0 ? -1000 : 1000 })
              .then(() => {
                x.set(0);
                animscontrol.set({ x: 0 });
              });
          }
        }}
      >
        <div className="w-full h-full">
          <div>
            <img src={image} alt={title} />
          </div>
          <div>
            <div>
              <h2>{title}</h2>
              <p>{location}</p>
            </div>
            <div>
              <p>{distance}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Discover() {
  let cards = [
    {
      title: "Buckingham Palace",
      distance: "1.2 miles",
      location: "London",
      image: "https://source.unsplash.com/featured/?buckingham-palace",
    },
    {
      title: "The Eiffel Tower",
      distance: "416 miles",
      location: "Paris",
      image: "https://source.unsplash.com/featured/?eiffel-tower",
    },
    {
      title: "The Colosseum",
      distance: "897 miles",
      location: "Rome",
      image: "https://source.unsplash.com/featured/?colosseum",
    },
    {
      title: "The Statue of Liberty",
      distance: "3,459 miles",
      location: "New York",
      image: "https://source.unsplash.com/featured/?statue-of-liberty",
    },
    {
      title: "Leaning Tower of Pisa",
      distance: "1,062 miles",
      location: "Pisa",
      image: "https://source.unsplash.com/featured/?leaning-tower-of-pisa",
    },
    {
      title: "The Great Wall of China",
      distance: "5,995 miles",
      location: "China",
      image: "https://source.unsplash.com/featured/?great-wall-of-china",
    },
    {
      title: "The Great Pyramid of Giza",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?pyramid",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
    {
      title: "The Great Sphinx",
      distance: "2,897 miles",
      location: "Giza",
      image: "https://source.unsplash.com/featured/?sphinx",
    },
  ];

  return cards.map((card, index) => {
    return (
      <Card
        key={index}
        title={card.title}
        distance={card.distance}
        location={card.location}
        image={card.image}
      />
    );
  });
}
