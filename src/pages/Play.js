import React, { Component } from "react";

export default class Play extends Component {
  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: "gray",
            height: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "red",
              height: "10%",
              width: "100%",

              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <p>ROUND 1</p>
          </div>

          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundColor: "lime",
                height: "90vh",
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "blue",
                  height: "30%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>ROCK</p>
              </div>

              <div
                style={{
                  backgroundColor: "red",
                  height: "30%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>SCISSORS</p>
              </div>

              <div
                style={{
                  backgroundColor: "gold",
                  height: "30%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>PAPER</p>
              </div>

              <div
                style={{
                  backgroundColor: "green",
                  height: "10%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>SELECT YOUR HAND</p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "tomato",
                height: "90vh",
                width: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>VS</p>
            </div>

            <div
              style={{
                backgroundColor: "salmon",
                height: "90vh",
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "blue",
                  height: "30%",
                  width: "100%",
                }}
              />

              <div
                style={{
                  backgroundColor: "red",
                  height: "30%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>?</p>
              </div>

              <div
                style={{
                  backgroundColor: "gold",
                  height: "30%",
                  width: "100%",
                }}
              />

              <div
                style={{
                  backgroundColor: "green",
                  height: "10%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>COMPUTER HAND</p>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "1",
              backgroundColor: "gray",
              // backgroundColor: "transparent",

              width: "50%",
              height: "50%",
            }}
          >
            <div
              style={{
                backgroundColor: "green",
                height: "25%",
                width: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>YOU LOSE</p>
            </div>

            <div
              style={{
                backgroundColor: "lime",
                height: "50%",
                width: "100%",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>ENTER USERNAME</p>
              <p>INPUTAN</p>
              <p>SUBMIT</p>
            </div>

            <div
              style={{
                backgroundColor: "gold",
                height: "25%",
                width: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <p>PLAY AGAIN</p>
              <p>HOME</p>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "2",
              // backgroundColor: "gray",
              backgroundColor: "transparent",

              width: "50%",
              height: "50%",
            }}
          />
        </div>
      </>
    );
  }
}

// .center {
//   display: flex;
//   align-items: center;
//   height: 100vh;
// }

// position: absolute;
// left: 0px;
// top: 0px;
// z-index: -1;
