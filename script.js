const grid = document.getElementsByClassName("grid"); // need to convert to array and then use foreach because it's html collection
const startBtn = document.getElementById("start"); // start button
const restartBtn = document.getElementById("restart"); // restart button
const overlayEel = document.getElementsByClassName("overlay"); // overlay
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2]; // 0 => tail , 1=> body , 2 => head
let direction = 1; // i make direction as varible beacuse it can change  (top / right /bottom / left ) depend on button i press
const width = 10; // the wdith of whole array or whole grid because i made grid 10 column
let appleIndex = 0;
let timerId = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.8; // snake speed
let snakeDead = false; // boolean value for checking you lose or not (snake insdie gird or not)

function createGrid() {
  // create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    // you need first to create element and put it on vairble
    const square = document.createElement("div");

    // add style by adding class to the new element
    square.classList.add("square");

    // covnvert grid to array to able to use foreach becasue its html collection as i mentioned at the top top push new ele to it
    Array.from(grid).forEach((ele) => ele.appendChild(square)); //forEach(currentValue , index , arr)

    // push square to squares array
    squares.push(square);
  }

  scoreDisplay.textContent = "";
  drawSnake();
}
createGrid();

startBtn.addEventListener("click", () => startGame());
restartBtn.addEventListener("click", () => restartGame());

// startBtn.addEventListener("click", () => setInterval(move, 1000));

// console.log(squares)

function move() {
  // make sure that index of current snake after direction is inside squares
  loseGame();
  if (snakeDead) return;

  // remove first element form array currentSnake => tail
  const tail = currentSnake.shift();
  //console.log(tail) // it will out put the number you remove from the array (first nubmer)  // i can get it also with currentSnake[0]  // same thing for push method
  //console.log(currentSnake)

  // remove styling form last element of array => currentSanke
  squares[tail].classList.remove("snake");

  // add square to element we are hiding you addin new ele to the array form the beginning
  currentSnake.push(currentSnake[currentSnake.length - 1] + direction);
  // add styling sow we can see it
  squares[currentSnake[currentSnake.length - 1]].classList.add("snake");
  if (
    squares[currentSnake[currentSnake.length - 1]].classList.contains("apple")
  ) {
    // the head of the snake hits apple
    squares[currentSnake[currentSnake.length - 1]].classList.remove("apple"); // remove the class apple
    squares[tail].classList.add("snake"); // grow our snake by adding class of snake to it
    currentSnake.unshift(tail); // grow our snake array
    generateApple(); // generate new apple
    score++; // add one to the score
    scoreDisplay.textContent = score; // add one to the score
    // speed up our snake
    clearInterval(timerId); // Clear time
    intervalTime *= speed;
    timerId = setInterval(move, intervalTime);
  }
}

function drawSnake() {
  currentSnake.forEach((curr) => squares[curr].classList.add("snake")); // hear to draw snake by ele of currentSnake as index in 100div (squares) and then add class ("snake") to color snake with green  // forEach(currentValue , index , arr)
}

function removeSanke() {
  currentSnake.forEach((curr) => squares[curr].classList.remove("snake")); // remove snake by ele of currentSnake as index in 100div (squares) and then remove class ("snake") to color snake with green  // forEach(currentValue , index , arr)
}

function removeApples() {
  squares.forEach((square) => square.classList.remove("apple")); // remove apples from board
}

function startGame() {
  if (timerId) return;
  scoreDisplay.textContent = 0;
  generateApple();
  drawSnake();
  timerId = setInterval(move, intervalTime); // to make the function every 1000ms
}

function restartGame() {
  removeApples();
  removeSanke();
  Array.from(overlayEel).forEach((overlay) => overlay.classList.add("d-none")); // remove overlay
  clearInterval(timerId); // Cleartime
  snakeDead = false;
  direction = 1; // i make direction as varible beacuse it can change  (top / right /bottom / left ) depend on button i press
  appleIndex = 0;
  scoreDisplay.textContent = "";
  timerId = 0;
  score = 0;
  currentSnake = [0, 1, 2];
  intervalTime = 1000;
  startGame();
}

function loseGame() {
  if (
    (currentSnake[currentSnake.length - 1] % width === 0 && direction === -1) || // snake's head is at the left wall
    (currentSnake[currentSnake.length - 1] % width === width - 1 &&
      direction === 1) || // snake's head is at the right wall
    (currentSnake[currentSnake.length - 1] - width < 0 &&
      direction === -width) || // snake's head is at the top wall
    (currentSnake[currentSnake.length - 1] + width >= width * width &&
      direction === width) || // snake'ss head is at the bottom wall
    squares[
      currentSnake[currentSnake.length - 1] + direction
    ].classList.contains("snake") // snake hit it self
  ) {
    // squares.forEach((square) => square.classList.remove("snake")); //remove snake from game
    console.log("you lose");
    Array.from(overlayEel).forEach((overlay) =>
      overlay.classList.remove("d-none")
    );
    clearInterval(timerId); // to stop the Moving function
    snakeDead = true;
  }
}

// lets start with keyboard code
/* document.addEventListener("keydown", (e) => {
  console.log(e.key); // e.g. "ArrowUp", "a", "Enter"
  console.log(e.code); // e.g. "ArrowUp", "KeyA", "Enter"
  console.log(e.keyCode); // e.g. "ArrowUp", "KeyA", "Enter" // old  and not use any more
}); */

/* function control(e) {
  if (e.key === "ArrowRight") {
    console.log("right pressed");
  } else if (e.key === "ArrowUp") {
    console.log("up pressed");
  } else if (e.key === "ArrowLeft") {
    console.log("left pressed");
  } else if (e.key === "ArrowDown") {
    console.log("down pressed");
  }
}

document.addEventListener("keydown", (e) => control(e)); */

function generateApple() {
  do {
    appleIndex = Math.round(Math.random() * (squares.length - 3 + 1)) + 1; // generate random nunmbers from 3 to 100 beacuse snake start from 0 , 1 , 2
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function changeDirection(e) {
  if (e.key === "ArrowRight" && direction !== -1) {
    console.log("right pressed");
    direction = 1;
  } else if (e.key === "ArrowUp" && direction !== width) {
    console.log("up pressed");
    direction = -width;
  } else if (e.key === "ArrowLeft" && direction !== 1) {
    console.log("left pressed");
    direction = -1;
  } else if (e.key === "ArrowDown" && direction !== -width) {
    console.log("down pressed");
    direction = +width;
  }
}

document.addEventListener("keydown", (e) => changeDirection(e));
