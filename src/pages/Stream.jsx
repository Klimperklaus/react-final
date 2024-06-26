import { useEffect } from "react";
import { useState } from "react";

export default function Stream() {
  const [streamerData, setStreamerData] = useState(null);
  const size = {
    width: 500,
    height: 300,
  };

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
      {streamerData &&
        streamerData.streams.map((stream) => (
          <div
            key={stream.id}
            className="card flex flex-col justify-between border border-black shadow-white/15 shadow-lg "
            style={{
              width: "500px",
              height: "300px",
              backgroundImage: `url(${fixThumbNailURL(stream.thumbnailUrl)})`,
            }}
          >
            <p>{stream.title}</p>
            <div className="flex justify-between bg-black/60">
              <p>VIEWERS: {stream.viewers}</p>
              <p>LANGUAGE: {stream.language}</p>
              <a
                className=" bg-red-600/40 hover:bg-yellow-700/70 rounded-xl px-2"
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
