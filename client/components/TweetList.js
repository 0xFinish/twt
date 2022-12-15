import { useQuery } from "@tanstack/react-query";
import { GetTweets } from "../requests/requests";
import { Tweet } from "./Tweet";

export function TweetList() {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: GetTweets,
  });

  return (
    <div>
      {isSuccess && (
        <div className="flex flex-col gap-2 mx-auto max-w-md my-10">
          {data.map((val, i) => {
            return <Tweet key={i} tweet={val.tweet} ID={val.ID}></Tweet>;
          })}
        </div>
      )}
    </div>
  );
}
