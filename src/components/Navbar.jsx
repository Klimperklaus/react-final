import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="categories text-center text-3xl p-3 border-b-4 border-zinc-400 bg-white/15">
      <ul className="flex flex-wrap items-baseline justify-center gap-10 w-full">
        <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/20 rounded-3xl">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/20 rounded-3xl">
          <NavLink to="/streams">Streams</NavLink>
        </li>
        <li>
          <h1 className="head text-center text-zinc-300 text-3xl p-5 border-b-8 border-t-8 border-l-2 border-r-2 border-zinc-300 rounded-3xl w-full underline bg-white/15">
            TruckersMP Community Tracker
          </h1>
        </li>
        <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/20 rounded-3xl">
          <NavLink to="/players">Players</NavLink>
        </li>
        <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/20 rounded-3xl">
          <NavLink to="/servers">Servers</NavLink>
        </li>
      </ul>
    </nav>
  );
}
