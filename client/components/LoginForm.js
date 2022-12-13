import React from "react";
import { LoginRequest } from "../requests/requests";
import { useMutation } from "@tanstack/react-query";

export function LoginForm() {
  let [formInput, setFormInput] = React.useState({
    email: "",
    password: "",
  });

  const updateAuthorization = useMutation(LoginRequest, {
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
      email: "",
      password: "",
    });
  }

  return (
    <div className="">
      <form className="flex flex-col gap-2 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input 
        className="bg-red-200 rounded-full"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={formInput.email}
        />
        <input
        className="bg-red-200 rounded-full"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={formInput.password}
        />
        <button className="bg-blue-200 shadow-xl rounded-xl">Login</button>
      </form>
    </div>
  );
}
