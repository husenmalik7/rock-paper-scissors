// Todo create loading for get data
// Todo create error handling if failed get data

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

let API_URL = "https://rock-paper-scissors-api-heroku.herokuapp.com/highscore";

export default class Highscores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highscores: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    Axios.get(API_URL, {
      headers: {
        "Access-Control-Allow-Origin": false,
      },
    })
      .then((item) => {
        this.setState({ highscores: item.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let { highscores } = this.state;

    return (
      <div className="Highscores">
        <table border="1px">
          <tbody>
            <tr>
              <th>name</th>
              <th>highscore</th>
            </tr>

            {highscores.map((h, index) => {
              return (
                <tr key={index}>
                  <th>{h.username}</th>
                  <th>{h.win_streak}</th>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Link to="/">
          <Button variant="danger">Back</Button>
        </Link>
      </div>
    );
  }
}
