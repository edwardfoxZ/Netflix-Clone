import { Movie } from "../type";
import MovieCards from "./movie-cards";

export default function MovieLists({
  movies,
  lastElementRef,
}: {
  movies: Movie[];
  lastElementRef: (node: HTMLDivElement) => void;
}) {
  return (
    <div className="px-12 mt-4 space-y-8">
      <p className="text-black text-2xl font-semibold text-5xl">
        Popular Shows
      </p>
      <div>
        <div className="flex flex-wrap gap-2 justify-between">
          {movies.map((movie, index) => (
            <MovieCards
              key={movie.id}
              movie={movie}
              lastElementRef={
                movies.length === index + 1 ? lastElementRef : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
