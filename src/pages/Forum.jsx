import { useEffect, useRef, useState } from "react";
import ForumCard from "../components/forum/Forumcard.component";
import axios from "axios";

export default function Forum() {
  const [searchbutton, setSearchbutton] = useState(false);
  const [search, setSearch] = useState("");
  const [forumcards, setForumcards] = useState([]);

  const [addQueryModal, setAddQueryModal] = useState(false);

  console.log(forumcards);

  useEffect(() => {
    axios
      .get(`https://travmoreapi.up.railway.app/get_forum_queries`)
      .then((res) => {
        if (res) {
          setForumcards(res.data);
        }

        console.log(forumcards);
      })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });
  }, []);

  const addbutton = () => {
    axios
      .get(`https://travmoreapi.up.railway.app/add_forum_query?query_title=%60&query_text=%60&category=%60`)
      .then((res) => {
        if (res) {
          setForumcards(res.data);
        }

        console.log(forumcards);
      })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });
  };

  const TitleRef = useRef();
  const DescRef = useRef();
  const CategoryRef = useRef();

  const [categoriesList, setCategoriesList] = useState([]);

  return (
    <>
      {
        addQueryModal &&
        <div className="absolute z-10 flex w-full h-screen overlay justify-center items-center">
          <div className="flex flex-col p-2 gap-4 items-center bg-slate-900 w-fit p-4 rounded-lg">
              <div className="flex text-lg items-center">
                Add a query!
              </div>
              <div className="flex gap-2 items-center w-[250px]">
                <input className="p-2 rounded-lg outline-none text-sm w-full" placeholder={"Enter the Title here..."} ref={TitleRef}/>
              </div>
              <div className="flex flex-col gap-2 items-center w-full">
                <div className="flex">Content</div>
                <textarea className="p-2 rounded-lg outline-none text-sm w-full" ref={DescRef}/>
              </div>
              <div className="flex gap-2 items-center w-[250px]">
                <input className="p-2 rounded-lg outline-none text-sm w-full" placeholder={"Enter the Categories here..."} ref={CategoryRef}/>
                <span className="material-symbols-outlined p-2 bg-red-500 rounded-xl" onClick={() => setCategoriesList((x) => {
                  return [...x, CategoryRef.current.value];
                })}>add</span>
              </div>
              <div className="flex gap-2">
                {
                  categoriesList?.map((cate, idx) =>{
                    return <div key={idx} className="flex gap-2 px-3 rounded-lg py-1 text-sm bg-blue-500" onClick={() => {
                      setCategoriesList((x) => {
                        let temp = [...x]

                        return temp.slice(idx)
                      })
                    }}>
                      {cate}
                    </div>
                  })
                }
              </div>
              <div className="flex text-xs text-gray-600">
                Click the tag to remove it
              </div>
              <button>Add Query</button>
          </div>
        </div>
      }
      <div className="flex flex-col gap-7 items-center mx-auto overflow-hidden max-w-2xl w-full align-middle justify-center mt-14">
        <div className="flex flex-row items-center w-full justify-between">
          <button
            className="rounded-2xl bg-black flex"
            onClick={() => setSearchbutton(true)}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="w-[80%] rounded-2xl bg-black" onClick={() => setAddQueryModal(true)}>
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
            forumcard?.QueryTitle.toLowerCase().includes(search.toLowerCase()) ||
            forumcard?.QueryText.toLowerCase().includes(search.toLowerCase()) ||
            forumcard?.UserID.toLowerCase().includes(search.toLowerCase()) ||
            forumcard?.QueryDate.toLowerCase().includes(search.toLowerCase())
          ) {
            return (
              <ForumCard
                key={forumcard.id}
                id={forumcard.id}
                title={forumcard.QueryTitle}
                description={forumcard.QueryText}
                date={forumcard.QueryDate}
                user={forumcard.UserID}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
