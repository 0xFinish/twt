import { DetailedTweet } from "../../components/DetailedTweet";
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

export default function TweetById() {
  const router = useRouter();
  const id = router.query.id;
  console.log("IDIDID");
  console.log(id);
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16 grid grid-cols-12">
        {id !== undefined && <DetailedTweet id={id}></DetailedTweet>}
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}
