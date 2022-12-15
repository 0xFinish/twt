import { Navbar } from "../components/Navbar";
import { PersonalProfileTab } from "../components/PersonalProfileTab";

export default function Profile() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        <PersonalProfileTab></PersonalProfileTab>
      </div>
    </div>
  );
}
