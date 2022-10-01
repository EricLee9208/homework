const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todo_list = [
  ["0[] Take out the trash"],
  ["1[] Buy toothpaste"],
  ["2[] Buy Snickerdoodles"],
  ["3[] Fix the climate"],
  ["4[] Find a cure for again"],
];

function view() {
  for (const todo of todo_list) {
    console.log(todo.toString());
  }
  //   console.log(rl.getPrompt());
}

function add() {
  console.log("What?");
  rl.on("line", (task) => {
    if (task != "") {
      todo_list.push(`${todo_list.length}[] ${task}`);
      start();
    }
  });
}
function start() {
  rl.setPrompt(`(v) View ● (n) New ● (cX) Complete ● (dX) Delete ● (q) Quit`);
  console.log(rl.getPrompt());

  rl.on("line", (input) => {
    if (input === "j") {
      view();
      start();
    }
    if (input === "n") {
      add();
    }
    if (input === "q") {
      console.log("See you soon!");
      rl.close();
    }
  });
}

start();
