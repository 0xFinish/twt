import { Navbar } from "../components/Navbar";
import { PersonalProfileTab } from "../components/PersonalProfileTab";
import { Sidebar } from "../components/Sidebar";
import Link from "next/link";

export default function Profile() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16 grid grid-cols-12">
        <PersonalProfileTab></PersonalProfileTab>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}
