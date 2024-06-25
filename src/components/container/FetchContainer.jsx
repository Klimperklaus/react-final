import { createContext, useState } from "react";

export const FetchContext = createContext(null);

export default function FetchContainer(props) {
  const [serverData, setServerData] = useState(null);

  async function getData() {
    try {
      const response = await fetch("https://api.truckyapp.com/");
      const data = await response.json();
      setServerData(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FetchContext.Provider value={{ serverData, getData }}>
      {props.children}
    </FetchContext.Provider>
  );
}
