import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTweetById, addComment, LikeTweet } from "../requests/requests";
import React from "react";

export function DetailedTweet({ id }) {
  let [comment, setComment] = React.useState("");

  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["tweetById"],
    queryFn: () => getTweetById(id),
  });

  const updateComments = useMutation(addComment, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries(["tweetById"]);
    },
  });

  const updateLikes = useMutation(LikeTweet, {
    onSuccess: () => {
      console.log("Invalidating...")
      queryClient.invalidateQueries(["tweetById"]);
    }
  })

  function handleChange(event) {
    event.preventDefault();
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateComments.mutate({ comment: { comment: comment }, id: id });
    setComment("");
  }

  function handleLike(event) {
    event.preventDefault()
    updateLikes.mutate({id: id})
  }

  return (
    <div>
      {isSuccess && (
        <div>
          {data.tweet.tweet}
          <p>Like:{data.tweet.likeAmount}</p>
          <p>Comments: </p>
          {data.comments.map((val, i) => {
            return (
              <div key={i}>
                <p key={i}>{val.comment}</p>
              </div>
            );
          })}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Comment"
          className="bg-green-200"
          name="comment"
          value={comment}
          onChange={handleChange}
        ></input>
        <button className="bg-red-200 p-1 m-2 rounded-lg border-2 border-rose-600">
          Comment
        </button>
        <button
          className="bg-red-200 p-1 m-2 rounded-lg border-2 border-blue-600"
          onClick={handleLike}
        >
          Like
        </button>
      </form>
    </div>
  );
}
