import { Navbar } from "../components/Navbar";
import { PersonalProfileTab } from "../components/PersonalProfileTab";
import Link from "next/link";

export default function Profile() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        <Link href={"/profile/settings"}><button className="px-2 py-1 rounded-xl bg-red-300">Settings</button></Link>
        <PersonalProfileTab></PersonalProfileTab>
      </div>
    </div>
  );
}
