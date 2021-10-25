import React, { Component } from "react";
import Operan from "./Operan";

export default class StateProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobil: "bmwxx",
    };
  }

  gantiMobil = (carName) => {
    this.setState({ mobil: carName });
  };

  render() {
    let state = this.state;

    let changeMobil = () => {
      this.setState({ mobil: "nissan" });
    };

    return (
      <div>
        <h2>{state.mobil}</h2>
        <button onClick={() => this.setState({ mobil: "qwewe" })}>
          {/* <button onClick={() => changeMobil()}>ganti mobil</button> */}
          {/* <button onClick={function () { changeMobil();}} > */}
          {/* <button onClick={() => this.gantiMobil("naon")}>*/}
          ganti mobil
        </button>

        <Operan mobilasd={state.mobil} gantiMobil={this.gantiMobil} />
      </div>
    );
  }
}
