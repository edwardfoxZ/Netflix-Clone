import { useParams } from "react-router";
import useMovie from "../hooks/useMovie";
import BackBu from "../components/Buttons/back-button";
import LoadingPage from "./loading-page";

export default function WatchPage() {
  const params = useParams() as { id: string };
  const { data, error, loading } = useMovie(params.id);

  if (loading) return <LoadingPage />;
  if (error || !data) return <p>{error}</p>;

  const { title, videoUrl } = data;

  return (
    <div className="Watch-page w-100 h-100">
      <nav className="trailer-name w-100 navbar bg-black opacity-75 position-fixed z-3">
        <p className="text-white fs-1 p-3 d-flex flex-row align-items-center gap-3">
          <BackBu to="/browse" className="" />
          Watch: <span>{title}</span> !
        </p>
      </nav>
      <iframe width="100%" height="100%" src={videoUrl}></iframe>
    </div>
  );
}
