import Link from "next/link";

export function Sidebar() {
  return (
    <div className="col-span-2 flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2">
      <Link href={"/createNewTweet"}>
        <button className="w-40 h-10 rounded-full outline-2 outline-violet-500 outline text-white hover:bg-slate-800 transition">
          Tweet
        </button>
      </Link>
      <Link href={"/profile"}>
        <button className="w-40 h-10 rounded-full outline-2 outline-violet-500 outline text-white hover:bg-slate-800 transition ">
          Profile
        </button>
      </Link>
      <Link href={"/profile/settings"}>
        <button className="w-40 h-10 rounded-full outline-2 outline-violet-500 outline text-white hover:bg-slate-800 transition">
          Settings
        </button>
      </Link>
    </div>
  );
}
