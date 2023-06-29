import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./styleHeader.scss";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfuly");
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler mb-1"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse mt-1"
              id="navbarTogglerDemo01"
            >
              {/* ctrl+i using for extension emojisense */}
              <Link to="/" className="navbar-brand">
                🛒 MernStack App
              </Link>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <SearchInput />
                <li className="nav-item">
                  <NavLink to="/" className="nav-link ">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={`/categories`} className="dropdown-item">
                        All Catgories
                      </Link>
                    </li>
                    {categories?.map((c) => {
                      return (
                        <>
                          <li>
                            <Link
                              to={`/category/${c.slug}`}
                              className="dropdown-item"
                            >
                              {c.name}
                            </Link>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </li>
                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="dropdown-item"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Badge
                    count={cart?.length}
                    className="nav-link my-0 pt-1 CartBadgeLink"
                    showZero
                  >
                    <NavLink to="/cart" className="nav-link ">
                      Cart{" "}
                    </NavLink>
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
