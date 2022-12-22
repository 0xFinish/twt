import { Navbar } from "../../components/Navbar";
import { ProfileSettingsTable } from "../../components/ProfileSettingsTable";
import { Sidebar } from "../../components/Sidebar";

export default function ProfileSettings() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-12 grid grid-cols-12">
        <ProfileSettingsTable></ProfileSettingsTable>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}
