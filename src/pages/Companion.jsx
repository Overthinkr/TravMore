import { useState } from "react";

const systemMessage = {
  role: "system",
  content:
    "You are a tourist guide. The user wants to know about the history of the different aspects of a location and they want a guided tour.",
};

export default function Companion() {
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (inputText) => {
    if (!inputText) return;

    const newMessage = {
      inputText,
      sender: "user",
    };

    const newMessages = [...chats, newMessage];

    setChats(newMessages);

    setIsTyping(true);

    await sendToGPT(newMessages);

    async function sendToGPT(chatMessages) {
      let apiMessages = chatMessages.map((messageObject) => {
        let role = "";
        if (messageObject.sender === "ChatGPT") {
          role = "assistant";
        } else {
          role = "user";
        }
        return { role: role, content: messageObject.message };
      });

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...apiMessages],
      };

      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + `${import.meta.env.VITE_OPENAI_APIKEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          setChats([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ]);
          setIsTyping(false);
        });
    }
  };

  return (
    <div className="max-h-screen">
      {chats
        ? chats.map((message, index) => {
            return message.sender === "user" ? (
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
