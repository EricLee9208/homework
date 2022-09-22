#!/Users/yeosujin/.nvm/versions/node/v14.20.0/bin/node
//shebang to run script without having to type "node" everytime

const tLBorder = '╭';
const tRBorder = '╮';
const bLBorder = '╰';
const bRBorder = '╯';
const hLine = '\u2500';
const vLine = '\u2502';
const lMiddle = '\u251c';
const rMiddle = '\u2524';
const tDivide = "┬";
const bDivide = "┴";
const mDivide = "┼"


function longestStr(arr) {
    let max = 0;
    arr.forEach(element => {
        element.forEach(str => {
            if (str.length > max) {
                max = str.length;
            }
        });
    });
    return max
}

function createArr(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].split(","))
    }
    return result
}


function drawTopBorder(num, column) {
    let result = ""
    for (let i = 0; i < column - 1; i++) {
        if (i == 0) {
            result += tLBorder;
        }
        result += hLine.repeat(num)
        result += tDivide

        if (i == column - 2) {
            result += hLine.repeat(num)
            result += tRBorder
        }

    }
    return result
}


function drawBottomBorder(num, column) {
    let result = ""
    for (let i = 0; i < column - 1; i++) {
        if (i == 0) {
            result += bLBorder;
        }
        result += hLine.repeat(num)
        result += bDivide

        if (i == column - 2) {
            result += hLine.repeat(num)
            result += bRBorder
        }

    }
    return result
}


function drawMiddleBorder(num, column) {
    let result = ""
    for (let i = 0; i < column - 1; i++) {
        if (i == 0) {
            result += lMiddle;
        }
        result += hLine.repeat(num)
        result += mDivide

        if (i == column - 2) {
            result += hLine.repeat(num)
            result += rMiddle;
        }

    }
    return result
}

function drawBarsAround(insideArr, longest) {
    let result = '\u2502';
    insideArr.forEach(str => {
        if (str.length < longest) {
            result += str
            result += " ".repeat(longest - str.length)
            result += '\u2502'
        } else {
            result += str;
            result += '\u2502'
        }
    });
    return result
}


const { log } = require('console');
const fs = require('fs');

let dataArray = []

fs.readFile('character.csv', 'utf8', function (err, data) {
    dataArray = data.split(/\r?\n/);

    let columnCount = dataArray[0].split(",").length
    let arr = createArr(dataArray)
    let longest = longestStr(arr)


    console.log(drawTopBorder(longest, columnCount));

    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {

            console.log(drawBarsAround(arr[i], longest));
            break;
        } else {

            console.log(drawBarsAround(arr[i], longest));
            console.log(drawMiddleBorder(longest, columnCount));
        }
    }
    console.log(drawBottomBorder(longest, columnCount));
})

