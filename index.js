/*

Tic-Tac-Toe

*/

var game = {
  // board: [["X", 0, 0], [0, 0, "O"], ["X", "O", "O"]], //test board
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  cpu: "X",
  user: "O"
};

//HTML elements
var gameStatus = document.getElementById("status");
var parent = document.getElementById("gameBoard");
var resetBtn = document.getElementById("reset");

//print the board array in a more readable fashion for console
function printBoard(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i][0], array[i][1], array[i][2]);
  }

  console.log("----------------"); //visual separator
}

//Given an array, this function will return true or false if a game winning combo is present
function victoryCheck(array, mark) {
  //Function that will check for sub array victory
  function horizontalVic(array, mark) {
    //check if array is full
    function checkForFullRow(array, mark) {
      if (array.length !== 3) {
        return false;
      }
      for (var i = 0; i < array.length; i++) {
        if (array[i] !== mark) {
          return false;
        }
      }
      return true;
    }
    for (var i = 0; i < array.length; i++) {
      if (checkForFullRow(array[i], mark)) {
        return true;
      }
    }
    return false;
  }

  //Function that will check for column victory
  function columnVic(array, mark) {
    for (var i = 0; i < array.length; i++) {
      for (var v = 0; v < array.length; v++) {
        //	console.log(array[v][i]);
        if (array[v][i] !== mark) {
          //console.log("break");
          break;
        }
        //if it is the last item and loop not broken, declare victory.
        if (v === 2) {
          return true;
        }
      }
    }
    return false;
  }
  //Function that will check for angle victory
  function angleVic(array, mark) {
    var i = 0;
    if (
      mark === array[0][i] &&
      mark === array[1][i + 1] &&
      mark === array[2][i + 2]
    ) {
      return true;
    } else if (
      mark === array[0][i + 2] &&
      mark === array[1][i + 1] &&
      mark === array[2][i]
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Calling functions to check for victory
  if (horizontalVic(array, mark)) {
    return true;
  } else if (columnVic(array, mark)) {
    return true;
  } else if (angleVic(array, mark)) {
    return true;
  } else {
    return false;
  }
}

//Checks for open spots, and returns true if no open spots are found
//Only to be used after checking for victory
function checkTie(array) {
  for (var i = 0; i < array.length; i++) {
    for (var v = 0; v < array.length; v++) {
      //If an empty spot is found, there is no tie
      if (array[i][v] === 0) {
        return false;
      }
    }
  }

  return true;
}

//Given coordinates this function will place a mark on the board. Array is the board, mark is "X" or "O" and i, v are coordinates
function moveOnBoard(array, mark, i, v) {
  var newBoard = JSON.parse(JSON.stringify(array)); //Copy of the board
  newBoard[i][v] = mark;

  //Convert numbers into "0 0" format to search HTML ID
  var targetCoordsId = i.toString() + " " + v.toString();
  var compTarget = document.getElementById(targetCoordsId);

  //Disable button
  compTarget.disabled = true;
  //Display mark on button
  compTarget.innerHTML = mark;

  return newBoard;
}

//will return a new board with the computer's move completed
function computerTurn(array, mark, userMark) {
  //returns an object with all the possible moves for one spot.
  function moveGenerator(arr, index, index2, mark) {
    var left = -1;
    var right = 1;
    var up = -1;
    var down = 1;

    function moveVertical(arr, index, index2, mark, dir) {
      var tempArr = JSON.parse(JSON.stringify(arr));
      var counter = 0;
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        if (
          tempArr[index + i * dir][index2] === 0 ||
          tempArr[index + i * dir][index2] === mark
        ) {
          if (tempArr[index + i * dir][index2] !== mark) {
            tempArr[index + i * dir][index2] = mark;
            counter++;
          }
        } else {
          return false;
        }
      }
      obj = {
        index: index,
        index2: index2,
        arr: tempArr,
        counter: counter
      };
      return obj;
    }

    function moveHorizontal(arr, index, index2, mark, dir) {
      var tempArr = JSON.parse(JSON.stringify(arr));
      var counter = 0;
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        if (
          tempArr[index][index2 + i * dir] === 0 ||
          tempArr[index][index2 + i * dir] === mark
        ) {
          if (tempArr[index][index2 + i * dir] !== mark) {
            tempArr[index][index2 + i * dir] = mark;
            counter++;
          }
        } else {
          return false;
        }
      }
      obj = {
        index: index,
        index2: index2,
        arr: tempArr,
        counter: counter
      };
      return obj;
    }

    function diaUp(arr, index, index2, mark) {
      var tempArr = JSON.parse(JSON.stringify(arr));
      var counter = 0;
      var obj = {};
      var tempIndex = 0;
      var tempIndex2 = 2;
      for (var i = 0; i < arr.length; i++) {
        if (
          tempArr[tempIndex + i][tempIndex2 - i] === 0 ||
          tempArr[tempIndex + i][tempIndex2 - i] === mark
        ) {
          if (tempArr[tempIndex + i][tempIndex2 - i] !== mark) {
            tempArr[tempIndex + i][tempIndex2 - i] = mark;
            counter++;
          }
        } else {
          return false;
        }
      }
      obj = {
        index: index,
        index2: index2,
        arr: tempArr,
        counter: counter
      };
      return obj;
    }

    function diaDown(arr, index, index2, mark) {
      var tempArr = JSON.parse(JSON.stringify(arr));
      var counter = 0;
      var obj = {};
      var tempIndex = 0;
      var tempIndex2 = 0;
      for (var i = 0; i < arr.length; i++) {
        if (
          tempArr[tempIndex + i][tempIndex2 + i] === 0 ||
          tempArr[tempIndex + i][tempIndex2 + i] === mark
        ) {
          if (tempArr[tempIndex + i][tempIndex2 + i] !== mark) {
            tempArr[tempIndex + i][tempIndex2 + i] = mark;
            counter++;
          }
        } else {
          return false;
        }
      }
      obj = {
        index: index,
        index2: index2,
        arr: tempArr,
        counter: counter
      };
      return obj;
    }

    function upDown(arr, index, index2, mark) {
      var tempArr = JSON.parse(JSON.stringify(arr));
      var counter = 0;
      var obj = {};
      var tempIndex = 0;
      for (var i = 0; i < arr.length; i++) {
        if (
          tempArr[tempIndex + i][index2] === 0 ||
          tempArr[tempIndex + i][index2] === mark
        ) {
          if (tempArr[tempIndex + i][index2] !== mark) {
            tempArr[tempIndex + i][index2] = mark;
            counter++;
          }
        } else {
          return false;
        }
      }
      obj = {
        index: index,
        index2: index2,
        arr: tempArr,
        counter: counter
      };
      return obj;
    }

    function leftRight(arr, index, index2, mark) {
      var tempArr = JSON.parse(JSON.stringify(arr));
      var counter = 0;
      var obj = {};
      var tempIndex = 0;
      for (var i = 0; i < arr.length; i++) {
        if (
          tempArr[index][tempIndex + i] === 0 ||
          tempArr[index][tempIndex + i] === mark
        ) {
          if (tempArr[index][tempIndex + i] !== mark) {
            tempArr[index][tempIndex + i] = mark;
            counter++;
          }
        } else {
          return false;
        }
      }
      obj = {
        index: index,
        index2: index2,
        arr: tempArr,
        counter: counter
      };
      return obj;
    }

    //Object containing possible moves for one spot
    var combos = {};

    switch (index) {
      case 0:
        if (moveVertical(arr, index, index2, mark, down)) {
          combos.index = moveVertical(arr, index, index2, mark, down);
        }
        break;
      case 1:
        if (upDown(arr, index, index2, mark)) {
          combos.index = upDown(arr, index, index2, mark);
        }
        break;
      case 2:
        if (moveVertical(arr, index, index2, mark, up)) {
          combos.index = moveVertical(arr, index, index2, mark, up);
        }
        break;
    }

    switch (index2) {
      case 0:
        if (moveHorizontal(arr, index, index2, mark, right)) {
          combos.index2 = moveHorizontal(arr, index, index2, mark, right);
        }
        break;
      case 1:
        if (leftRight(arr, index, index2, mark)) {
          combos.index2 = leftRight(arr, index, index2, mark);
        }
        break;
      case 2:
        if (moveHorizontal(arr, index, index2, mark, left)) {
          combos.index2 = moveHorizontal(arr, index, index2, mark, left);
        }
        break;
    }

    //Test diagonal combinations
    if ((index === 0 && index2 === 0) || (index === 2 && index2 === 2)) {
      if (diaDown(arr, index, index2, mark)) {
        combos.dia = diaDown(arr, index, index2, mark);
      }
    } else if ((index === 2 && index2 === 0) || (index === 0 && index2 === 2)) {
      if (diaUp(arr, index, index2, mark)) {
        combos.dia = diaUp(arr, index, index2, mark);
      }
    } else if (index === 1 && index2 === 1) {
      if (diaUp(arr, index, index2, mark)) {
        combos.dia = diaUp(arr, index, index2, mark);
      }
      if (diaDown(arr, index, index2, mark)) {
        combos.dia2 = diaDown(arr, index, index2, mark);
      }
    }
    return combos;
  }

  //Pass an object with moves, returns the one best move. Best is least number of turns to win
  function bestMove(movesObj) {
    var tempObj = {};

    for (var prop in movesObj) {
      if (movesObj[prop].counter === 1) {
        tempObj = movesObj[prop];
        return tempObj;
      } else if (movesObj[prop].counter === 2) {
        tempObj = movesObj[prop];
      }
    }
    return tempObj;
  }

  //Cycle through each open point, and check if the user will win, if the user will win return an object with location/ else return false.
  function checkUserWin(arr, userMark) {
    var tempObj = {};

    for (var i = 0; i < arr.length; i++) {
      for (var v = 0; v < arr[i].length; v++) {
        if (arr[i][v] === 0) {
          //plug in userMark on the point, check victory, if true return point.
          let tempArr = JSON.parse(JSON.stringify(arr));
          tempArr[i][v] = userMark;
          //console.log(tempArr, victoryCheck(tempArr, userMark), "victory check");
          if (victoryCheck(tempArr, userMark)) {
            tempObj.index = i;
            tempObj.index2 = v;
            return tempObj;
          }
        }
      }
    }
    return false;
  }

  //cycle through the board, find and pick the best move for every spot, and pick the best of those moves.
  function nextMove(arr, mark) {
    var tempObj = {};
    //just used for object index
    var objCounter = 0;
    //cycling through every open spot to check for best moves.
    for (let i = 0; i < arr.length; i++) {
      for (let v = 0; v < arr[i].length; v++) {
        if (arr[i][v] === 0) {
          //don't want to add empty objects to the tempObj
          if (
            Object.keys(bestMove(moveGenerator(arr, i, v, mark))).length !== 0
          ) {
            tempObj["item" + objCounter] = bestMove(
              moveGenerator(arr, i, v, mark)
            );
          }
        }
        objCounter++;
      }
    }

    //defeat coner trap; delete corner options for computer
    var corner = [[0, 0, userMark], [0, mark, 0], [userMark, 0, 0]];
    for (let i = 0; i < arr.length; i++) {
      for (let v = 0; v < arr[i].length; v++) {
        if (arr[i][v] !== corner[i][v]) {
          break;
        }
        if (i == 2 && v == 2) {
          for (let item in tempObj) {
            if (tempObj[item].index == 2 && tempObj[item].index2 === 2) {
              delete tempObj[item];
            }
          }
        }
      }
    }

    //if there are no best moves in this case I want to pick the move with the most number of options
    //cycle and check for most available paths to victory
    //console.log(bestMove(moveGenerator(arr, 1, 0, mark)));
    if (Object.keys(tempObj).length === 0) {
      //cycle through each point
      var tempArr = [];
      for (let i = 0; i < arr.length; i++) {
        for (let v = 0; v < arr[i].length; v++) {
          //check for open spot
          if (arr[i][v] === 0) {
            //call movegenerator, it will return all options for each point(obj)
            tempArr.push(moveGenerator(arr, i, v, mark));
          }
        }
      }
      //setting an object to the first item of the array which contains all possible moves for each spot
      tempObj = tempArr[0];
      //cycle through array and check which  object is longer, longer array will be set to tempObj
      //Longer object in array will contain more possible paths.
      for (let j = 1; j < tempArr.length; j++) {
        if (Object.keys(tempArr[j]).length > Object.keys(tempObj).length) {
          tempObj = tempArr[j];
        }
      }

      //if the remaining spots do not have a path to victory, pick the first available spot.
      if (Object.keys(tempObj).length === 0) {
        for (let i = 0; i < arr.length; i++) {
          for (let v = 0; v < arr[i].length; v++) {
            //check for open spot
            if (arr[i][v] === 0) {
              tempObj = {};
              tempObj.index = i;
              tempObj.index2 = v;
              return tempObj;
            }
          }
        }
      }
      //return object.index or .index2 because that will contain the coordinates necessary to make the move
      return tempObj.index || tempObj.index2;
    }
    return bestMove(tempObj);
  }

  var myMove = nextMove(array, mark);

  //Check if computer is going to win
  if (myMove.counter === 1) {
    return moveOnBoard(array, mark, myMove.index, myMove.index2);
  }
  //use if statement to check if user is about to win, if so block the win.
  if (checkUserWin(array, userMark)) {
    var myBlockMove = checkUserWin(array, userMark);
    return moveOnBoard(array, mark, myBlockMove.index, myBlockMove.index2);
  }

  return moveOnBoard(array, mark, myMove.index, myMove.index2);
}

