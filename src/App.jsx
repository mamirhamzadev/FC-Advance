import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ROUTES from "./constants/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Routes>
          {ROUTES.map((route) => (
            <Route path={route.path} element={<route.component />} />
          ))}
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
