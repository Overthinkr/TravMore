import { NavLink, Outlet } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <header className="absolute cursor-pointer top-0 right-0 my-5 mx-8 text-xl">
        <span className="material-symbols-outlined">account_circle</span>
      </header>
      <Outlet />
      <nav className="flex absolute bottom-0 gap-64 my-6 mx-60">
        <NavLink
          to="/"
          className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
        >
          <span className="material-symbols-outlined">home</span>Home
        </NavLink>
        <NavLink
          to="/companion"
          className="flex flex-col items-center cursor-pointer text-cyan-300 hover:text-white"
        >
          <span className="material-symbols-outlined">robot_2</span>Companion
        </NavLink>
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
          <span className="material-symbols-outlined">add_business</span>Invest
        </NavLink>
      </nav>
    </div>
  );
}
