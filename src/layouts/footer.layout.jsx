import { NavLink, Outlet } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col main-wrapper w-full">
      <header className="fixed cursor-pointer top-0 right-0 py-5 px-8 text-xl header">
        <span className="material-symbols-outlined">account_circle</span>
      </header>

      <Outlet />

      <div className="flex fixed bottom-0 w-full justify-center footer">
        <nav className="flex justify-between my-6 w-full max-w-3xl items-center px-5">
          <NavLink
            to="/"
            className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
          >
            <span className="material-symbols-outlined">home</span>Home
          </NavLink>
          {/* <NavLink
            to="/companion"
            className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
          >
            <span className="material-symbols-outlined">robot_2</span>Companion
          </NavLink> */}
          <NavLink
            to="/discover"
            className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
          >
            <span className="material-symbols-outlined">travel_explore</span>
            Discover
          </NavLink>
          <NavLink
            to="/invest"
            className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
          >
            <span className="material-symbols-outlined">add_business</span>
            Invest
          </NavLink>
          <NavLink
            to="/forum"
            className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
          >
            <span className="material-symbols-outlined">forum</span>
            Forum
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
