import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./constants/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {ROUTES.map((route) => (
          <Route path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
