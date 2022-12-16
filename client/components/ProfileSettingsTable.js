import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export function ProfileSettingsTable() {
  let [isOpen, setIsOpen] = React.useState(false);
  let [formInput, setFormInput] = React.useState({
    endpoint: "",
    prevValue: "",
    input: "",
    raw_field_name: "",
  });

  function handleSubmit() {}

  return (
    <div>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            open={isOpen}
            onClose={() => setIsOpen(false)}
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
                      Change {formInput.endpoint}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You want to change your {formInput.endpoint}, please
                        enter the new value{" "}
                      </p>
                    </div>

                    <div className="mt-4">
                      {/* <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </button> */}
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder={formInput.endpoint}
                        ></input>
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Got it, thanks!
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
      <h1>Profile Settings</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center ">
          <p>Change First_name</p>
          <button
            className="bg-red-200 px-2 py-1 rounded-xl"
            onClick={() => {
              setIsOpen(true);
              setFormInput((prev) => {
                prev.endpoint = "First Name";
                prev.raw_field_name = "first_name";
                return prev;
              });
            }}
          >
            Change
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <p>Change Last_name</p>
          <button
            className="bg-red-200 px-2 py-1 rounded-xl"
            onClick={() => {
              setIsOpen(true);
              setFormInput((prev) => {
                prev.endpoint = "Last Name";
                prev.raw_field_name = "last_name";
                return prev;
              });
            }}
          >
            Change
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <p>Change Nickname</p>
          <button
            className="bg-red-200 px-2 py-1 rounded-xl"
            onClick={() => {
              setIsOpen(true);
              setFormInput((prev) => {
                prev.endpoint = "Nickname";
                prev.raw_field_name = "Nickname";
                return prev;
              });
            }}
          >
            Change
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <p>Change Email</p>
          <button
            className="bg-red-200 px-2 py-1 rounded-xl"
            onClick={() => {
              setIsOpen(true);
              setFormInput((prev) => {
                prev.endpoint = "Email";
                prev.raw_field_name = "email";
                return prev;
              });
            }}
          >
            Change
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <p>Change Password</p>
          <button
            className="bg-red-200 px-2 py-1 rounded-xl"
            onClick={() => {
              setIsOpen(true);
              setFormInput((prev) => {
                prev.endpoint = "Password";
                prev.raw_field_name = "password";
                return prev;
              });
            }}
          >
            Change
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <p>Delete Profile</p>
          <button
            className="bg-red-800 px-2 py-1 rounded-xl text-white"
            onClick={() => {
              setIsOpen(true);
              setFormInput((prev) => {
                prev.endpoint = "Delete Profile";
                prev.raw_field_name = "delete";
                return prev;
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
