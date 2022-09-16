#!/Users/yeosujin/.nvm/versions/node/v14.20.0/bin/node


const tLBorder = '╭';
const tRBorder = '╮';
const bLBorder = '╰';
const bRBorder = '╯';
const hLine = '\u2500';
const vLine = '\u2502';
const lMiddle = '\u251c';
const rMiddle = '\u2524';

// let temp = [process.argv[2],process.argv[3],process.argv[4]]
let x = 2;
let arr = []

while (process.argv[x] != undefined) {
    arr.push(process.argv[x])
    x++
}

// temp.forEach(element => {
//   if(element != undefined){
//     arr.push(element)
//   }  


// });


function drawLine(num) {
    console.log(hLine.repeat(num))
}

//drawLine(4);
//drawLine(8);

function drawTopBorder(num) {
    console.log(tLBorder, hLine.repeat(num), tRBorder);
}

//drawTopBorder(9)

function drawMiddleBorder(num) {
    console.log(lMiddle, hLine.repeat(num), rMiddle);
}

//drawMiddleBorder(9)

function drawBottomBorder(num) {
    console.log(bLBorder, hLine.repeat(num), bRBorder);
}

//drawBottomBorder(9)

function drawBarsAround(str, maxLength) {
    if (str.length < maxLength) {
        console.log(vLine, str, " ".repeat(maxLength - str.length - 1), vLine);
    } else {
        console.log(vLine, str, vLine);
    }
}

//drawBarsAround("My Name is Dan")

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