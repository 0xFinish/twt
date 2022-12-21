import Link from "next/link";

export function Tweet({ tweet, ID, nickname, date }) {
  return (
    <div className="flex text-white justify-between hover:bg-slate-800 transition align-middle items-center">
      <div className="flex flex-col">
        <Link href={`/profile/${nickname}`}>{nickname}</Link>
        <Link href={`/tweet/${ID}`}>{tweet}</Link>
      </div>
      {date}
    </div>
  );
}
