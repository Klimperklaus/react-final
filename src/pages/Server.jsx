import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import yesImg from "../assets/yes.png";
import noImg from "../assets/no.png";

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
    if (!document.title.includes("Servers")) {
      document.title = "TCT - Servers";
    }
    if (!document.head.innerHTML.includes("description")) {
      document.head.innerHTML +=
        '<meta name="description" content="Updates Server information for TruckersMP Servers each 20 seconds, schown as HTML Table">';
    }
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
        <table className="shadow-lg shadow-white/15">
          <thead>
            <tr>
              <th>GAME</th>
              <th>SERVER</th>
              <th>PLAYER</th>
              <th>PLAYER COLLISION</th>
              <th>AFK ALLOWED</th>
              <th>CARS ALLOWED</th>
              <th>STATUS</th>
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
                    <td key={"collisions" + i}>
                      {server.collisions ? (
                        <img src={yesImg} alt="yes" />
                      ) : (
                        <img src={noImg} alt="no" />
                      )}
                    </td>
                    <td key={"afk" + i}>
                      {server.afkenabled ? (
                        <img src={noImg} alt="no" />
                      ) : (
                        <img src={yesImg} alt="yes" />
                      )}
                    </td>
                    <td key={"playercars" + i}>
                      {server.carsforplayers ? (
                        <img src={yesImg} alt="yes" />
                      ) : (
                        <img src={noImg} alt="no" />
                      )}
                    </td>
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
        <div className="border border-white/25 rounded-2xl flex items-center flex-col shadow-lg shadow-white/15">
          <h1
            className={
              loading
                ? "wait border-b-2 border-white/25 p-2 rounded-xl"
                : "update border-b-2 border-white/25 p-2 rounded-xl"
            }
          >
            <b>{text}</b>
          </h1>
          <ClockLoader
            className="mt-2 mb-2"
            color="#6040fa"
            speedMultiplier={0.4}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
