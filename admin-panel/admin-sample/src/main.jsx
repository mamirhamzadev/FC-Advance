import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";

const queryClient = new QueryClient();

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { setProfile } from "./redux/actions/profile.js";

const root = createRoot(document.getElementById("root"));

axios.defaults.baseURL = "http://localhost:3000/";
const publicRoutes = ["send-otp", "verify-otp"];
axios.interceptors.request.use((config) => {
  if (!publicRoutes.some((route) => config.url?.includes(route)))
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res?.data?.data?.profile)
        store.dispatch(setProfile(res?.data?.data?.profile));
      else if (!publicRoutes.some((route) => res.config.url?.includes(route))) {
        window.location.replace("/auth");
        return Promise.reject(axios.Cancel("Session Expired"));
      }
      return res.data;
    }
    return Promise.reject(res.data);
  },
  (err) => {
    if (
      err?.response?.status === 401 &&
      !publicRoutes.some((route) => err.config.url?.includes(route))
    ) {
      window.location.replace("/auth");
      return Promise.reject(axios.Cancel("Session Expired"));
    }
    return Promise.reject(err?.response?.data);
  }
);

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </QueryClientProvider>
);
