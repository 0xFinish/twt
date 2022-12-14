import { Navbar } from "../components/Navbar";
import { Tweet } from "../components/Tweet";
import { TweetList } from "../components/TweetList";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        <TweetList></TweetList>
      </div>
    </div>
  );
}
