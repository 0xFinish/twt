import Link from "next/link";

export function Tweet({ tweet, ID, nickname }) {
  return (
    
      <div className="text-red-500 bg-green-100 border-blue-400 border-2 rounded-full px-4">
        <Link href={`/tweet/${ID}`}>{tweet}</Link>
        <Link href={`/profile/${nickname}`}>{nickname}</Link>
      </div>
    
  );
}
