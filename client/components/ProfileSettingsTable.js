import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UpdateUser } from "../requests/requests";

export function ProfileSettingsTable() {
  let [isOpen, setIsOpen] = React.useState(false);
  let [formInput, setFormInput] = React.useState({
    endpoint: "",
    prevValue: "",
    input: "",
    raw_field_name: "",
  });

  function handleChange(event) {
    event.preventDefault();
    setFormInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(formInput);
  }

  function handleSubmit() {
    setIsOpen(false);
    UpdateUser({
      name: formInput.raw_field_name,
      old_value: formInput.prevValue,
      new_value: formInput.input,
    });
    setFormInput({
      endpoint: "",
      prevValue: "",
      input: "",
      raw_field_name: "",
    });
  }

  return (
    <div className="col-start-4 col-span-5">
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-2"></div>
                    <div className="mt-4">
                      {/* <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </button> */}
                      {!(
                        formInput.raw_field_name == "password" ||
                        formInput.raw_field_name == "email" ||
                        formInput.raw_field_name == "delete"
                      ) && (
                        <div>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Change {formInput.endpoint}
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            You want to change your {formInput.endpoint}, please
                            enter the new value
                          </p>
                          <form onSubmit={handleSubmit}>
                            <input
                              type="text"
                              name="input"
                              placeholder={formInput.endpoint}
                              onChange={handleChange}
                              value={formInput.input}
                            ></input>
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      )}
                      {(formInput.raw_field_name == "password" ||
                        formInput.raw_field_name == "email") && (
                        <div>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-white mb-2"
                          >
                            Change {formInput.endpoint}
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            You want to change your {formInput.endpoint}, please
                            enter the new value{" "}
                          </p>
                          <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
                          >
                            <input
                              type="text"
                              name="prevValue"
                              placeholder="PrevValue"
                              onChange={handleChange}
                              value={formInput.prevValue}
                            ></input>
                            <input
                              type="text"
                              name="input"
                              placeholder={formInput.endpoint}
                              onChange={handleChange}
                              value={formInput.input}
                            ></input>
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      )}
                      {formInput.raw_field_name == "delete" && (
                        <div>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Delete Profile
                          </Dialog.Title>
                          <p>Are u sure u want to delete your account?</p>
                          <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
                          >
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              DELETE
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className="text-white">
        <h1>Profile Settings</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center justify-between">
            <p>Change First_name</p>
            <button
              className="px-2 py-1 rounded-xl w-20 h-8 bg-slate-800 outline outline-2 outline-green-400 opacity-80 hover:bg-slate-600 transition"
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
          <div className="flex gap-3 items-center justify-between">
            <p>Change Last_name</p>
            <button
              className="px-2 py-1 rounded-xl w-20 h-8 bg-slate-800 outline outline-2 outline-green-400 opacity-80 hover:bg-slate-600 transition"
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
          <div className="flex gap-3 items-center justify-between">
            <p>Change Nickname</p>
            <button
              className="px-2 py-1 rounded-xl w-20 h-8 bg-slate-800 outline outline-2 outline-green-400 opacity-80 hover:bg-slate-600 transition"
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
          <div className="flex gap-3 items-center justify-between">
            <p>Change Email</p>
            <button
              className="px-2 py-1 rounded-xl w-20 h-8 bg-slate-800 outline outline-2 outline-green-400 opacity-80 hover:bg-slate-600 transition"
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
          <div className="flex gap-3 items-center justify-between">
            <p>Change Password</p>
            <button
              className="px-2 py-1 rounded-xl w-20 h-8 bg-slate-800 outline outline-2 outline-green-400 opacity-80 hover:bg-slate-600 transition"
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
          <div className="flex gap-3 items-center justify-between">
            <p>Delete Profile</p>
            <button
              className="px-2 py-1 rounded-xl w-20 h-8 bg-slate-800 outline outline-2 outline-red-400 opacity-80 hover:bg-slate-600 transition"
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
    </div>
  );
}
