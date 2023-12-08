import ForumCard from "../components/forum/Forumcard.component";

export default function Forum() {
  let forumcards = [
    {
      id: 1,
      title: "How to invest in the stock market?",
      description:
        "I am new to investing and I want to know how to invest in the stock market.",
      date: "2021-10-01",
      user: "John Doe",
    },
    {
      id: 2,
      title: "How to invest in the stock market?",
      description:
        "I am new to investing and I want to know how to invest in the stock market.",
      date: "2021-10-01",
      user: "John Doe",
    },
  ];

  return (
    <div className="flex flex-col gap-7 items-center mx-6 overflow-y-scroll">
      <button className="w-[70%] rounded-2xl bg-black">+ Add new query</button>
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
