var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function findSpot(spot) {
    if (spot === 0) {
        return true;
    } else {
        return false;
    }
}

//console.log(findSpot(board[0][1]));
//cycle through two arrays and compare?
function threeInARow(array) {

    switch (array) {
        case n:

            break;
        default:
            return false;

    }
}
arrayA = [
    ["x", 0, 0],
    [0, "x", 0],
    [0, 0, "x"]
];
arrayB = [
    ["x", 0, 0],
    [0, "x", 0],
    [0, 0, "x"]
];


function arraysAreIdentical(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        for (var v = 0; v < arr1[i][v].length; v++) {
            if (arr1[i][v] !== arr2[i][v]) {
                return false;
            }
        }
    }
    return true;
}
console.log(arraysAreIdentical(arrayA, arrayB));
/* 
Winning Combos
board = [[x, 0, 0],[0, x, 0],[0, 0, x]];
board = [[x, x, x],[0, 0, 0],[0, 0, 0]];
board = [[0, x, 0],[0, x, 0],[0, x, 0]];
board = [[0, 0, x],[0, x, 0],[x, 0, 0]];
board = [[0, 0, 0],[x, x, x],[0, 0, 0]];
board = [[0, 0, x],[0, 0, x],[0, 0, x]];
board = [[x, 0, 0],[x, 0, 0],[x, 0, 0]];
board = [[0, x, 0],[0, x, 0],[0, x, 0]];
board = [[0, 0, 0],[0, 0, 0],[x, x, x]];


row win the sub array is full. board[0][i];
column win board[i][1] is covered for all three sub arrays.
angle win is when board[i][0],[1][2]
or [2][1][0]


*/