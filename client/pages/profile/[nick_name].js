import { ProfileTabByNickname } from "../../components/ProfileTabByNickname";
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";

export default function ProfileView() {
  const router = useRouter();
  const nick_name = router.query.nick_name;

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        {nick_name !== undefined && (
          <ProfileTabByNickname nick_name={nick_name}></ProfileTabByNickname>
        )}
      </div>
    </div>
  );
}
