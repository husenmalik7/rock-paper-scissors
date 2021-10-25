import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";

import HandIcon from "../components/HandIcon";

export default function Home() {
  return (
    <div className="home">
      <section>
        <HandIcon />
        <HandIcon />
        <HandIcon />
        <HandIcon />
        <HandIcon />
      </section>

      <div className="intro-body">
        <h2>welcome to rock scisscor paper</h2>

        <Link to="/play">
          <Button>start</Button>
        </Link>

        <br />
        <Link to="/highscores">
          <Button>highscores</Button>
        </Link>
      </div>
    </div>
  );
}
