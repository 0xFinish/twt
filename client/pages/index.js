import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { PostList } from "../components/PostList";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        <PostList></PostList>
      </div>
    </div>
  );
}
