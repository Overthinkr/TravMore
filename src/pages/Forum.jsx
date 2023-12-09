import { useState } from "react";
import ForumCard from "../components/forum/Forumcard.component";

export default function Forum() {
  let forumcards = [
    {
      id: 1,
      title: "Nature",
      description:
        "Nature soothes the soul. It has the power to heal and rejuvenate.",
      date: "09-12-2023",
      user: "Mayank",
    },
    {
      id: 2,
      title: "Nature",
      description:
        "Nature soothes the soul. It has the power to heal and rejuvenate.",
      date: "09-12-2023",
      user: "Dinesh",
    },
  ];

  const [searchbutton, setSearchbutton] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-7 items-center mx-6 overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-row items-center w-full justify-between">
        <button
          className="rounded-2xl bg-black flex"
          onClick={() => setSearchbutton(true)}
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className="w-[80%] rounded-2xl bg-black">
          + Add new query
        </button>
      </div>
      {searchbutton && (
        <div className="flex flex-row items-center w-full justify-between">
          <button
            className="rounded-2xl bg-black flex"
            onClick={() => setSearchbutton(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <input
            type="text"
            className="w-[80%] rounded-2xl bg-white border-2 border-black p-2 px-4 text-black text-center"
            placeholder="Type here to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <div className="flex overflow-x-scroll w-full gap-2 max-h-8">
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Restaurants</p>
        </a>
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Hotels</p>
        </a>
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Fast-Food</p>
        </a>
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Shops</p>
        </a>
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Restaurants</p>
        </a>
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Restaurants</p>
        </a>
        <a className="bg-black rounded-xl p-1 px-3 min-w-max">
          <p>Restaurants</p>
        </a>
      </div>
      {forumcards.map((forumcard) => (
        <ForumCard
          key={forumcard.id}
          title={forumcard.title}
          description={forumcard.description}
          date={forumcard.date}
          user={forumcard.user}
        />
      ))}
    </div>
  );
}
