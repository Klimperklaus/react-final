import Server from "./pages/Server";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Player from "./pages/Player";
import Home from "./pages/Home";
import Stream from "./pages/Stream";
import Pnf from "./pages/Pnf";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servers" element={<Server />} />
          <Route path="/players" element={<Player />} />
          <Route path="/streams" element={<Stream />} />
          <Route path="*" element={<Pnf />} />
        </Route>
      </Routes>
    </>
  );
}
