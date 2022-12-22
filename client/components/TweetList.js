import { useQuery } from "@tanstack/react-query";
import { GetTweets } from "../requests/requests";
import { Tweet } from "./Tweet";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import Link from "next/link";

export function TweetList() {
  let [isOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: GetTweets,
  });

  React.useEffect(() => {
    if (isSuccess) {
      console.log(data.length);
      if (data.message === "U are not authorized please login") {
        openModal();
      }
    }
  }, [isSuccess, data]);

  return (
    <div className="col-start-4 col-span-6">
      {isSuccess && !data.message && (
        <div className="flex flex-col divide-y divide-white">
          {data.length > 0 &&
            data.map((val, i) => {
              return (
                <Tweet
                  key={i}
                  tweet={val.tweet}
                  ID={val.ID}
                  nickname={val.user_nickname}
                  date={val.CreatedAt}
                ></Tweet>
              );
            })}
        </div>
      )}
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
                    Authorization Failed
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please login or signup
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between mx-4">
                    <Link href="/login">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Login
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Signup
                      </button>
                    </Link>
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
