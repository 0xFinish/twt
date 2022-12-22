import Link from "next/link";
import { SignOut } from "../requests/requests";
import React from "react";
import { useRouter } from "next/router";

export function Navbar() {

  const router = useRouter()

  let [loggedIn, setLoggedIn] = React.useState(false)
  React.useEffect(() => {
    if (window !== "undefined") {
      if (localStorage.getItem("user")) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }
  }, [loggedIn])

  return (
    <div className="w-full fixed top-0 h-12 flex align-middle items-center justify-between px-6  opacity-80 bg-gradient-to-br from-slate-800 to-slate-800">
      <Link href={"/"} className="text-center">
        <p className="text-violet-400 font-abril text-2xl font-extrabold">
          Soci<span className="text-green-300">Ly</span>
        </p>
      </Link>
      <div className="flex gap-2 items-center">
        <Link href={"/login"}>
          <button className="w-20 bg-slate-700 rounded-full text-white outline outline-2 outline-green-300 hover:bg-slate-600 transition">Login</button>
        </Link>
        {!loggedIn ? (
          <Link href={"/signup"}>
            <button className="w-20 bg-slate-700 text-white outline outline-2 outline-blue-300 rounded-full hover:bg-slate-600 transition">Signup</button>
          </Link>
        ) : (
          <button
            className=" w-20 bg-slate-700 text-white outline outline-2 outline-red-400 rounded-full hover:bg-slate-600 transition"
            onClick={async () => {
              await SignOut();
              router.push("/login")
            }}
          >
            SignOut
          </button>
        )}
      </div>
    </div>
  );
}
