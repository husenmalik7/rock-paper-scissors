// let rock = "3";
// let scissors = "2";
// let paper = "1";

// let player_score = 0;
// let computer_score = 0;

let player_hand = 1;
let computer_hand = 2;

if (player_hand != computer_hand) {
  if (player_hand == 1) {
    player_hand = player_hand + 3;
  }

  if (player_hand - 1 == computer_hand) {
    console.log("player win");
  } else {
    console.log("computer win");
  }
} else {
  console.log("draw");
}
