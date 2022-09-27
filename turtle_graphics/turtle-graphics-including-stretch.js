const fs = require("fs");

class Turtle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.arr = [];
    this.rights = 0;
    this.lefts = 0;
    this.arr.push([this.x, this.y]);
    this.str = "";
    this.maxY = 0;
    this.maxX = 0;
    return this;
  }
  forward(step) {
    if (this.rights == 0 && this.lefts == 0) {
      for (let i = 0; i < step; i++) {
        this.x += 1;
        this.arr.push([this.x, this.y]);
      }
    }
    if (this.rights == 1 && this.lefts == 0) {
      for (let i = 0; i < step; i++) {
        this.y += 1;
        this.arr.push([this.x, this.y]);
      }
    }

    if (this.lefts == 1 && this.rights == 0) {
      for (let i = 0; i < step; i++) {
        this.y -= 1;
        this.arr.push([this.x, this.y]);
      }
    }
    if (this.lefts == 1 && this.rights == 1) {
      for (let i = 0; i < step; i++) {
        this.x -= 1;
        this.arr.push([this.x, this.y]);
      }
    }

    return this;
  }
  right() {
    if (this.rights == 1 && this.lefts == 1) {
      this.rights -= 1;
    } else if (this.rights == 0 && this.lefts == 1) {
      this.lefts -= 1;
    } else if (this.rights == 1 && this.lefts == 0) {
      this.lefts += 1;
    } else {
      this.rights += 1;
    }

    return this;
  }
  left() {
    if (this.lefts == 1 && this.rights == 1) {
      this.lefts -= 1;
    } else if (this.lefts == 1 && this.rights == 0) {
      this.rights += 1;
    } else if (this.lefts == 0 && this.rights == 1) {
      this.rights -= 1;
    } else {
      this.lefts += 1;
    }

    return this;
  }
  allPoints() {
    return this.arr;
  }
  print() {
    this.maxX = this.arr.sort((a, b) => a[0] - b[0]);
    this.maxX = this.arr[this.arr.length - 1][0];
    this.maxY = this.arr.sort((a, b) => a[1] - b[1]);
    this.maxY = this.arr[this.arr.length - 1][1];
    this.str += "--BEGIN LOG \n";
    for (let y = 0; y <= this.maxY; y++) {
      for (let x = 0; x <= this.maxX + 1; x++) {
        if (this.arr.find((element) => element[0] === x && element[1] === y)) {
          this.str += "●";
        } else {
          this.str += "○";
        }
      }
      this.str += "\n";
    }
    this.str += "--END LOG";
    return this.str;
  }
}

// Function to split the script input into an array
// and run the script using the values
function runTurtleScript(input) {
  let inputArr = input.split("-");
  let a;

  if (inputArr[0][0] == "t") {
    a = new Turtle(
      parseInt(inputArr[0].slice(1, inputArr[0].indexOf(","))),
      parseInt(inputArr[0].slice(inputArr[0].indexOf(",") + 1))
    );
  } else {
    a = new Turtle(0, 0);
  }
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i][0] == "f") {
      a.forward(parseInt(inputArr[i].slice(1)));
    }
    if (inputArr[i][0] == "r") {
      a.right();
    }
    if (inputArr[i][0] == "l") {
      a.left();
    }
  }
  return a.print();
}

//Function to check if options were passed in,
//and run scripts accordingly
function scriptWithOption(input) {
  // If there are no input
  if (input == undefined) {
    return;
  }
  // If the proper option were passed in
  else if (input.slice(0, 9) == "--output=") {
    let realInput = process.argv[3];
    let data = runTurtleScript(realInput);

    return fs.writeFile(input.slice(9), data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("🐢 Drawing written to " + input.slice(9));
      }
    });
  } // if there are no option passed in,
  // and the proper input were passed in,
  // then run the script normally
  else if (
    input[0][0] == "f" ||
    input[0][0] == "t" ||
    input[0][0] == "l" ||
    input[0][0] == "r"
  ) {
    return console.log(runTurtleScript(input));
  } // if nothing from the above passes, there must be a typo, so return this
  else {
    return console.log(
      "Please check your input again. There may be a typographical error"
    );
  }
}
// Below to run it as a script
let input = process.argv[2];
scriptWithOption(input);

// below to run it normally
// const result = new Turtle(0, 4)
//   .forward(3)
//   .left()
//   .forward(3)
//   .right()
//   .forward(5)
//   .right()
//   .forward(8)
//   .right()
//   .forward(5)
//   .right()
//   .forward(3)
//   .left()
//   .forward(3)
//   .print();

// console.log(result);
