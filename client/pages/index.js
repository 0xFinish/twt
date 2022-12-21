import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Tweet } from "../components/Tweet";
import { TweetList } from "../components/TweetList";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-12 grid grid-cols-12">
        <Sidebar></Sidebar>
        <TweetList></TweetList>
      </div>
    </div>
  );
}
