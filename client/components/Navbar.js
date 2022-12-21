import Link from "next/link";

export function Navbar() {
  return (
    <div className="w-full fixed top-0 h-12 flex justify-between items-center px-6  opacity-75 bg-gradient-to-br from-slate-700 to-black">
      <span className="flex gap-2 items-center">
        <Link href={"/"}>
          <p className="text-violet-400 text-2xl font-bold font-abril">Soci<span>Ly</span></p>
        </Link>
        <Link href={"/createNewTweet"}>
        <p className="text-violet-400 font-semibold"></p>
        </Link>
      </span>
      <Link href={"/profile"}>
      <p className="text-violet-900"></p>
      </Link>
    </div>
  );
}
