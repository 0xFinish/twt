import { Navbar } from "../components/Navbar";
import { ProfileTab } from "../components/ProfileTab";

export default function Profile() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        <ProfileTab></ProfileTab>
      </div>
    </div>
  );
}
