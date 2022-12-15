import React from "react";
import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "../requests/requests";
export function SignupForm() {
  let [formInput, setFormInput] = React.useState({
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    password: "",
  });

  const updateAuthorization = useMutation(SignupRequest, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries(["posts"]);
    },
  });

  function handleInputChange(event) {
    setFormInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateAuthorization.mutate({ formData: formInput });
    setFormInput({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="">
      <form
        className="flex flex-col gap-2 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-red-200 rounded-full px-4 placeholder:text-red-400"
          type="text"
          name="first_name"
          onChange={handleInputChange}
          value={formInput.first_name}
          placeholder="First Name"
        />
        <input
          className="bg-red-200 rounded-full px-4 placeholder:text-red-400 "
          type="text"
          name="last_name"
          onChange={handleInputChange}
          value={formInput.last_name}
          placeholder="Last Name"
        />
        <input
          className="bg-red-200 rounded-full px-4 placeholder:text-red-400 "
          type="text"
          name="nick_name"
          onChange={handleInputChange}
          value={formInput.nick_name}
          placeholder="Nickname"
        />
        <input
          className="bg-red-200 rounded-full px-4 placeholder:text-red-400"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={formInput.email}
          placeholder="Email"
        />
        <input
          className="bg-red-200 rounded-full px-4 placeholder:text-red-400"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={formInput.password}
          placeholder="Password"
        />
        <button className="bg-blue-200 shadow-xl rounded-xl">Signup</button>
      </form>
    </div>
  );
}
