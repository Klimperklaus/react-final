import Server from "./pages/Server";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Player from "./pages/Player";
import Home from "./pages/Home";
import Stream from "./pages/Stream";
import FetchContainer from "./components/container/FetchContainer";

export default function App() {
  return (
    <>
      <FetchContainer>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servers" element={<Server />} />
            <Route path="/players" element={<Player />} />
            <Route path="/streams" element={<Stream />} />
          </Route>
        </Routes>
      </FetchContainer>
    </>
  );
}
