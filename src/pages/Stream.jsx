import { useEffect } from "react";
import { useState } from "react";

function makeLanguagesUnique(arr, lang) {
  if (!arr.includes(lang)) {
    arr.push(lang);
  }
  return arr;
}

function fixThumbNailURL(url) {
  url = url.replace("{width}", "500");
  url = url.replace("{height}", "300");
  return url;
}

function getTotalViewerCount(data) {
  if (data) {
    let count = 0;
    data.streams.forEach((stream) => {
      count += stream.viewers;
    });
    return count;
  }
}

function getLanguageCount(data) {
  if (data) {
    const langArr = [];
    data.streams.forEach((stream) => {
      makeLanguagesUnique(langArr, stream.language);
    });
    return langArr.length;
  }
}

export default function Stream() {
  const [streamerData, setStreamerData] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.truckyapp.com/v2/streams/twitch/ets2"
      );
      const data = await response.json();
      setStreamerData(data.response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    document.title = "TCT - Streams";
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 h-max">
      <div className=" w-3/4 flex justify-around text-center mt-2 sticky top-0">
        <h1 className="text-3xl p-t-5 p-b-5 font-extrabold">
          {streamerData && streamerData.total} STREAMS IN{" "}
          {getLanguageCount(streamerData)} LANGUAGES WITH{" "}
          {getTotalViewerCount(streamerData)} VIEWERS LIVE !
        </h1>
        <div className="flex items-center">
          <select
            className="bg-blue-500/80 scale-125"
            name="languages"
            id="languages"
          >
            <option value="">--Choose your language--</option>
          </select>
        </div>
      </div>
      {streamerData &&
        streamerData.streams.map((stream) => (
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
