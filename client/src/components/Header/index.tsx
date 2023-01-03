import React from "react";
import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">ChapterX</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>
            <Link
              to="/orders"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Orders
            </Link>
        </div>
      </div>
    </Popover>
  );
}
