import Link from "next/link";
import { SignOut } from "../requests/requests";

export function Navbar() {
  return (
    <div className="w-full fixed top-0 h-12 flex align-middle items-center justify-between px-6  opacity-80 bg-gradient-to-br from-slate-800 to-slate-800">
      <Link href={"/"} className="text-center">
        <p className="text-violet-400 font-abril text-2xl font-extrabold">
          Soci<span className="text-green-300">Ly</span>
        </p>
      </Link>
      <div className="flex gap-2 items-center">
        <Link href={"/login"}>
          <button className="w-20 bg-green-300">Login</button>
        </Link>
        <Link href={"/signup"}>
          <button className="w-20 bg-violet-400">Signup</button>
        </Link>
        <button
          className="bg-red-400"
          onClick={async () => {
            await SignOut()
            location.reload();
          }}
        >
          SignOut
        </button>
      </div>
    </div>
  );
}
