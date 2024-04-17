import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { IoIosSearch, IoMdArrowDropdown } from "react-icons/io";
import { PiBellRinging } from "react-icons/pi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [changeColor, setChangeColor] = useState(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchActivation = () => {
    setSearchActive(!searchActive);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchActive(false);
    }
  };

  const handleChangeColor = () => {
    if (window.scrollY >= 1000) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleChangeColor);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleChangeColor);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`Navbar d-flex ${
        changeColor ? "Navbar-changed shadow" : "Navbar-background"
      }`}
    >
      <div className="nav-container d-flex flex-grow-1 gap-5 align-items-center p-5 pt-0">
        <div className="Logo d-flex">
          <span className="size-svg mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#F44336"
                d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"
              ></path>
            </svg>
          </span>
        </div>
        <div className="nav-left d-flex flex-grow-1 fs-5 gap-4 text-white mt-5">
          <Link to="/">Home</Link>
          <a href="">Series</a>
          <a href="">Films</a>
          <a href="">News & Popular</a>
          <a href="">My List</a>
          <a href="">Browse by Languages</a>
        </div>
        <div className="h-50 nav-right d-flex flex-row fs-5 gap-5 mt-5">
          <div className="text-white cursor-pointer d-flex flex-row-reverse relative align-items-center">
            <IoIosSearch onClick={handleSearchActivation} className="d-flex" />
            {searchActive && (
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "calc(1vw - 50%)" }}
                transition={{ duration: 1 }}
              >
                <input
                  id="search"
                  type="search"
                  className="rounded-full absolute right-10 bg-zinc-900 border-solid border-4 border-sky-500 p-1 duration delay-300 opacity-25"
                />
                <label htmlFor="" id="search"></label>
              </motion.div>
            )}
          </div>
          <div className="text-white">
            <PiBellRinging />
          </div>
          <div className="text-white">
            <IoMdArrowDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