function resetGame() {
  //Reset array board
  game.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  //Reset html board
  var boardElements = document.querySelectorAll(".board");
  for (var i = 0; i < boardElements.length; i++) {
    //Erases marks and enables buttons
    boardElements[i].innerHTML = "";
    boardElements[i].disabled = false;
  }

  //Add Event listener to board
  document.getElementById("gameBoard").addEventListener("click", myTurn);

  //Hide reset interface
  resetOff();
}

//Reset on and off display and hide the reset button interface
function resetOn() {
  document.getElementById("overlay").style.display = "block";
}
function resetOff() {
  document.getElementById("overlay").style.display = "none";
}

//Choose mark interface hide and display functions
function chooseMarkOn() {
  document.getElementById("chooseOverlay").style.display = "block";
}
function chooseMarkOff() {
  document.getElementById("chooseOverlay").style.display = "none";
}

//Function allows user to choose between X and O
function chooseMark(event) {
  game.user = event.target.id;
  if (game.user === "X") {
    game.cpu = "O";
  } else {
    game.cpu = "X";
  }

  //Enable the board once player has chosen a mark
  parent.addEventListener("click", myTurn);
  resetBtn.addEventListener("click", resetGame);

  //Hide the choose interface
  chooseMarkOff();
}

//Function called on every click
function myTurn(event) {
  var x = event.target.id;
  var coords = x.split(" ");

  //convert strings in coordinates to number
  for (var i = 0; i < coords.length; i++) {
    coords[i] = parseInt(coords[i]);
  }

  //Use the coordinates on array to change the board array
  var newBoard = moveOnBoard(game.board, game.user, coords[0], coords[1]);
  game.board = newBoard;

  //Once the move has been made, check for win or tie
  if (victoryCheck(game.board, game.user)) {
    gameStatus.innerHTML = "You Win!";
    parent.removeEventListener("click", myTurn);
    resetOn();
    return;
  }
  if (checkTie(game.board)) {
    gameStatus.innerHTML = "Tie Game!";
    parent.removeEventListener("click", myTurn);
    resetOn();
    return;
  }

  //Begin the computer's turn if user hasn't won or tie game
  var compBoard = computerTurn(game.board, game.cpu, game.user);
  game.board = compBoard;

  //Once computer has moved, check for win or tie
  if (victoryCheck(game.board, game.cpu)) {
    gameStatus.innerHTML = "You Lose!";
    parent.removeEventListener("click", myTurn);
    resetOn();
    return;
  }
  if (checkTie(game.board)) {
    gameStatus.innerHTML = "Tie Game!";
    parent.removeEventListener("click", myTurn);
    resetOn();
    return;
  }
}

document.getElementById("choose").addEventListener("click", chooseMark);
chooseMarkOn();

// computer's turn for debugging.
// printBoard(game.board);
// var board2 = computerTurn(board, cpuMark, opponentMark);
// board = board2;
// printBoard(game.board);
