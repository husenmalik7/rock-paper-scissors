import React from "react";
import { Link } from "react-router-dom";

import "../styles/home.css";
import HandIcon from "../components/HandIcon";

export default function Home() {
  return (
    <div className="home">
      <section>
        <HandIcon arrLength={[9, 5]} />
        <HandIcon arrLength={[9, 5]} />
        <HandIcon arrLength={[9, 5]} />
        <HandIcon arrLength={[9, 5]} />
        <HandIcon arrLength={[9, 5]} />
      </section>

      <div className="intro-body">
        <h2 className="go-font">Welcome to</h2>
        <h2 className="go-font">Rock Scisscors Paper</h2>

        <br />

        <Link to="/play" style={{ textDecoration: "none" }}>
          <h2 className="button-3d go-font">Play</h2>
        </Link>

        <br />

        <Link to="/highscores" style={{ textDecoration: "none" }}>
          <h2 className="button-3d go-font">High Scores</h2>
        </Link>
      </div>
    </div>
  );
}
