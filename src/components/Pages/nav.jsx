import { useContext, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";

import { assets } from "../data/assets/frontend_assets/assets";
import Context from "../../Config/Config";

const Nav = () => {
  const { setinput, cart_data } = useContext(Context);

  const [menuOpen, setMenuOpen] = useState(false);

  const Total_products = cart_data.length;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="h-[80px] md:h-[100px] w-full px-4 flex justify-between items-center bg-white shadow-sm relative">

        {/* LOGO */}
        <div>
          <img
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-10 lg:h-14"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link
            to="/home"
            className="hover:text-pink-500 duration-200"
          >
            HOME
          </Link>

          <Link
            to="/about"
            className="hover:text-pink-500 duration-200"
          >
            ABOUT
          </Link>

          <Link
            to="/contact"
            className="hover:text-pink-500 duration-200"
          >
            CONTACT
          </Link>

          <Link
            to="/collections"
            className="hover:text-pink-500 duration-200"
          >
            COLLECTION
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

       

          {/* AUTH */}
          <div className="hidden md:block">
            <SignedIn>
              <SignOutButton>
                <GoSignOut
                  size={22}
                  className="cursor-pointer hover:text-pink-500 duration-200"
                />
              </SignOutButton>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <IoPersonOutline
                  size={22}
                  className="cursor-pointer hover:text-pink-500 duration-200"
                />
              </SignInButton>
            </SignedOut>
          </div>

          {/* CART */}
          <div className="relative">
            <Link to="/cart">
              <FaCartShopping
                size={22}
                className="cursor-pointer hover:text-pink-500 duration-200"
              />
            </Link>

            {Total_products > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  text-[11px]
                  h-[18px]
                  w-[18px]
                  rounded-full
                  flex
                  justify-center
                  items-center
                "
              >
                {Total_products}
              </span>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="block md:hidden">
            {menuOpen ? (
              <ImCross
                size={18}
                onClick={toggleMenu}
                className="cursor-pointer"
              />
            ) : (
              <TiThMenu
                size={22}
                onClick={toggleMenu}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`
          fixed
          top-[80px]
          left-0
          h-screen
          w-[220px]
          bg-white
          shadow-lg
          p-5
          duration-300
          z-50
          md:hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search here..."
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-2
            outline-none
            focus:border-black
          "
          onChange={(e) => setinput(e.target.value)}
        />

        {/* MENU LINKS */}
        <div className="flex flex-col mt-6 gap-5 font-medium">

          <Link
            to="/home"
            onClick={toggleMenu}
            className="hover:text-pink-500 duration-200 border-b pb-2"
          >
            HOME
          </Link>

          <Link
            to="/about"
            onClick={toggleMenu}
            className="hover:text-pink-500 duration-200 border-b pb-2"
          >
            ABOUT
          </Link>

          <Link
            to="/contact"
            onClick={toggleMenu}
            className="hover:text-pink-500 duration-200 border-b pb-2"
          >
            CONTACT
          </Link>

          <Link
            to="/collections"
            onClick={toggleMenu}
            className="hover:text-pink-500 duration-200 border-b pb-2"
          >
            COLLECTION
          </Link>

          {/* MOBILE AUTH */}
          <div className="mt-4">

            <SignedIn>
              <SignOutButton>
                <button className="flex items-center gap-2 hover:text-pink-500">
                  <GoSignOut />
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 hover:text-pink-500">
                  <IoPersonOutline />
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;