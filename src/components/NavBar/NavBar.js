import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const adminLinks = [
  { route: "View Books", path: "/books/view" },
  { route: "Add New Book", path: "/books/new" },
  { route: "View Issued Books", path: "/books/issued" },
];

const userLinks = [
  { route: "Browse Books", path: "/books/browse" },
  { route: "View Rented Books", path: "/books/rented" },
];

function Navbar() {
  const { user, onSignOut } = useContext(GlobalContext);

  return (
    <Disclosure as="nav" className="bg-blue-900 border-b">
      {({ open }) => (
        <>
          <div className="px-0 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-14">
              <div className="flex-1 flex items-center justify-start">
                <div className="flex items-center mr-2">
                  <Link
                    to="/home"
                    className="text-xs sm:text-base md:text-2xl font-medium text-decoration-none whitespace-nowrap text-emerald-500"
                  >
                    <i className="fa fa-book" aria-hidden="true"></i> Book Buddy
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex gap-x-2 ml-1 sm:ml-3 md:ml-5">
                  <Link to="/home" className="text-white text-xs md:text-base">
                    Home
                  </Link>
                </div>
                <div className="right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="ml-1 sm:ml-3 md:ml-5 relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full">
                        <div className="flex items-center gap-x-1 md:gap-x-2 text-white">
                          <span className="sr-only">Open Books menu</span>
                          <span className="text-xs md:text-base ">Books</span>
                          <i
                            className="hidden sm:block pt-1 fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-md bg-white py-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex flex-row gap-x-2">
                          <div>
                            {user.role === "admin"
                              ? adminLinks?.map((link) => {
                                  return (
                                    <Menu.Item key={link.route}>
                                      <Link
                                        to={`${link.path}`}
                                        className="block px-4 py-2 text-emerald-600 font-medium"
                                      >
                                        <span className="capitalize text-xs md:text-sm hover:font-bold">
                                          {link.route}
                                        </span>
                                      </Link>
                                    </Menu.Item>
                                  );
                                })
                              : userLinks?.map((link) => {
                                  return (
                                    <Menu.Item key={link.route}>
                                      <Link
                                        to={`${link.path}`}
                                        className="block px-4 py-2 text-emerald-600 font-medium"
                                      >
                                        <span className="capitalize text-xs md:text-sm hover:font-bold">
                                          {link.route}
                                        </span>
                                      </Link>
                                    </Menu.Item>
                                  );
                                })}
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                {/* <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="ml-1 sm:ml-3 md:ml-5 relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full ">
                        <div className="flex items-center gap-x-1 md:gap-x-2 text-white">
                          <span className="sr-only">Open write menu</span>
                          <span className="text-xs md:text-base">
                            Write
                          </span>
                          <i
                            className="hidden sm:block pt-1 fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/mystories/new`}
                            className="block px-4 py-2 text-gray-800 text-xs md:text-sm hover:font-bold hover:text-gray-900"
                          >
                            Create a new story
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to={`/mystories`}
                            className="block px-4 py-2 text-gray-800 text-xs md:text-sm hover:font-bold hover:text-gray-900"
                          >
                            My Stories
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div> */}
                <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="ml-1 sm:ml-3 md:ml-5 relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full ">
                        <div className="flex items-center gap-x-1 md:gap-x-2 text-white">
                          <span className="sr-only">Open user menu</span>
                          <i
                            className="fa fa-user-circle-o fa-2x"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="hidden sm:block pt-1 fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/user/profile/${user.user_id}`}
                            className="block px-4 py-2 text-emerald-600 font-medium capitalize text-xs md:text-sm hover:font-bold"
                          >
                            My Profile
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <div className="block px-4 py-2 text-emerald-600 font-medium capitalize text-xs md:text-sm hover:font-bold">
                            <button onClick={onSignOut}>Log out</button>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
