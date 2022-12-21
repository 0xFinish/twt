import Link from "next/link";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreateNewTweetRequest } from "../requests/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function Sidebar() {

    const queryClient = useQueryClient()

  let [isOpen, setOpen] = React.useState(false);

  let [tweet, setTweet] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    closeModal()
    createNewTweetMutation.mutate({ tweet: tweet });
  }

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }
  
  const createNewTweetMutation = useMutation(CreateNewTweetRequest, {
    onSuccess: () => {
        console.log("Invalidating...")
        queryClient.invalidateQueries(["tweets"])
    }
  })

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <textarea
                      className="bg-red-200 p-4"
                      onChange={(event) => setTweet(event.target.value)}
                      value={tweet}
                      name="tweet"
                    ></textarea>
                    <button className="bg-blue-300 rounded-full">Tweet</button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="col-span-2 flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2">
        <button
          className="w-40 h-10 rounded-full outline-2 outline-violet-500 outline text-white hover:bg-slate-800 transition"
          onClick={openModal}
        >
          Tweet
        </button>
        <Link href={"/profile"}>
          <button className="w-40 h-10 rounded-full outline-2 outline-violet-500 outline text-white hover:bg-slate-800 transition ">
            Profile
          </button>
        </Link>
        <Link href={"/profile/settings"}>
          <button className="w-40 h-10 rounded-full outline-2 outline-violet-500 outline text-white hover:bg-slate-800 transition">
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
}
