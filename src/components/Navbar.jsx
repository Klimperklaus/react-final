import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="categories text-center text-3xl p-3 border-b-4 border-zinc-400 bg-white/15">
      <ul className="flex items-center justify-center gap-10 w-full">
      <div className="md:flex md:flex-wrap lg:flex-none gap-10">
          <li className="nav-links flex border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/30 border-double hover:bg-white/5 rounded-3xl">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/30 border-double hover:bg-white/5 rounded-3xl">
            <NavLink to="/streams">Streams</NavLink>
          </li>
        </div>
        <li>
          <h1 className="head text-center text-zinc-300 text-3xl p-5 border-b-8 border-t-8 border-l-2 border-r-2 border-zinc-300 rounded-3xl w-full underline bg-white/15">
            TruckersMP Community Tracker
          </h1>
        </li>
        <div className="md:flex md:flex-wrap lg:flex-none gap-10">
          <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/30 border-double hover:bg-white/5 rounded-3xl">
            <NavLink to="/players">Players</NavLink>
          </li>
          <li className="nav-links border-transparent border-b-4 border-t-4 border-l-2 border-r-2 hover:border-zinc-300/30 border-double hover:bg-white/5 rounded-3xl">
            <NavLink to="/servers">Servers</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
