import { LoginForm } from "../components/LoginForm";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { PostList } from "../components/PostList";

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
