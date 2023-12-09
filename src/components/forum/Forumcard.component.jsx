export default function ForumCard({ title, description, date, user }) {
  return (
    <div className="flex justify-between align-middle gap-3 bg-slate-900 p-4 drop-shadow-xl rounded-xl">
      <div>
        <p className="text-xs">{user}</p>
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        <p>{date}</p>
      </div>
    </div>
  );
}
