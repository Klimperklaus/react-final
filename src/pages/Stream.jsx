import { useEffect } from "react";
import { useState } from "react";
import {
  fixThumbNailURL,
  getTotalViewerCount,
  getLanguages,
  sortStreams,
} from "../utilities/streamFuncs";

export default function Stream() {
  const [streamerData, setStreamerData] = useState(null);
  const [selected, setSelected] = useState("all");
  const [streams, setStreams] = useState([]);
  const [initial, setInitial] = useState(true);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.truckyapp.com/v2/streams/twitch/ets2"
      );
      const data = await response.json();
      setStreamerData(data.response);
      if (initial) {
        setStreams(data.response.streams);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    document.title = "TCT - Streams";
    fetchData();
  }, [selected]);

  return (
    <div className="flex flex-wrap justify-center gap-4 h-max">
      <div className="stickyDiv w-3/4 flex justify-between text-center mt-2 sticky top-0 pr-8">
        <h1 className="text-3xl p-t-5 p-b-5 font-extrabold">
          <span className="text-orange-500">
            {streamerData && streamerData.total}
          </span>{" "}
          STREAMS{" "}
          <span className="ml-6 text-orange-500">
            {streamerData && getLanguages(streamerData).length}
          </span>{" "}
          LANGUAGES{" "}
          <span className="ml-6 text-orange-500">
            {streamerData && getTotalViewerCount(streamerData)}
          </span>{" "}
          VIEWERS
        </h1>
        <div className="flex justify-center items-center">
          <select
            className="bg-blue-400/80 scale-110 p-1 text-center font-extrabold"
            name="languages"
            id="languages"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setStreams(sortStreams(streamerData, e.target.value));
              setInitial(false);
            }}
          >
            <option key="all" value="all">
              ALL LANGUAGES
            </option>
            {streamerData &&
              getLanguages(streamerData).names.map((name) => (
                <option key={name} value={name}>
                  {name.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </div>
      {streamerData &&
        streams.map((stream) => (
          <div
            key={stream.id}
            className="card flex flex-col justify-between border-2 border-white/15 shadow-white/15 shadow-lg rounded-xl"
            style={{
              width: "500px",
              height: "300px",
              backgroundImage: `url(${fixThumbNailURL(stream.thumbnailUrl)})`,
            }}
          >
            <p className=" bg-black/70 rounded-t-xl px-2 border-b-2 border-white/15">
              {stream.title}
            </p>
            <div className="flex justify-between bg-black/70 rounded-b-xl border-t-2 border-white/15">
              <p className="bg-purple-700/60 rounded-bl-xl rounded-sm px-2">
                VIEWERS:{" "}
                <span className="font-extrabold">{stream.viewers}</span>
              </p>
              <p className="bg-blue-400/60 rounded-sm px-2">
                LANGUAGE:{" "}
                <span className="font-extrabold">
                  {stream.language.toUpperCase()}
                </span>
              </p>
              <a
                className="streamLink bg-red-600/60 hover:bg-yellow-700/70 rounded-br-lg rounded-sm px-2"
                href={stream.url}
                target="_blank"
              >
                WATCH STREAM
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}
