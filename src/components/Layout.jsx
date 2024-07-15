import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex justify-center overflow-auto lg:h-2/3 xl:h-4/5 md:h-3/4 w-full md:top-48 lg:top-48 xl:top-32 fixed">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
