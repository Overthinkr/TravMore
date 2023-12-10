import { useEffect, useRef, useState } from "react";
import ForumCard from "../components/forum/Forumcard.component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forum() {
  const [searchbutton, setSearchbutton] = useState(false);
  const [search, setSearch] = useState("");
  const [forumcards, setForumcards] = useState([]);

  const [addQueryModal, setAddQueryModal] = useState(false);

  const router = useNavigate();

  useEffect(() => {
    axios
      .get(`https://travmoreapi.up.railway.app/get_forum_queries`)
      .then((res) => {
        if (res) {
          setForumcards(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });
  }, []);

  const TitleRef = useRef();
  const DescRef = useRef();
  const CategoryRef = useRef();

  const [categoriesList, setCategoriesList] = useState([]);

  const addbutton = () => {
    const category = categoriesList.join(',');
    axios
      .post(`https://travmoreapi.up.railway.app/add_forum_query?query_title=${TitleRef.current.value}&query_text=${DescRef.current.value}&category=${category}`)
      .then((res) => {
        setAddQueryModal(false);
        router(0)
      })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });
  };

  const [cardpressed, setCardpressed] = useState(false);
  const [cardData, setCardData] = useState();
  const [replyData, setReplyData] = useState([]);
  const [replying, setReplying] = useState(false);

  const replyRef = useRef();

  function addReply() {
    axios.post(`https://travmoreapi.up.railway.app/add_forum_reply?queryID=${cardData.id}&reply_text=${replyRef.current.value}`).then((res) => {
      setAddQueryModal(false);
      router(0)
    })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });

  }

  return (
    <>
      {cardpressed && (
        <div className="fixed flex overlay z-30 w-full h-full justify-center items-center">
          <div className="w-[350px] gap-2 p-4 bg-slate-900 rounded-lg overflow-y-scroll flex flex-col">
            <div className="flex flex-row justify-between text-xl">
              <p>Title: {cardData?.title}</p>
              <span
                className="material-symbols-outlined"
                onClick={() => setCardpressed(false)}
              >
                close
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <p>{cardData?.description}</p>
            </div>
            <div className="flex flex-col justify-center w-full gap-4">
              <button
                className="rounded-2xl bg-black self-center"
                onClick={() => setReplying(true)}
              >
                + Add reply
              </button>
              {replying && (
                <div className="flex flex-col gap-4 align-middle justify-center text-center">
                  <textarea
                    ref={replyRef}
                    type="text"
                    placeholder="Type your reply here..."
                    className="rounded-2xl bg-white border-2 border-black p-2 px-4 text-black"
                  />
                  <button
                    className="rounded-2xl bg-black"
                    onClick={addReply}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 text-sm">
            {replyData.map((reply) => (
              <div
                key={reply.id}
                className="flex flex-col gap-3 align-middle justify-center border p-2 rounded-xl"
              >
                <div className="flex w-full justify-between">
                  <span>{reply.UserID}</span>
                  <span>{reply.ReplyDate}</span>
                </div>
                <p>{reply.ReplyText}</p>
              </div>
            ))}
            </div>
            
          </div>
        </div>
      )}
      {
        addQueryModal &&
        <div className="absolute z-10 flex w-full h-screen overlay justify-center items-center">
          <div className="flex flex-col gap-4 items-center bg-slate-900 w-fit p-4 rounded-lg">
            <div className="flex text-lg items-center justify-between w-full">
              Add a query!
              <span className="material-symbols-outlined text-sm bg-red-500 p-2 rounded-lg" onClick={() => {setAddQueryModal(false)}}>close</span>
            </div>
            <div className="flex gap-2 items-center w-[250px]">
              <input className="p-2 rounded-lg outline-none text-sm w-full" placeholder={"Enter the Title here..."} ref={TitleRef} />
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="flex">Content</div>
              <textarea className="p-2 rounded-lg outline-none text-sm w-full" ref={DescRef} />
            </div>
            <div className="flex gap-2 items-center w-[250px]">
              <input className="p-2 rounded-lg outline-none text-sm w-full" placeholder={"Enter the Categories here..."} ref={CategoryRef} />
              <span className="material-symbols-outlined p-2 bg-red-500 rounded-xl" onClick={() => setCategoriesList((x) => {
                return [...x, CategoryRef.current.value];
              })}>add</span>
            </div>
            <div className="flex gap-2">
              {
                categoriesList?.map((cate, idx) => {
                  return <div key={idx} className="flex gap-2 px-3 rounded-lg py-1 text-sm bg-blue-500" onClick={() => {
                    setCategoriesList((x) => {
                      let temp = [...x]

                      return temp.slice(idx, 1)
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
            <button onClick={addbutton}>Add Query</button>
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
                setCardpressed={setCardpressed}
                setCardData={setCardData}
                setReplyData={setReplyData}
                cardpressed={cardpressed}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
