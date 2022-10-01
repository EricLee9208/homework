const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// let todo_list = [
//   ["0[] Take out the trash"],
//   ["1[] Buy toothpaste"],
//   ["2[] Buy Snickerdoodles"],
//   ["3[] Fix the climate"],
//   ["4[] Find a cure for again"],
// ];
let todo_list = [];

function view() {
  if (todo_list.length > 0) {
    for (const todo of todo_list) {
      console.log(todo.toString());
    }
  } else {
    console.log("List is empty...");
  }
  todo_function();
}

function add() {
  rl.question("What? \n", (input) => {
    if (input != "") {
      todo_list.push(`${todo_list.length}[] ${input}`);
    }
    todo_function();
  });
}

function complete(index) {
  if (index < todo_list.length) {
    let a = todo_list[index].toString();
    let start = a.indexOf(" ");
    console.log(`Completed "${a.slice(start + 1)}"`);
    todo_list[index] = todo_list[index].toString().replace("[]", `[✔]`);
    todo_function();
  } else {
    console.log("Index out of range.");
    todo_function();
  }
}

function deleting(index) {
  let a = todo_list[index].toString();
  let start = a.indexOf(" ");
  console.log(`Deleted "${a.slice(start + 1)}"`);
  todo_list.splice(index, 1);
  for (let i = index; i < todo_list.length; i++) {
    let a = todo_list[i].toString();
    let start = a.indexOf("[");
    todo_list[i] = `${i}${a.slice(start)}`;
  }
  todo_function();
}

// rl.setPrompt(`(v) View ● (n) New ● (cX) Complete ● (dX) Delete ● (q) Quit`);
// console.log(rl.getPrompt());

function todo_function() {
  rl.question(
    "(v) View ● (n) New ● (cX) Complete ● (dX) Delete ● (q) Quit \n",
    (input) => {
      if (input === "v") {
        view();
      } else if (input === "n") {
        add();
      } else if (input[0] === "c") {
        let addIndex = parseInt(input.slice(1));
        complete(addIndex);
      } else if (input[0] === "d") {
        let deleteIndex = parseInt(input.slice(1));
        deleting(deleteIndex);
      } else if (input === "q") {
        console.log("See you soon! 😄");
        rl.close();
      } else {
        todo_function();
      }
    }
  );
}

todo_function();
