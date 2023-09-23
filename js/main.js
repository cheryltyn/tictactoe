const colors = {
    "-1" : "red",
    "1" : "yellow", 
    "null" : "white"
}
var turn = 1
var winner = null
const header = document.getElementById("turn")
var board = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', 'button7', 'button8', 'button9'];
/* need to add the above so it's a global variable right? */ 
const restart = document.getElementById('restart') 
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function initialise() {
  board = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', 'button7', 'button8', 'button9'];
  turn = 1; 
  winner = null; 
}

function resetBoard() {
  initialise()
  header.innerHTML = 'Start Game'
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.style.backgroundColor = 'white';  // set color to white
    button.disabled = false;        
  });
}

function renderMessage() {
  if (winner === "T") {
    header.innerHTML = "It's a tie"; 
    disableAllButtons()
  }
  if (winner === null) {
    header.innerHTML = `${capitalizeFirstLetter(colors[turn])}'s turn`; 
  }
  if (winner === 1) {
    header.innerHTML = `${capitalizeFirstLetter(colors[turn])} has won. Game End!`;
    disableAllButtons()
  }
  if (winner === -1) {
    header.innerHTML = `${capitalizeFirstLetter(colors[turn])} has won. Game End!`;
    disableAllButtons()
  }
}

function setColor(button, turn) {
  const color = colors[turn];
  button.style.backgroundColor = color;
}

function toggleUserTurn() {
  if (winner === null) {
    turn = -turn
  }
}

function handleButtonClick(event) {
  const buttonId = event.target.id;
  const buttonIndex = board.indexOf(buttonId);
  if (buttonIndex !== -1) {
    setColor(event.target,turn);
    board.splice(buttonIndex, 1);
    checkWinnerByColor()
    toggleUserTurn()
    checkTie(board)
    renderMessage() 
  } else {
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function checkWinnerByColor() {
  const buttons = document.querySelectorAll('.button');
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  
    [0, 4, 8], [2, 4, 6]  
  ];

  for (const pattern of winPatterns) {
    const [button1, button2, button3] = pattern.map(index => buttons[index]);
    const color1 = getComputedStyle(button1).backgroundColor;
    const color2 = getComputedStyle(button2).backgroundColor;
    const color3 = getComputedStyle(button3).backgroundColor;

    if (color1 && color1 === color2 && color1 === color3 && color1 != 'rgb(255, 255, 255)') {
      winner = turn;  
    }
  }
}

function checkTie(board) {
  if (board.length === 0 && winner === null) {
      winner = "T"
      
    }
  }

for (let i = 1; i <= 9; i++) {
    const button = document.getElementById(`button${i}`);
    button.addEventListener('click', handleButtonClick);
  }
  
restart.addEventListener('click', resetBoard);