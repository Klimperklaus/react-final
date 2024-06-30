import React, { useEffect } from "react";

function Pnf() {
  useEffect(() => {
    document.title = "TCT - Page not found";
  }, []);

  return <h1>Page not found ...</h1>;
}

export default Pnf;
