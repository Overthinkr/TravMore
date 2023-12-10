import axios from "axios";
import { useEffect, useState } from "react";

export default function ForumCard({ id, title, description, date, user }) {
  const [cardpressed, setCardpressed] = useState(false);
  const [forumReplies, setForumReplies] = useState([]);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const response = await axios.get(
          `https://travmoreapi.up.railway.app/get_forum_replies?queryID=${id}`
        );
        setForumReplies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching forum replies:", error);
      }
    };

    if (cardpressed) {
      getReplies();
    }
  }, [cardpressed]);

  return (
    <>
      <div
        className="flex justify-between align-middle gap-3 bg-slate-900 p-4 drop-shadow-xl rounded-xl w-full"
        onClick={() => setCardpressed(true)}
      >
        <div>
          <p className="text-xs">{user}</p>
          <h2 className="font-bold text-lg">{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <p>{date}</p>
        </div>
      </div>
      {cardpressed && (
        <div className="absolute w-full h-full overflow-y-scroll flex flex-col">
          <div className="flex flex-row justify-between">
            <p>{title}</p>
            <span
              className="material-symbols-outlined"
              onClick={() => setCardpressed(false)}
            >
              close
            </span>
          </div>
          {forumReplies.map((reply) => (
            <div
              key={reply.id}
              className="flex flex-col gap-3 align-middle justify-center text-center"
            >
              <p>{reply.text}</p>
            </div>
          ))}
          <div>
            <button
              className="rounded-2xl bg-black"
              onClick={() => setReplying(true)}
            >
              + Add reply
            </button>
            {replying && (
              <div className="flex flex-col gap-3 align-middle justify-center text-center">
                <input
                  type="text"
                  placeholder="Type your reply here..."
                  className="rounded-2xl bg-white border-2 border-black p-2 px-4 text-black text-center"
                />
                <button
                  className="rounded-2xl bg-black"
                  onClick={() => setReplying(false)}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
