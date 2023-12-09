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

  const addbutton = () => {
    console.log("Add button clicked");
  };

  return (
    <div className="flex flex-col gap-7 items-center mx-auto  overflow-hidden max-w-2xl w-full align-middle justify-center mt-14">
      <div className="flex flex-row items-center w-full justify-between">
        <button
          className="rounded-2xl bg-black flex"
          onClick={() => setSearchbutton(true)}
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className="w-[80%] rounded-2xl bg-black" onClick={addbutton}>
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
      {forumcards.map((forumcard) => {
        if (
          forumcard.title.toLowerCase().includes(search.toLowerCase()) ||
          forumcard.description.toLowerCase().includes(search.toLowerCase()) ||
          forumcard.user.toLowerCase().includes(search.toLowerCase()) ||
          forumcard.date.toLowerCase().includes(search.toLowerCase())
        ) {
          return (
            <ForumCard
              key={forumcard.id}
              title={forumcard.title}
              description={forumcard.description}
              date={forumcard.date}
              user={forumcard.user}
            />
          );
        }
      })}
    </div>
  );
}
