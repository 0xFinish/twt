import { useQuery } from "@tanstack/react-query";
import { getTweetById } from "../requests/requests";

export function DetailedTweet() {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["tweetById"],
    queryFn: () => getTweetById(),
  });

  return <div>{isSuccess && <div>{data}</div>}</div>;
}
