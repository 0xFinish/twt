import { useQuery } from "@tanstack/react-query";
import { GetUserInfoByNickname, GetUserTweetsByNickname } from "../requests/requests";
import { Tweet } from "./Tweet";

export function ProfileTabByNickname({nick_name}) {

    const userInfo = useQuery({
        queryKey: ["userInfoByNickname"],
        queryFn: () => GetUserInfoByNickname(nick_name),
      });
    
      const userTweets = useQuery({
        queryKey: ["userTweetsByNickname"],
        queryFn: () => GetUserTweetsByNickname(nick_name),
      });

    return(
        <div>
            <div>
      {userInfo.isSuccess && (
        <div>
          <p>Hi{userInfo.data.first_name}</p>
          <p>How are you doing?</p>
        </div>
      )}
      {userTweets.isSuccess && <div className="flex flex-col gap-2">{userTweets.data.map((val, i) => {
        return <Tweet key={i} tweet = {val.tweet} ID={val.ID}></Tweet>
      })}</div>}
    </div>
        </div>
    )
}