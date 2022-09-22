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

let x = 2;
let arr = []

//create array using user input. No limit to the input count
while (process.argv[x] != undefined) {
    arr.push(process.argv[x])
    x++
}

function drawLine(num) {
    console.log(hLine.repeat(num))
}

function drawTopBorder(num) {
    console.log(tLBorder, hLine.repeat(num), tRBorder);
}


function drawMiddleBorder(num) {
    console.log(lMiddle, hLine.repeat(num), rMiddle);
}


function drawBottomBorder(num) {
    console.log(bLBorder, hLine.repeat(num), bRBorder);
}


// Added maxLength parameter to align the bars properly
function drawBarsAround(str, maxLength) {
    if (str.length < maxLength) {
        console.log(vLine, str, " ".repeat(maxLength - str.length - 1), vLine);
    } else {
        console.log(vLine, str, vLine);
    }
}

function boxIt(arr) {
    let maxLength = 0;
    arr.forEach(element => {
        if (element.length > maxLength) {
            maxLength = element.length
        }
    });
    drawTopBorder(maxLength);

    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            drawBarsAround(arr[i], maxLength)
        } else {
            drawBarsAround(arr[i], maxLength)
            drawMiddleBorder(maxLength)
        }

    }

    drawBottomBorder(maxLength);
}

boxIt(arr) 