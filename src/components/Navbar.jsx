import { Link } from "react-router";
import Logo from "../assets/logo.svg?react";
import avatar from "../assets/image-avatar.png";
import Home from "../assets/icon-nav-home.svg?react";
import Movies from "../assets/icon-nav-movies.svg?react";
import Tv from "../assets/icon-nav-tv-series.svg?react";
import Bookmarked from "../assets/icon-nav-bookmark.svg?react";
import Admin from "../assets/icon-nav-admin.svg?react";
import { useLocation } from "react-router";

const NavBar = ({ role }) => {
  let location = useLocation();

  return (
    <div className="md:px-8 md:pt-8 md:pb-2 xl:pr-0 xl:pb-[2.8125rem] box-border sticky xl:fixed top-0 left-0 z-50 w-full bg-light xl:h-full xl:w-fit">
      <div className="nav-container">
        <Logo className="logo" />
        <div className="nav-2nd-container">
          <Link
            data-tip="home"
            to="home"
            className={`tooltip group relative ${
              location.pathname === "/home"
                ? "[&>*]:fill-white [&>*]:hover:fill-white"
                : ""
            }`}
          >
            <Home className="svg-nav" />
          </Link>
          <Link
            data-tip="movies"
            to="movies"
            className={`tooltip group relative ${
              location.pathname === "/movies"
                ? "[&>*]:fill-white [&>*]:hover:fill-white"
                : ""
            }`}
          >
            <Movies className="svg-nav" />
          </Link>
          <Link
            data-tip="series"
            to="series"
            className={`tooltip group relative ${
              location.pathname === "/series"
                ? "[&>*]:fill-white [&>*]:hover:fill-white"
                : ""
            }`}
          >
            <Tv className="svg-nav" />
          </Link>
          <Link
            data-tip="bookmarked"
            to="bookmarked"
            className={`tooltip group relative ${
              location.pathname === "/bookmarked"
                ? "[&>*]:fill-white [&>*]:hover:fill-white"
                : ""
            }`}
          >
            <Bookmarked className="booked" />
          </Link>
          {role === "admin" && (
            <Link
              data-tip="admin"
              to="admin"
              className={`tooltip group relative ${
                location.pathname === "/admin"
                  ? "[&>*]:fill-white [&>*]:hover:fill-white"
                  : ""
              }`}
            >
              <Admin className="admin" />
            </Link>
          )}
        </div>
        <button
          className="flex justify-end"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <img className="pic" src={avatar} alt="avatar" />
        </button>
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box bg-dark text-center">
            <h3 className="text-white font-outfit text-heading-m">Sign out</h3>
            <p className="py-4 text-white font-outfit text-body-m">
              Ar you sure want to sign out?
            </p>
            <div className="grid grid-cols-2 place-items-center">
              <Link
                to="/"
                onClick={() =>
                  sessionStorage.setItem("currentRole", JSON.stringify(""))
                }
                className="btn bg-red w-32"
              >
                Sign Out
              </Link>
              <form method="dialog">
                <button className="btn bg-[#5A698F] w-32">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default NavBar;
