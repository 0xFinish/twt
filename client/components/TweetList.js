import { useQuery } from "@tanstack/react-query";
import { GetTweets } from "../requests/requests";
import { Tweet } from "./Tweet";

export function TweetList() {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: GetTweets,
  });

  return (
    <div>
      {isSuccess && (
        <div>
          {data.map((val, i) => {
            return <Tweet key={i} tweet={val.tweet}></Tweet>;
          })}
        </div>
      )}
    </div>
  );
}
