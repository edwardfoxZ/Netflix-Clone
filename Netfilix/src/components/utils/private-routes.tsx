import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../App/store";
import LoadingPage from "../../pages/loading-page";

const PrivateRoutes = () => {
  const { user, isLoading } = useSelector(
    (state: RootState) => state.user.value
  );

  if (isLoading) return <LoadingPage />;

  return user ? <Outlet /> : <Navigate to="/log-in" />;
};

export default PrivateRoutes;
