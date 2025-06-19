import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ROUTES from "./constants/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";

axios.defaults.baseURL = "http://localhost:3000/";
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    localStorage.getItem("rep-token") || ""
  }`;
  return config;
});

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Wrapper>
        <Header />
        <Routes>
          {ROUTES.map((route) => (
            <Route path={route.path} element={<route.component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

function Wrapper({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return children;
}

export default App;
