import { useQuery } from "@tanstack/react-query"
import { CheckAuthRequest } from "../requests/requests";

export function PostList() {

    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ["posts"],
        queryFn: CheckAuthRequest,
      });

    return (
        <div>
            {isSuccess && <div>
                {data.ping}</div>}
        </div>
    )
}