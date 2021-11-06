import React, { Component } from "react";
import "../styles/play.css";

export default class Play extends Component {
  render() {
    return (
      <>
        <div className="background">
          <div className="round center">
            <p>ROUND 1</p>
          </div>

          <div style={{ display: "flex" }}>
            <div className="player-container">
              <div className="item-1 center">
                <p>ROCK</p>
              </div>

              <div className="item-2 center">
                <p>SCISSORS</p>
              </div>

              <div className="item-3 center">
                <p>PAPER</p>
              </div>

              <div className="player-select-hand-text center">
                <p>SELECT YOUR HAND</p>
              </div>
            </div>

            <div className="versus-container center">
              <p>VS</p>
            </div>

            <div className="computer-container">
              <div className="item-1" />

              <div className="item-2 center">
                <p>?</p>
              </div>

              <div className="item-3" />

              <div className="player-select-hand-text center">
                <p>COMPUTER HAND</p>
              </div>
            </div>
          </div>
          <div className="modal-lose-center">
            <div className="modal-content-title center">
              <p>YOU LOSE</p>
            </div>

            <div className="modal-content-input">
              <p>ENTER USERNAME</p>
              <p>INPUTAN</p>
              <p>SUBMIT</p>
            </div>

            <div className="modal-content-button">
              <p>PLAY AGAIN</p>
              <p>HOME</p>
            </div>
          </div>

          <div className="modal-username-is-same" />
        </div>
      </>
    );
  }
}
