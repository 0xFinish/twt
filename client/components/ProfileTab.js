import { useQuery } from "@tanstack/react-query";
import { GetUserTweets, GetUserInfo } from "../requests/requests";
import { Tweet } from "./Tweet";


export function ProfileTab() {
  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: GetUserInfo,
  });

  const userTweets = useQuery({
    queryKey: ["userTweets"],
    queryFn: GetUserTweets,
  });

  return (
    <div>
      {userInfo.isSuccess && (
        <div>
          <p>Hi{userInfo.data.first_name}</p>
          <p>How are you doing?</p>
        </div>
      )}
      {userTweets.isSuccess && <div>{userTweets.data.map((val, i) => {
        return <Tweet key={i} tweet = {val.tweet}></Tweet>
      })}</div>}
    </div>
  );
}
