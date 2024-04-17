import Southpark from "../assets/Southpark.mp4";
import "../index.css";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import MovieLists from "../components/movie-lists";
import Navbar from "../components/navbar";
import useMovies from "../hooks/useMovies";
import { useNavigate } from "react-router";
import { useCallback, useRef, useState } from "react";
import LoadingCards from "../components/loadingCards";
import { useSelector } from "react-redux";
import { RootState } from "../App/store";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function BrowsePage() {
  const [offset, setOffset] = useState<number>(0);
  const { data, loading, error } = useMovies(offset);
  const navigate = useNavigate();

  const observer = useRef<null | IntersectionObserver>(null);

  const { user, isLoading } = useSelector(
    (state: RootState) => state.user.value
  );

  console.log({ isLoading, user });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) return observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offset + 12);
          console.log("observing");
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );
  return (
    <div className="Browse-page">
      <Navbar />
      <video
        style={{ filter: "brightness(50%)" }}
        src={Southpark}
        className="w-100 h-100 object-contain transition duration-100"
        autoPlay
        muted
        loop
      ></video>
      <div className="Play-MoreInfo-btn-position d-flex flex-column gap-5">
        <div className="name-of-movie">
          <p className="text-white fs-1 fw-bold">South Park</p>
        </div>
        <div className="w-100 d-flex flex-row align-items-center gap-3">
          <button
            onClick={() => navigate("/browse/watch/403")}
            className="w-75 btn btn-light fs-4 fw-bold p-3 d-flex shadow"
          >
            <FaPlay className="w-50 mt-1" />
            Play
          </button>
          <button className="w-100 btn btn-secondary btn-secondary-back fs-4 fw-bold opacity-50 p-3 d-flex shadow">
            <IoMdInformationCircleOutline className="w-25 fs-3 text-white mt-1" />
            More Info
          </button>
        </div>
      </div>
      {error && (
        <p className="fs-1 fw-bolder text-danger d-flex justify-content-center">
          {error}
        </p>
      )}
      {data && <MovieLists movies={data} lastElementRef={lastElementRef} />}
      {loading ? <LoadingCards /> : null}
      {offset ? (
        <div className="d-flex justify-content-center">
          <button
            className="d-flex btn fs-1 mt-10"
            onClick={() => setOffset(offset + 24)}
          >
            <GrNext />
          </button>
        </div>
      ) : null}
    </div>
  );
}
