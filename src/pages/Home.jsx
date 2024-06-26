import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "TCT - Home";
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
