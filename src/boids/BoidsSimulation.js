import React, { useEffect } from "react";

const BoidsSimulation = () => {
  useEffect(() => {
    const script1 = document.createElement("script");

    script1.src = "./perlin.js";
    script1.async = true;

    document.body.appendChild(script1);

    const script2 = document.createElement("script");

    script2.src = "./script.js";
    script2.async = true;

    document.body.appendChild(script2);
  }, []);
  return <div id="container" />;
};

export default BoidsSimulation;
