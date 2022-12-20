import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTweetById, addComment, LikeTweet } from "../requests/requests";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { UpdateTweet } from "../requests/requests";

export function DetailedTweet({ id }) {
  let [comment, setComment] = React.useState("");
  let [isOpen, setOpen] = React.useState(false);
  let [editedTweet, setEditedTweet] = React.useState("");
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
      console.log("Invalidating...");
      queryClient.invalidateQueries(["tweetById"]);
    },
  });

  const updateTweet = useMutation(UpdateTweet, {
    onSuccess: () => {
      console.log("Invalidating...")
      queryClient.invalidateQueries(["tweetById"])
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
    event.preventDefault();
    updateLikes.mutate({ id: id });
  }

  function handleEditTweet(event) {
    event.preventDefault();
    updateTweet.mutate({ tweet_id: id, new_tweet: editedTweet })
    setEditedTweet("")
    setOpen(false);
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
        <button
          className="bg-red-200 p-1 m-2 rounded-lg border-2 border-blue-600"
          onClick={() => setOpen(true)}
        >
          Edit
        </button>
      </form>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update Tweet
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Input new tweet pls</p>
                  </div>
                  <div className="mt-4">
                    <form onSubmit={handleEditTweet}>
                      <input
                        type="text"
                        placeholder="Tweet"
                        value={editedTweet}
                        name="editedTweet"
                        onChange={(event) => setEditedTweet(event.target.value)}
                      ></input>
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Update Tweet
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
