import React, { Component } from "react";

export default class Operan extends Component {
  //   gantiMobil(carName) {
  //     this.setState({ mobil: carName });
  //   }

  render() {
    const { mobilasd, gantiMobil } = this.props;
    return (
      <div>
        <h2>ini operan dari : {mobilasd}</h2>

        <button onClick={() => gantiMobil("zczc")}>ganti mobil</button>
      </div>
    );
  }
}
