import { useQuery } from "@tanstack/react-query";
import { GetTweets } from "../requests/requests";
import { Tweet } from "./Tweet";

export function TweetList() {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: GetTweets,
  });

  return (
    <div className="col-start-4 col-span-6"> 
      {isSuccess && (
        <div className="flex flex-col gap-2 max-w-md my-10">
          {data.map((val, i) => {
            return <Tweet key={i} tweet={val.tweet} ID={val.ID} nickname={val.user_nickname}></Tweet>;
          })}
        </div>
      )}
    </div>
  );
}
