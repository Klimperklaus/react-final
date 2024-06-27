import { useEffect } from "react";
import { useState } from "react";

export default function Stream() {
  const [streamerData, setStreamerData] = useState(null);

  function fixThumbNailURL(url) {
    url = url.replace("{width}", "500");
    url = url.replace("{height}", "300");
    return url;
  }

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
    <div className="flex flex-wrap justify-center gap-4">
      <div className=" w-3/4 flex justify-center text-center mt-2 sticky top-0">
        <h1 className="streamCount text-3xl p-5 border-4 rounded-2xl border-white/10 bg-white/5 w-3/4 font-extrabold">
          Streams total :
          <span className="streamCountSpan font-extrabold font-mono p-5">
            {streamerData && streamerData.total}
          </span>
        </h1>
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
