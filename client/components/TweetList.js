import { useQuery } from "@tanstack/react-query";
import { GetTweets } from "../requests/requests";
import { Tweet } from "./Tweet";

export function TweetList() {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: GetTweets,
  });

  return (
    <div className="col-start-4 col-span-6 border border-t-0"> 
      {isSuccess && (
        <div className="flex flex-col divide-y divide-white">
          {data.length > 0 ? data.map((val, i) => {
            return <Tweet key={i} tweet={val.tweet} ID={val.ID} nickname={val.user_nickname} date={val.CreatedAt}></Tweet>;
          }) : "It looks like u are not logged in"}
        </div>
      )}
    </div>
  );
}
