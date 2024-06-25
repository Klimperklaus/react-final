import { useEffect } from "react";
import { useState } from "react";

export default function Stream() {
  const [streamerData, setStreamerData] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const size = {
    width: 500,
    height: 300,
  };

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
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {streamerData &&
        streamerData.streams.map((stream) => (
          <div
            className="card flex flex-col justify-between border border-black shadow-black shadow-xl "
            style={{
              width: "500px",
              height: "300px",
              backgroundImage: `url(${stream.thumbnailUrl})`,
            }}
          >
            <p>{stream.title}</p>
            <div className="flex justify-between bg-black/50">
              <p>VIEWERS: {stream.viewers}</p>
              <p>LANGUAGE: {stream.language}</p>
              <a
                className=" bg-red-600/40 rounded-lg px-2"
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
