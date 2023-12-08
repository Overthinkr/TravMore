import OpenAI from "openai";
import { useState } from "react";

const openai = new OpenAI({
  apiKey: `${import.meta.env.OPENAI_APIKEY}`,
  dangerouslyAllowBrowser: true,
});

export default function Companion() {
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, inputText) => {
    e.preventDefault();

    if (!inputText) return;

    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "sender", content: inputText });
    setChats(msgs);
    setInputText("");

    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a tourist guide. The user wants to know about the history of the different aspects of a location and they want a guided tour.",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-h-screen">
      {chats
        ? chats.map((message, index) => {
            return message.role === "sender" ? (
              <div key={index} className="flex justify-end">
                <div className="bg-purple-800 rounded-lg p-2 m-2">
                  <p>{message.content}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex justify-start">
                <div className="bg-purple-800 rounded-lg p-2 m-2">
                  <p>{message.content}</p>
                </div>
              </div>
            );
          })
        : ""}
      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>
      <div className="fixed z-10 m-auto bottom-20 justify-center flex w-full ">
        <input
          type="text"
          value={inputText}
          placeholder="Type a message..."
          className="min-w-[300px] rounded-2xl hover:border-purple-800 p-2"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={(e) => {
            chat(e, inputText);
          }}
          className="mx-2 rounded-2xl py-2 text-white hover:text-purple-800"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}
