import axios from "axios";

const link = "http://localhost:8080";
const noJWTMessage = {
  message: "U are not authorized please login",
};

export async function getPostsRequest() {
  console.log("getPosts");
  let response = await axios.get(link);

  console.log(response.data);
  return response.data;
}

export async function LoginRequest(data) {
  console.log(data.formData);
  let response = await axios.post(link + "/login", data.formData);
  console.log(response.data);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
}

export async function SignupRequest(data) {
  console.log(data.formData);
  let response = await axios.post(link + "/signup", data.formData);
  console.log(response.data);
}

export async function CheckAuthRequest(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(link + "/auth", config);
  console.log(response);
  return response.data;
}

export async function CreateNewTweetRequest(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  console.log(data);
  let response = await axios.post(link + "/createNewTweet", data, config);
  return response.data;
}

export async function GetTweets() {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(link + "/getAllTweets", config);
  return response.data;
}

export async function GetUserInfo() {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(link + "/getUserInfo", config);
  console.log(response.data);
  return response.data;
}

export async function GetUserTweets() {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(link + "/getUserTweets", config);
  console.log(response.data);
  return response.data;
}

export async function getTweetById(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  console.log(data);
  let response = await axios.get(link + `/getTweetById?id=${data}`, config);
  console.log(response.data);
  return response.data;
}

export async function addComment(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  console.log(data);
  let response = await axios.post(
    link + `/commentTweet?id=${data.id}`,
    data.comment,
    config
  );
  console.log(response.data);
  return response.data;
}

export async function GetUserInfoByNickname(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(
    link + `/getUserProfileByNickName?nick_name=${data}`,
    config
  );
  console.log(response.data);
  return response.data;
}

export async function GetUserTweetsByNickname(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(
    link + `/getUserTweetsByNickname?nick_name=${data}`,
    config
  );
  console.log(response.data);
  return response.data;
}

export async function LikeTweet(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.post(
    link + `/likeTweet?id=${data.id}`,
    {},
    config
  );
  return response.data;
}

export async function UpdateUser(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.put(link + "/updateUser", data, config);
  console.log(response.data);
  return response.data;
}

export async function UpdateTweet(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.post(
    link + `/updateTweet?tweet_id=${data.tweet_id}&new_tweet=${data.new_tweet}`,
    {},
    config
  );
  console.log(response.data);
  return response.data;
}

export async function SubscribeRequest(data) {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  console.log(data.id);
  let response = await axios.post(
    link + `/subscribe?user_id=${data.id}`,
    {},
    config
  );
  console.log(response.data);
  return response.data;
}

export async function SignOut() {
  if (!localStorage.getItem("user")) {
    return noJWTMessage;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.post(link + `/signout`, {}, config);
  console.log(response.data);
  localStorage.removeItem("user");
  sessionStorage.clear();
  return response.data;
}
