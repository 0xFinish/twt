import { ProfileTabByNickname } from "../../components/ProfileTabByNickname";
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

export default function ProfileView() {
  const router = useRouter();
  const nick_name = router.query.nick_name;

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-12 grid grid-cols-12 ">
        {nick_name !== undefined && (
          <div className="col-start-4 col-span-5">
            <ProfileTabByNickname nick_name={nick_name}></ProfileTabByNickname>
            <Sidebar></Sidebar>
          </div>
        )}
      </div>
    </div>
  );
}
