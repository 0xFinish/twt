import { CreateNewTweet } from "../components/CreateNewTweet";
import { Navbar } from "../components/Navbar";

export default function CreateTweet() {
    return (
        <div>
        <Navbar></Navbar>
        <div className="mt-16">
          <CreateNewTweet></CreateNewTweet>
        </div>
      </div>
    )
}