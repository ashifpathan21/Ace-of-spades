import React, { useState } from "react";
import Details from "../../components/Auth/Details.jsx";

const Signup = () => {
  const [mode, setMode] = useState("signup");

  return (
    <div>
      <Details mode={mode} setMode={setMode} />
    </div>
  );
};

export default Signup;
