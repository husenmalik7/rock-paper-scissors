import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Highscores from "./pages/Highscores";
import Play from "./pages/Play";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/play" exact component={Play} />
            <Route path="/highscores" exact component={Highscores} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
