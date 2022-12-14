import { LoginForm } from "../components/LoginForm";
import { Navbar } from "../components/Navbar";
import { Tweet } from "../components/Tweet";
import { TweetList } from "../components/TweetList";

export default function Login() {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <div className="mt-16">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
