import React from "react";
import { LoginRequest } from "../requests/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/router'

export function LoginForm() {

  const router = useRouter()

  const queryClient = useQueryClient()

  let [formInput, setFormInput] = React.useState({
    email: "",
    password: "",
  });

  const updateAuthorization = useMutation(LoginRequest, {
    onSuccess: () => {
      console.log("Invalidating...");
      queryClient.invalidateQueries(["posts"]);
      router.push('/')
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
        className="bg-gray-600 rounded-full px-4 h-8"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={formInput.email}
        />
        <input
        className="bg-gray-600 rounded-full px-4 h-8"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={formInput.password}
        />
        <button className="bg-blue-300 shadow-xl rounded-xl h-10 w-36 self-center m-2 font-bold text-lg border-4 border-white">Login</button>
      </form>
    </div>
  );
}
