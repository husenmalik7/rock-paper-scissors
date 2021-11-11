import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Pagin } from "../components/Pagin";

import "../styles/high-scores.css";

const API_URL = process.env.REACT_APP_API_URL;

export default class Highscores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highscores: [],
      errorMessage: "",
      isLoading: false,
      paginationObject: {},
      pagination: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData(page) {
    this.setState({ isLoading: true });

    const paramsPage = new URLSearchParams(window.location.search).get("page");
    if (paramsPage) page = paramsPage;

    Axios.get(API_URL, { params: { page: page } })
      .then((item) => {
        let paginationObject = setPaginationObject(item);
        handleOverPage(page, paginationObject, this.props);
        let pagination = setPagination(paginationObject);

        this.setState({
          highscores: item.data.data,
          isLoading: false,
          paginationObject: paginationObject,
          pagination: pagination,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMessage: error.message, isLoading: false });
      });

    function setPaginationObject(item) {
      let paginationObject = {};

      paginationObject.page = item.data.page;
      paginationObject.iterator = item.data.iterator;
      paginationObject.endingLink = item.data.endingLink;
      paginationObject.numberOfPages = item.data.numberOfPages;

      return paginationObject;
    }

    function handleOverPage(page, paginationObject, props) {
      if (page > paginationObject.page) {
        props.history.push("/highscores?page=" + paginationObject.page);
      } else if (page < 1) {
        props.history.push("/highscores?page=1");
      }
    }

    function setPagination(paginationObject) {
      let pagination = [];
      for (
        let i = paginationObject.iterator;
        i <= paginationObject.endingLink;
        i++
      ) {
        if (i > 0) {
          pagination.push(i);
        }
      }

      return pagination;
    }
  }

  render() {
    let { highscores, errorMessage, isLoading, paginationObject, pagination } =
      this.state;

    return (
      <div className="highscores">
        {errorMessage ? (
          <p className="center">{errorMessage}</p>
        ) : (
          <>
            {isLoading ? (
              <div className="center">
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <>
                <h1>HIGH SCORES</h1>

                <table>
                  <tbody>
                    <tr>
                      <th>USERNAME</th>
                      <th>WIN STREAKS</th>
                      <th>DATE</th>
                    </tr>

                    {highscores.map((h, index) => {
                      return (
                        <tr key={index}>
                          <td>{h.username}</td>
                          <td>{h.win_streak}</td>
                          <td>{h.created_at}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <h4 className="button-3d-highscores go-font">Back</h4>
                  </Link>

                  <div
                    style={{
                      paddingLeft: "10em",
                      paddingRight: "10em",
                    }}
                  >
                    <Pagin
                      paginationObject={paginationObject}
                      paginationState={pagination}
                    />
                  </div>

                  <Link to="/play" style={{ textDecoration: "none" }}>
                    <h4 className="button-3d-highscores go-font">Play</h4>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
