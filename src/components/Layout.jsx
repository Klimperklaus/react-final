import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex justify-center">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
