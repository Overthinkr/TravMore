import { useState } from "react";

export default function Companion() {
  let messages = [
    { role: "sender", content: "Hi" },
    { role: "receiver", content: "Hello" },
    { role: "sender", content: "How are you?" },
    { role: "receiver", content: "I'm fine" },
  ];

  const [inputText, setInputText] = useState("");
  return (
    <div>
      {messages.map((message, index) => {
        return message.role === "sender" ? (
          <div key={index} className="flex justify-end">
            <div className="bg-gray-200 rounded-lg p-2 m-2">
              <p>{message.content}</p>
            </div>
          </div>
        ) : (
          <div key={index} className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-2 m-2">
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
      <div className="absolute m-auto bottom-20 ">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={() => {
            messages.push({ role: "sender", content: inputText });
            setInputText("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
