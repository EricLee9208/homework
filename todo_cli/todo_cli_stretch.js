const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todo_list = [];

const file = process.argv[2];

//Reading json file if "json" exist in user input and adding the data to todo_list
if (file != undefined && file.includes(".json")) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error;
    } else {
      let words = JSON.parse(data);
      words.forEach((element, index) => {
        if (element.completed == true) {
          todo_list.push(`${index}[✔] ${element.title}`);
        } else {
          todo_list.push(`${index}[] ${element.title}`);
        }
      });
    }
  });
}

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
  if (index < todo_list.length) {
    let a = todo_list[index].toString();
    let start = a.indexOf(" ");
    console.log(`Deleted "${a.slice(start + 1)}"`);
    todo_list.splice(index, 1);
    for (let i = index; i < todo_list.length; i++) {
      let a = todo_list[i].toString();
      let start = a.indexOf("[");
      todo_list[i] = `${i}${a.slice(start)}`;
    }
  } else {
    console.log("Index out of range.");
  }
  todo_function();
}

//converting todo_list to JSON
function todo_list_To_JSON() {
  let result = [];

  for (const todo of todo_list) {
    let startIndex = todo.indexOf(" ");

    if (todo.includes("[✔]")) {
      let obj = { completed: true, title: todo.slice(startIndex + 1) };
      let todoJSON = JSON.stringify(obj);
      result.push(todoJSON);
    } else {
      let obj = { completed: false, title: todo.slice(startIndex + 1) };
      let todoJSON = JSON.stringify(obj);
      result.push(todoJSON);
    }
  }
  return result;
}

function save() {
  let result = todo_list_To_JSON();

  rl.question("What? (myTodos.json)\n", (input) => {
    // if user inputs path, save data to that path
    if (input.includes(".json")) {
      fs.writeFile(input, `[${result}]`, "utf8", (err) => {
        if (err) {
          console.error;
        } else {
          console.log(`List saved to "${input}"`);
          todo_function();
        }
      });
    } else {
      // if user does not pass in path, save to default path "myTodos.json"
      fs.writeFile("myTodos.json", `[${result}]`, "utf8", (err) => {
        if (err) {
          console.error;
        } else {
          console.log(`List saved to "myTodos.json"`);
          todo_function();
        }
      });
    }
  });
}

// created todo_function to do recurssion
function todo_function() {
  rl.question(
    "(v) View ● (n) New ● (cX) Complete ● (dX) Delete ● (s) Save ● (q) Quit \n",
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
      } else if (input === "s") {
        save();
      } else {
        todo_function();
      }
    }
  );
}

console.log("\nWelcome to Todo CLI!");
console.log("---------------------");

todo_function();
