import React from "react";
import { CreateNewTweetRequest } from "../requests/requests";

export function CreateNewTweet() {
  let [tweet, setTweet] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    CreateNewTweetRequest({"tweet" : tweet})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea className="bg-red-200 p-4"
          onChange={(event) => setTweet(event.target.value)}
          value={tweet}
          name="tweet"
        ></textarea>
        <button className="bg-blue-300 rounded-full">Tweet</button>
      </form>
    </div>
  );
}
