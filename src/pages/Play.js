import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
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

const API_URL = process.env.REACT_APP_API_URL;

let winMessages = [
  "Outstanding",
  "You Rock!",
  "Even sad panda smile",
  "this is win message",
  "Plus Ultra",
  "You did it!",
  "hasta la vista baby",
  "Monster kill",
  "Killing Spree",
  "Dominating",
  "Unstoppable",
  "Wicked Sick",
];

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: 0,
      computerHand: 0,
      computerRandomAnimation: 0, // 0 for question mark

      score: 0,
      lastScore: 0,
      round: 1,
      isShowModalLose: false,
      isAnimationLoading: false,
      isUsernameSame: false,
      isLoadingPost: false,
      whoWin: "",
      username: "",
    };
  }

  handleBattle(playerHand) {
    if (this.state.isShowModalLose) return true;

    let { computerHand, score, round } = this.state;

    computerHand = Math.floor(Math.random() * 3) + 1;

    this.setState({
      playerHand: playerHand,
      isAnimationLoading: true,
      computerHand,
    });

    let timer = setInterval(() => {
      let random = Math.floor(Math.random() * 3) + 1;
      this.setState({ computerRandomAnimation: random });
    }, 50);

    setTimeout(() => {
      if (playerHand === computerHand) {
        this.setState({ whoWin: "draw", round: round + 1 });
      } else {
        if (playerHand === 1) {
          playerHand += 3;
        }

        if (playerHand - 1 === computerHand) {
          this.setState({
            whoWin: "You win",
            score: score + 1,
            round: round + 1,
          });
        } else {
          this.setState({ whoWin: "Computer win" });
          this.handleLose();
        }
      }

      this.setState({
        computerRandomAnimation: computerHand,
        isAnimationLoading: false,
      });
      clearInterval(timer);
    }, 2000);
  }

  handleLose() {
    this.setState({
      lastScore: this.state.score,
      score: 0,
      round: 1,
      isShowModalLose: true,
    });
  }

  async handleSubmit() {
    let { username, lastScore } = this.state;

    if (!username) {
      alert("Please enter username");
    } else {
      let pattern = /^\S+$/g; //non-whitespace from beginning to end

      let resultRegex = pattern.test(username);

      if (!resultRegex) {
        alert("username can't contain space");
      } else {
        this.setState({ isLoadingPost: true });

        let isPostLoseNotFoundUsername = await this.postLose(
          username,
          lastScore
        );

        this.setState({ isLoadingPost: false });

        if (!isPostLoseNotFoundUsername) {
          this.setState({ isUsernameSame: true });
        } else {
          alert("Congratulations, your highscore has been submitted");

          this.props.history.push("/highscores?page=1");
        }
      }
    }
  }

  async postLose(username, lastScore) {
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
          <div className="round">
            <h4>ROUND {this.state.round}</h4>

            {this.state.isShowModalLose ? (
              <h4>Your Score {this.state.lastScore}</h4>
            ) : (
              <h4>Your Score {this.state.score}</h4>
            )}
          </div>

          <div style={{ display: "flex" }}>
            <div className="player-container">
              <div className="item-1 center">
                <FontAwesomeIcon
                  className="icon"
                  icon={faHandRock}
                  onClick={() =>
                    this.state.isAnimationLoading ? null : this.handleBattle(3)
                  }
                />
              </div>

              <div className="item-2 center">
                <FontAwesomeIcon
                  className="icon"
                  icon={faHandScissors}
                  onClick={() =>
                    this.state.isAnimationLoading ? null : this.handleBattle(2)
                  }
                />
              </div>

              <div className="item-3 center">
                <FontAwesomeIcon
                  className="icon"
                  icon={faHandPaper}
                  onClick={() =>
                    this.state.isAnimationLoading ? null : this.handleBattle(1)
                  }
                />
              </div>

              <div className="player-select-hand-text center">
                <h5>SELECT YOUR HAND</h5>
              </div>
            </div>

            <div className="versus-container">
              <img src={versusImage} alt="versus" width="30%" />

              <br />
              <br />

              {this.state.whoWin === "You win" ? (
                <>
                  <h4>YOU WIN</h4>
                  {this.state.isAnimationLoading ? null : (
                    <h4>
                      {
                        winMessages[
                          Math.floor(Math.random() * winMessages.length) + 1
                        ]
                      }
                    </h4>
                  )}
                </>
              ) : this.state.whoWin === "draw" ? (
                <h4>DRAW</h4>
              ) : null}
            </div>

            <div className="computer-container">
              <div className="item-1" />

              <div className="item-2-comp center">
                {this.state.computerRandomAnimation === 0 ? (
                  <FontAwesomeIcon icon={faQuestionCircle} />
                ) : this.state.computerRandomAnimation === 3 ? (
                  <FontAwesomeIcon icon={faHandRock} />
                ) : this.state.computerRandomAnimation === 2 ? (
                  <FontAwesomeIcon icon={faHandScissors} />
                ) : (
                  <FontAwesomeIcon icon={faHandPaper} />
                )}
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

          {this.state.isLoadingPost ? (
            <div className="modal-loading-post center">
              <Spinner animation="border" variant="light" />
            </div>
          ) : null}
        </div>
      </>
    );
  }
}
