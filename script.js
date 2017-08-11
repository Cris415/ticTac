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

console.log(findSpot(board[0][1]));
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
if (arrayA === arrayB) {
    console.log("array a and b are equal");
} else {
    console.log("not equal");
}
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