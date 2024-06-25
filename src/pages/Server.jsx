import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";

export default function Server() {
  const [serverData, setServerData] = useState(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.truckyapp.com/v2/truckersmp/servers"
      );
      const data = await response.json();
      setServerData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setTimer(timer - 1);
      if (timer > 0) {
        setLoading(true);
        setText(`Update in ${timer} seconds.`);
      } else {
        fetchData();
        setTimer(20);
        setLoading(false);
        setText("UPDATE !");
      }
    }, 1000);
  }, [timer]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <table className="shadow-2xl shadow-black">
          <thead>
            <tr>
              <th>Game</th>
              <th>Server</th>
              <th>Player</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {serverData &&
              serverData.response.servers.map((server, i) => {
                return (
                  <tr className="text-center" key={"game-tr" + i}>
                    <td key={"game" + i}>{server.game}</td>
                    <td key={"name" + i}>{server.name}</td>
                    <td key={"players" + i}>{server.players}</td>
                    <td
                      className={server.online ? "online" : "offline"}
                      key={"status" + i}
                    >
                      {server.online ? "Online" : "Offline"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <div className="border rounded-2xl flex items-center flex-col shadow-2xl shadow-black">
          <h1
            className={
              loading
                ? "wait border-b p-2 rounded-xl"
                : "update border-b p-2 rounded-xl"
            }
          >
            <b>{text}</b>
          </h1>
          <ClockLoader
            className="mt-2 mb-2"
            color="#6040fa"
            speedMultiplier={0.1}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
