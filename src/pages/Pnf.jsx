import React, { useEffect } from "react";

function Pnf() {
  useEffect(() => {
    document.title = "TCT - Page not found";
  }, []);

  return <div>Page not found ...</div>;
}

export default Pnf;
