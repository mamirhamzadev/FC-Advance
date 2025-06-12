import { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

const LazyComponents = {
  Header: lazy(() => import("./views/partials/Header")),
  Footer: lazy(() => import("./views/partials/Footer")),
  Auth: lazy(() => import("./views/Auth")),
  Dashboard: lazy(() => import("./views/Dashboard")),
  ChangePassword: lazy(() => import("./views/ChangePassword")),
  ResetPassword: lazy(() => import("./views/component/auth/ResetPassword")),
  Profile: lazy(() => import("./views/Profile")),
  Companies: lazy(() => import("./views/Companies")),
  Users: lazy(() => import("./views/Users")),
};

const LoadingComponent = (
  <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
  >
    <div className="spinner-grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <>
      <div className="app-default" data-bs-theme="light">
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Suspense fallback={LoadingComponent}>
            <Routes>
              {/* Routes with Header and Footer */}
              <Route
                path="/"
                element={
                  <>
                    <LazyComponents.Header />
                    <Outlet />
                    <LazyComponents.Footer />
                  </>
                }
              >
                <Route index element={<LazyComponents.Dashboard />} />
                <Route path="profile" element={<LazyComponents.Profile />} />
                <Route
                  path="change-password"
                  element={<LazyComponents.ChangePassword />}
                />
                <Route
                  path="companies"
                  element={<LazyComponents.Companies />}
                />
                <Route path="users" element={<LazyComponents.Users />} />
              </Route>

              {/* Routes without Header and Footer */}
              <Route path="/auth" element={<LazyComponents.Auth />} />
              <Route
                path="/reset-password"
                element={<LazyComponents.ResetPassword />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
