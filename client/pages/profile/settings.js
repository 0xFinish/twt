import { Navbar } from "../../components/Navbar";
import { ProfileSettingsTable } from "../../components/ProfileSettingsTable";

export default function ProfileSettings() {
  return (
    <div>
        <Navbar></Navbar>
      <div className="mt-16"><ProfileSettingsTable></ProfileSettingsTable></div>
    </div>
  );
}
