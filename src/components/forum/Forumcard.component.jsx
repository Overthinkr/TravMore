import axios from "axios";
import { useEffect, useState } from "react";

export default function ForumCard({ id, title, description, date, user, setCardpressed, setCardData, setReplyData }) {

  function clicked() {
    try {
      const response = axios.get(
        `https://travmoreapi.up.railway.app/get_forum_replies?queryID=${id}`
      ).then((res) => {
        setCardData({
          id,
          title,
          description,
          date,
          user
        })
        setReplyData(res.data);
      }).finally(() => {
        setCardpressed(true);
      });
    } catch (error) {
      console.error("Error fetching forum replies:", error);
    }
  }

  return (
    <>
      <div
        className="flex justify-between align-middle gap-3 bg-slate-900 p-4 drop-shadow-xl rounded-xl w-full"
        onClick={clicked}
      >
        <div className="flex w-full flex-col">
          <p className="text-xs">{user}</p>
          <div className="flex w-full justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <p>{date}</p>
          </div>
          <p className="text-sm">{description.length > 200 ?
description.substring(0, 200) + "..."
:
description
          
          }</p>
        </div>
      </div>
    </>
  );
}
