/**
 * TODO
 *
 * add animation delay when lose or winning
 * loading when post username
 * create fixed position for table and pagination
 * give text when win streak reach something exp double kill killin spree monster kill etc
 * change alert to red text
 *
 * low prior
 *
 * alert when user reload or want to exit
 * handle when score is 0
 *
 * done
 * responsive pagination css
 *
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faHandScissors,
  faHandPaper,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/play.css";
import "../styles/button.css";
import versusImage from "../assets/versus.png";
import usernameAT from "../assets/username-a-t.jpg";

let API_URL = "https://rock-paper-scissors-api-heroku.herokuapp.com/highscore";

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: 0,
      computerHand: 0,

      score: 0,
      lastScore: 0,
      isShowModalLose: false,
      isUsernameSame: false,
      whoWin: "",
      username: "",
    };
  }

  handleLose() {
    this.setState({
      lastScore: this.state.score,
      score: 0,
      isShowModalLose: true,
    });
  }

  handleBattle(playerHand) {
    if (this.state.isShowModalLose) return true;

    this.setState({ playerHand: playerHand });

    let { computerHand, score } = this.state;

    computerHand = Math.floor(Math.random() * 3) + 1;
    this.setState({ computerHand });

    if (playerHand === computerHand) {
      this.setState({ whoWin: "draw" });
    } else {
      if (playerHand === 1) {
        playerHand += 3;
      }

      if (playerHand - 1 === computerHand) {
        this.setState({ whoWin: "player win", score: score + 1 });
      } else {
        this.setState({ whoWin: "computer win" });
        this.handleLose();
      }
    }
  }

  async handleSubmit() {
    let { username, lastScore } = this.state;

    if (!username) {
      alert("masukan username");
    } else {
      let pattern = /^\S+$/g; //non-whitespace from beginning to end

      let resultRegex = pattern.test(username);

      if (!resultRegex) {
        alert("username tidak boleh mengandung spasi");
      } else {
        let isPostLoseNotFoundUsername = await this.postLose(
          username,
          lastScore
        );

        if (!isPostLoseNotFoundUsername) {
          // alert("username telah terpakai");
          this.setState({ isUsernameSame: true });
        } else {
          alert("anda telah submit highscore");
          // this.setState({ isShowModalLose: false });

          this.props.history.push("/highscores?page=1");
        }
      }
    }
  }

  async postLose(username, lastScore) {
    console.log(username);
    console.log(lastScore);

    let usernameNotFound = true;

    await Axios.post(API_URL, {
      username,
      win_streak: lastScore,
    })
      .then((response) => {
        console.log(response);

        if (response.data.msg.includes("username found")) {
          usernameNotFound = false;
        } else {
          usernameNotFound = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return usernameNotFound;
  }

  render() {
    return (
      <>
        <div className="background">
          <div className="round center">
            <h4>ROUND 1</h4>
          </div>

          <div style={{ display: "flex" }}>
            <div className="player-container">
              <div className="item-1 center">
                <FontAwesomeIcon
                  className="icon"
                  icon={faHandRock}
                  onClick={() => this.handleBattle(3)}
                />
              </div>

              <div className="item-2 center">
                <FontAwesomeIcon
                  className="icon"
                  icon={faHandScissors}
                  onClick={() => this.handleBattle(2)}
                />
              </div>

              <div className="item-3 center">
                <FontAwesomeIcon
                  className="icon"
                  icon={faHandPaper}
                  onClick={() => this.handleBattle(1)}
                />
              </div>

              <div className="player-select-hand-text center">
                <h5>SELECT YOUR HAND</h5>
              </div>
            </div>

            {/* <div className="versus-container center"> */}
            <div className="versus-container">
              <p>player hand ={this.state.playerHand} </p>
              <p>computer hand ={this.state.computerHand} </p>

              <p>who win ={this.state.whoWin} </p>

              <p>win streaks ={this.state.score} </p>
              <p>lastScore ={this.state.lastScore} </p>

              <img src={versusImage} alt="versus" width="30%" />
            </div>

            <div className="computer-container">
              <div className="item-1" />

              <div className="item-2-comp center">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>

              <div className="item-3" />

              <div className="player-select-hand-text center">
                <h5>COMPUTER HAND</h5>
              </div>
            </div>
          </div>

          {this.state.isShowModalLose ? (
            <div className="modal-lose-center">
              <div className="modal-content-title center">
                <h4>YOU LOSE</h4>
              </div>

              <div className="modal-content-input">
                <h5>ENTER USERNAME</h5>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                />
                <br />

                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => this.handleSubmit()}
                >
                  <h5 className="button-3d" style={{ padding: "8px 18px 8px" }}>
                    Submit
                  </h5>
                </Link>
              </div>

              <div className="modal-content-button">
                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => this.setState({ isShowModalLose: false })}
                >
                  <h5 className="button-3d" style={{ padding: "8px 18px 8px" }}>
                    Play Again
                  </h5>
                </Link>

                <Link to="/" style={{ textDecoration: "none" }}>
                  <h5 className="button-3d" style={{ padding: "8px 18px 8px" }}>
                    Home
                  </h5>
                </Link>
              </div>
            </div>
          ) : null}

          {this.state.isUsernameSame ? (
            <div className="modal-username-is-same">
              <div className="modal-username-is-same-item-1">
                <img src={usernameAT} width="75%" alt="username" />
              </div>
              <div className="modal-username-is-same-item-2">
                <h2>Oops, Username Already Taken</h2>

                <br />

                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  onClick={() =>
                    this.setState({
                      isUsernameSame: false,
                    })
                  }
                >
                  <h5 className="button-3d" style={{ padding: "8px 18px 8px" }}>
                    OK
                  </h5>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}
