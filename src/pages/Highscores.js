import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Pagin } from "../components/Pagin";

import "../styles/high-scores.css";

// const API_URL = "https://rock-paper-scissors-api-heroku.herokuapp.com/highscore";
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
        {isLoading === true ? <p>sedang loading</p> : <p>tidka loading</p>}

        <p>{errorMessage}</p>

        <Pagin
          paginationObject={paginationObject}
          paginationState={pagination}
        />

        {paginationObject.page > 1 ? (
          <a href={`/highscores?page=${paginationObject.page - 1}`}>Before</a>
        ) : null}

        {pagination.map((p, index) => {
          return (
            <a
              key={index}
              href={`highscores?page=${p}`}
              style={p === paginationObject.page ? { color: "red" } : null}
            >
              {p}
            </a>
          );
        })}

        {paginationObject.page < paginationObject.numberOfPages ? (
          <a href={`/highscores?page=${paginationObject.page + 1}`}>After</a>
        ) : null}

        <table border="1px">
          <tbody>
            <tr>
              <th>username</th>
              <th>highscore</th>
              <th>created_at</th>
            </tr>

            {highscores.map((h, index) => {
              return (
                <tr key={index}>
                  <th>{h.username}</th>
                  <th>{h.win_streak}</th>
                  <th>{h.created_at}</th>
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
