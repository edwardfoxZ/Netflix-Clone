import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainPage from "./pages/main-page.tsx";
import LogInCard from "./pages/login-page.tsx";
import PaymentPage from "./pages/payment-page.tsx";
import WatchPage from "./pages/watch-page.tsx";
import BrowsePage from "./pages/browse-page.tsx";
import { Provider } from "react-redux";
import { store } from "./App/store.ts";
import PrivateRoutes from "./components/utils/private-routes.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/log-in" element={<LogInCard />} />
      <Route path="/payment-page" element={<PaymentPage />} />
      <Route path="/browse" element={<PrivateRoutes />}>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/watch/:id" element={<WatchPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
