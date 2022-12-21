import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetUserInfoByNickname,
  GetUserTweetsByNickname,
} from "../requests/requests";
import { SubscribeRequest } from "../requests/requests";
import { Tweet } from "./Tweet";

export function ProfileTabByNickname({ nick_name }) {
  const queryClient = useQueryClient();
  const userInfo = useQuery({
    queryKey: ["userInfoByNickname"],
    queryFn: () => GetUserInfoByNickname(nick_name),
  });

  const userTweets = useQuery({
    queryKey: ["userTweetsByNickname"],
    queryFn: () => GetUserTweetsByNickname(nick_name),
  });

  const mutateUserInfo = useMutation(SubscribeRequest, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries(["userInfoByNickname"]);
    },
  });

  function handleSubscribe(event) {
    event.preventDefault();
    mutateUserInfo.mutate({ id: userInfo.data.ID });
  }

  return (
    <div>
      <div>
        {userInfo.isSuccess && (
          <div className="text-white">
            <p>Hi{userInfo.data.first_name}</p>
            <p>{userInfo.data.followers_count} FOLLOWERS COUNT!</p>
            <p>How are you doing?</p>
            <button
              className="bg-red-200 px-2 py-1 border-2 border-blue-400 rounded-xl mx-4"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        )}
        {userTweets.isSuccess && (
          <div className="flex flex-col gap-2">
            {userTweets.data.map((val, i) => {
              return <Tweet key={i} tweet={val.tweet} ID={val.ID}></Tweet>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
