import { Navbar } from "../components/Navbar";
import { Tweet } from "../components/Tweet";
import { SignupForm } from "../components/SignupForm";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}
