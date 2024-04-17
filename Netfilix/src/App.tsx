import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet } from "react-router";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
