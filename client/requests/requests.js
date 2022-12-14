import axios from "axios";

const link = "http://localhost:8080";

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
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  let response = await axios.get(link + "/auth", config);
  console.log(response);
  return response.data;
}

export async function CreateNewTweetRequest(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  console.log(data);
  let response = await axios.post(link + "/createNewTweet", data, config);
  return response.data;
}
