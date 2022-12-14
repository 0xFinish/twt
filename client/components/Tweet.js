import Link from "next/link";

export function Tweet({ tweet, ID }) {
  return (
    <Link href={`tweet/${ID}`}>
      <div className="text-red-500 bg-green-100 border-blue-400 border-2 rounded-full px-4">
        {tweet}
      </div>
    </Link>
  );
}
