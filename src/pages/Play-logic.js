import React, { Component } from "react";

import { Button } from "react-bootstrap";
import ModalPlay from "../components/ModalPlay";
import Axios from "axios";

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
    };
  }

  closeModal = async (condition, username) => {
    console.log(`hello ${username}`);

    if (!username) {
      alert("please enter your name");
    } else {
      let isPostLoseNotFoundUsername = await this.postLose(
        username,
        this.state.lastScore
      );

      // console.log({ isPostLoseNotFoundUsername });
      // // apakah post lose tidak menemukan kesamaan?
      // // true = close modal
      // // false = open modal

      if (isPostLoseNotFoundUsername) {
        this.setState({ isShowModalLose: condition });
        return true;
      } else {
        return false;
      }
    }
  };

  async postLose(username, lastScore) {
    console.log({ username, lastScore });

    let usernameNotFound = true;

    await Axios.post(API_URL, {
      username,
      win_streak: lastScore,
    })
      .then((response) => {
        console.log(response);

        if (response.data.msg.includes("username found")) {
          alert("username telah terpakai");
          usernameNotFound = false;
        } else {
          usernameNotFound = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log({ usernameNotFound });

    return usernameNotFound;
  }

  handleLose() {
    alert("Opps you Lose. computer win");
    console.log("handleLose");
    console.log("your last score is = " + this.state.score);

    this.setState({
      lastScore: this.state.score,
      score: 0,
      isShowModalLose: true,
    });
  }

  handleBattle() {
    let { playerHand, computerHand, score } = this.state;

    if (playerHand === 0) {
      alert("select hand");
      return false;
    }

    computerHand = Math.floor(Math.random() * 3) + 1;
    console.log(computerHand);
    this.setState({ computerHand });

    if (playerHand === computerHand) {
      alert("draw");
    } else {
      if (playerHand === 1) {
        playerHand += 3;
      }

      if (playerHand - 1 === computerHand) {
        alert("player win");
        this.setState({ score: score + 1 });
      } else {
        this.handleLose();
      }
    }
  }

  render() {
    return (
      <div>
        <h2>play</h2>

        <h2>select your hand</h2>
        <h2>player hand = {this.state.playerHand}</h2>
        <h2>computer hand = {this.state.computerHand}</h2>

        <h2>win streak = {this.state.score}</h2>

        <Button onClick={() => this.setState({ playerHand: 3 })}>Rock 3</Button>

        <Button onClick={() => this.setState({ playerHand: 2 })}>
          Scissors 2
        </Button>

        <Button onClick={() => this.setState({ playerHand: 1 })}>
          Paper 1
        </Button>

        <br />
        <br />

        <ModalPlay
          isShowModal={this.state.isShowModalLose}
          scoreModal={this.state.lastScore}
          closeModal={this.closeModal}
        />

        <Button onClick={() => this.handleBattle()}>Battle</Button>
      </div>
    );
  }
}
