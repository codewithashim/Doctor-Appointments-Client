import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/Store";
import { clearAuthState } from "@/Store/authSlice";
import { Button } from "@/Components/Global/Button/Button";
import { MainLogo } from "@/assets";

const NavItems = (
  <>
    <li className="flex">
      <Link
        href="/"
        className="text-[#211f1f] hover:text-[#19D3AE] duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
      >
        Home
      </Link>
    </li>
    <li className="flex">
      <Link
        href="/appointment"
        className="text-[#211f1f] hover:text-[#19D3AE] duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
      >
        Appointment
      </Link>
    </li>
    <li className="flex">
      <Link
        href="/contact"
        className="text-[#211f1f] hover:text-[#19D3AE] duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
      >
        Contact Us
      </Link>
    </li>
  </>
);

const Navbar = () => {
  const { name, profile } = useAppSelector((store) => store.auth);
  const isLogin = useAppSelector((state) => state.auth.authState);
  const [open, setOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    dispatch(clearAuthState());
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getFirstLetter = (name: string): string => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <header
      className={`py-4 bg-[#FFFFFF] shadow dark:text-gray-100 ${
        isScrolled
          ? "bg-[#4544446c] backdrop-blur-md"
          : "backdrop-blur-md bg-transparent"
      } sticky top-0 z-50`}
    >
      <div className="container flex items-center justify-between">
        <div>
          <Link
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center"
          >
            <Image
              src={MainLogo}
              alt=""
              width={60}
              height={60}
              className="w-[60px]"
            />
          </Link>
        </div>
        <div>
          <ul className="items-stretch hidden space-x-4 gap-3 lg:flex">
            {NavItems}
          </ul>
        </div>
        <div className="flex items-center gap-3 relative">
          {isLogin ? (
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-[#19D3AE] flex items-center justify-center text-white font-semibold cursor-pointer"
                onClick={handleDropdownToggle}
              >
                {isClient ? (
                  profile ? (
                    <Image
                      src={profile}
                      alt={name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    getFirstLetter(name)
                  )
                ) : (
                  "Loading"
                )}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-lg">
                  <ul>
                    <li>
                      <Link
                        href="/dashboard"
                        className="px-4 py-2 text-[#211f1f] hover:bg-gray-100 cursor-pointer flex items-center"
                      >
                        <FaUserCircle className="mr-2" /> Dashboard
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 text-[#211f1f] hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={handleSignOut}
                    >
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Button title={"Login"} link="/auth/login" />
          )}

          <button onClick={() => setOpen(!open)} className="p-4 ml-4 lg:hidden">
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 dark:text-[#19D3AE]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 dark:text-[#19D3AE]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="absolute lg:hidden px-8 pb-8 bg-[#19D3AE] w-full left-0 top-24">
            <ul className="flex flex-col py-4 gap-3 lg:flex">{NavItems}</ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
