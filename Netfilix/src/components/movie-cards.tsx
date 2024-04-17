import { FaPlay } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { Movie } from "../type";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const MovieCards = ({
  movie,
  lastElementRef,
}: {
  movie: Movie;
  lastElementRef: ((node: HTMLDivElement) => void) | null;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, duration, genre, id, thumbnailUrl, description } = movie;
  const navigate = useNavigate();

  return (
    <div
      ref={lastElementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-zinc-900 col-span relative h-[12vw] w-[24%]"
    >
      <img
        src={thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
      "
      />

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 0.2 }}
          className="hovered-card w-[35vh] h-[20vh] absolute -left-4 transition delay-500"
          style={{ top: "-7rem" }}
        >
          <img
            src={thumbnailUrl}
            alt="Movie"
            draggable={false}
            className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-[40vh]
          h-[12vw]
        "
          />
          <div
            className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          "
          >
            <div className="flex flex-row items-center gap-3">
              <button
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                onClick={() => navigate(`/browse/watch/${id}`)}
              >
                <FaPlay className="text-black w-4 lg:w-6" />
              </button>
              <div className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                <FaCaretDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
              </div>
            </div>
            <p className="text-white font-semibold mt-4 text-2xl">{title}</p>
            <p className="text-gray-400">{description}</p>
            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">{duration}</p>
            </div>
            <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
              <p>{genre}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MovieCards;
