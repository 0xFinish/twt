import Link from "next/link";

export function Navbar() {
  return (
    <div className="w-full fixed top-0 h-12 bg-gradient-to-t bg-green-200 flex justify-between items-center px-6">
      <span className="flex gap-2 items-center">
        <Link href={"/"}>
          <p className="text-violet-900 text-xl font-bold">Tweetie</p>
        </Link>
        <Link href={"/createNewTweet"}>
        <p className="text-violet-900 font-semibold">Tweet +</p>
        </Link>
      </span>
      <Link href={"/profile"}>
      <p className="text-violet-900">Profile</p>
      </Link>
    </div>
  );
}
