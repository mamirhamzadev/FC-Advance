import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const profile = useSelector((state) => state?.profile?.profile);
  const dropdownRef = useRef(null);
  const multiDropdownRef = useRef(null);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.classList.contains("menu-dropdown")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef, multiDropdownRef]);

  return (
    <>
      <div className="py-2 bg-light">
        <div className="container-xxl d-flex flex-grow-1 flex-stack">
          <div className="d-flex align-items-center me-5">
            <Link to="/">
              <img alt="Logo" src="assets/logo.png" className="h-50px" />
            </Link>
          </div>

          <div className="app-navbar-item d-flex">
            <div onClick={toggleDropdown} className="position-relative">
              <div className="d-flex align-items-center flex-shrink-0">
                <div className="d-flex align-items-center ms-3 ms-lg-4 position-relative ">
                  <div className="btn btn-flex align-items-center nav-dropdown-btn">
                    <div className="w-40px h-40px">
                      <img
                        className="rounded-circle"
                        alt="Logo"
                        src={`${
                          profile?.profileImage
                            ? axios.defaults.baseURL + profile?.profileImage
                            : "https://i.ibb.co/xSK2rKR6/default-profile-placeholder-mfby2k0rliz1szsn.webp"
                        }`}
                        loading="lazy"
                        height="100%"
                        width="100%"
                      />
                    </div>
                  </div>

                  {showDropdown && (
                    <div
                      className=" position-absolute menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px show"
                      ref={dropdownRef}
                    >
                      <div className="menu-content d-flex align-items-center px-3">
                        <div className="symbol header-dropdown-img me-5">
                          <div className="w-30px h-30px">
                            <img
                              className="rounded-circle"
                              alt="Logo"
                              src={
                                profile?.profileImage
                                  ? axios.defaults.baseURL +
                                    profile.profileImage
                                  : `https://i.ibb.co/xSK2rKR6/default-profile-placeholder-mfby2k0rliz1szsn.webp`
                              }
                              loading="lazy"
                              height="100%"
                              width="100%"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <div className="fw-bolder d-flex align-items-center fs-5">
                            <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1">
                              Admin Dashboard
                            </span>
                          </div>
                          <a
                            href="#"
                            className="fw-bold text-muted text-hover-primary fs-7"
                          >
                            admin@dashboard.com
                          </a>
                        </div>
                      </div>

                      <div className="my-2" />

                      <div className="menu-item px-5  menu-dropdown">
                        <Link className="menu-link px-5" to="/profile">
                          Edit Profile
                        </Link>
                        <div className="my-2" />
                        <div className="menu-item">
                          <Link
                            aria-current="page"
                            className="menu-link px-5 "
                            to="/change-password"
                          >
                            Change Password
                          </Link>
                        </div>
                      </div>

                      <div className="separator my-2" />

                      <div className="menu-item px-5">
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("token");
                            navigate("/auth");
                          }}
                          className="menu-link px-5"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav
          className="navbar navbar-expand-lg py-5"
          aria-label="Light offcanvas navbar"
        >
          <div className="container-xxl">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-start "
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <Link to="/admin-panel/dashboard" className="h-50px">
                  <img
                    alt="Logo"
                    className="w-100 h-100 object-fit-contain rounded"
                    src="assets/logo.png"
                  />
                </Link>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">
                <div className="header-menu d-flex flex-column flex-lg-row w-100">
                  <ul className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch flex-grow-1">
                    <li className="menu-item  me-lg-1">
                      <NavLink className="menu-link py-3" to="/">
                        <span className="menu-title">Dashboard</span>
                      </NavLink>
                    </li>
                    <li className="menu-item  me-lg-1">
                      <NavLink className="menu-link py-3" to="/reps">
                        <span className="menu-title">Reps</span>
                      </NavLink>
                    </li>
                    <li className="menu-item me-lg-1">
                      <NavLink className="menu-link py-3" to="/applications">
                        <span className="menu-title">Direct Applications</span>
                      </NavLink>
                    </li>
                  </ul>
                  <div className="flex-shrink-0 p-4 p-lg-0  me-lg-2">
                    <button
                      className="btn btn-sm btn-light-danger fw-bolder w-100 w-lg-auto  btn-hover-scale"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/auth");
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
