import { useEffect } from "react";
import { useState } from "react";

export default function Stream() {
  const [streamerData, setStreamerData] = useState(null);
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
            className="card border border-white"
            style={{ width: "500px", height: "300px" }}
          >
            <p>{stream.title}</p>
            <p>Viewers: {stream.viewers}</p>
            <p>Language: {stream.language}</p>
            <a
              className="border border-red-600"
              href={stream.url}
              target="_blank"
            >
              LINK
            </a>
          </div>
        ))}
    </div>
  );
}
