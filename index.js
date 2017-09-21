//this is a tic tac toe program, written in js, styled in css, and stuff in html.

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// var board = [["X", 0, 0], [0, 0, "O"], ["X", "O", "O"]]; //test board
var cpu = "X";
var user = "O";

//HTML elements
var gameStatus = document.getElementById("status");
var parent = document.getElementById("gameBoard");
var resetBtn = document.getElementById("reset");


//print the board array in a more readable fashion
function printBoard(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i][0], arr[i][1], arr[i][2]);
    }
    console.log("----------------");
}

//Given an array, this function will return true or false if a game winning combo is present
function victoryCheck(array, mark) {
    //function that will check for sub array victory
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

    //function that will check for column victory
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
                    //console.log("victory");
                    return true;
                }
            }
        }
        return false;
    }
    //function that will check for angle victory
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

//checks for open spots returns true if no open spots
function checkTie(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var v = 0; v < arr.length; v++) {
            if (arr[i][v] === 0) {
                return false;
            }
        }
    }

    return true;
}

//given a coordinates this function will place a mark on the board. arr is board, mark is "x" or "O" and i, v are coordinates
function moveOnBoard(arr, mark, i, v) {
    var newBoard = JSON.parse(JSON.stringify(arr));
    newBoard[i][v] = mark;
    //console.log(i, v, "computer's moves");  
    //convert numbers into "0 0" format to search id
    var targetCoordsId = (i).toString() + " " + (v).toString();
    var compTarget = document.getElementById(targetCoordsId);
    compTarget.disabled = true;
    compTarget.innerHTML = mark;
    return newBoard;
}

//will return a new board with the computer's move completed
function computerTurn(arr, mark, userMark) {
    //returns an object with all the possible moves for one spot.
    function moveGenerator(arr, index, index2, mark) {
        function moveUp(arr, index, index2, mark) {
            var tempArr = JSON.parse(JSON.stringify(arr));
            var counter = 0;
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (
                    tempArr[index - i][index2] === 0 ||
                    tempArr[index - i][index2] === mark
                ) {
                    if (tempArr[index - i][index2] !== mark) {
                        tempArr[index - i][index2] = mark;
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

        function moveDown(arr, index, index2, mark) {
            var tempArr = JSON.parse(JSON.stringify(arr));
            var counter = 0;
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (
                    tempArr[index + i][index2] === 0 ||
                    tempArr[index + i][index2] === mark
                ) {
                    if (tempArr[index + i][index2] !== mark) {
                        tempArr[index + i][index2] = mark;
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

        function moveLeft(arr, index, index2, mark) {
            var tempArr = JSON.parse(JSON.stringify(arr));
            var counter = 0;
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (
                    tempArr[index][index2 - i] === 0 ||
                    tempArr[index][index2 - i] === mark
                ) {
                    if (tempArr[index][index2 - i] !== mark) {
                        tempArr[index][index2 - i] = mark;
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

        function moveRight(arr, index, index2, mark) {
            var tempArr = JSON.parse(JSON.stringify(arr));
            var counter = 0;
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (
                    tempArr[index][index2 + i] === 0 ||
                    tempArr[index][index2 + i] === mark
                ) {
                    if (tempArr[index][index2 + i] !== mark) {
                        tempArr[index][index2 + i] = mark;
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
        var combos = {};
        switch (index) {
            case 0:
                if (moveDown(arr, index, index2, mark)) {
                    combos.index = moveDown(arr, index, index2, mark);
                }
                break;
            case 1:
                if (upDown(arr, index, index2, mark)) {
                    combos.index = upDown(arr, index, index2, mark);
                }
                break;
            case 2:
                if (moveUp(arr, index, index2, mark)) {
                    combos.index = moveUp(arr, index, index2, mark);
                }
                break;
        }

        switch (index2) {
            case 0:
                if (moveRight(arr, index, index2, mark)) {
                    combos.index2 = moveRight(arr, index, index2, mark);
                }
                break;
            case 1:
                if (leftRight(arr, index, index2, mark)) {
                    combos.index2 = leftRight(arr, index, index2, mark);
                }
                break;
            case 2:
                if (moveLeft(arr, index, index2, mark)) {
                    combos.index2 = moveLeft(arr, index, index2, mark);
                }
                break;
        }
        //testing diagonal combinations
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

    //pass an object with moves, returns the one best move. Best = least number of turns to win
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

    //cycle through each open point, and check if the user will win, if the user will win return an object with location/ else return false.
    function checkUserWin(arr, userMark) {
        //loop cycles through each open point
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
                        tempObj["item" + objCounter] = bestMove(moveGenerator(arr, i, v, mark));
                    }
                }
                objCounter++;
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

    var myMove = nextMove(arr, mark);

    //Check if computer is going to win
    if (myMove.counter === 1) {
        return moveOnBoard(arr, mark, myMove.index, myMove.index2);
    }
    //use if statement to check if user is about to win, if so block the win.
    if (checkUserWin(arr, userMark)) {
        var myBlockMove = checkUserWin(arr, userMark);
        return moveOnBoard(arr, mark, myBlockMove.index, myBlockMove.index2);
    }
    return moveOnBoard(arr, mark, myMove.index, myMove.index2);
}

//Create a reset game function
function resetGame() {

    gameStatus.innerHTML = "Game On!";
    //reset board
    game.board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    //reset html board

    var boardElements = document.querySelectorAll(".board");
    for (var i = 0; i < boardElements.length; i++) {

        boardElements[i].innerHTML = "";
        boardElements[i].disabled = false;
    }
    //add Event listener

    document.getElementById("gameBoard").addEventListener("click", myTurn);
    resetOff();
}

//reset on and off work with css to hide and display the button
function resetOn() {
    document.getElementById("overlay").style.display = "block";
}

function resetOff() {
    document.getElementById("overlay").style.display = "none";
}

function chooseMarkOn() {
    document.getElementById("chooseOverlay").style.display = "block";
}

function chooseMarkOff() {
    document.getElementById("chooseOverlay").style.display = "none";
}

function myTurn(event) {

    var x = event.target.id;
    var coord = x.split(" ");

    //convert each string to number
    for (var i = 0; i < coord.length; i++) {
        coord[i] = parseInt(coord[i]);
    }

    //Use the coordinates on array to change the board array
    var newBoard = moveOnBoard(game.board, game.user, coord[0], coord[1]);
    game.board = newBoard;
    event.target.disabled = true;
    event.target.innerHTML = game.user;

    if (victoryCheck(game.board, game.user)) {
        gameStatus.innerHTML = "You Win!"
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
    var compBoard = computerTurn(game.board, game.cpu, game.user);
    game.board = compBoard;
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
    printBoard(game.board);

}

//function allows user to choose btween x and o
function chooseMark(event) {
    game.user = event.target.id;
    if (game.user === "X") {
        game.cpu = "O";
    } else {
        game.cpu = "X";
    }
    //enable the board once player has chosen a mark
    parent.addEventListener("click", myTurn);
    resetBtn.addEventListener("click", resetGame);
    //hide overlay
    chooseMarkOff();
}

document.getElementById("choose").addEventListener("click", chooseMark);
chooseMarkOn();














//how to use computer's turn for debugging.
// printBoard(board);
// var board2 = computerTurn(board, cpuMark, opponentMark);
// board = board2;
// printBoard(board);