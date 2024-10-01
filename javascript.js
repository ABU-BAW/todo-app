const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];

function addTask(description) {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks.push(description);
      console.log(`Task added: ${description}`);
      resolve();
    }, 2000);
  });
}

function viewTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (tasks.length === 0) {
        console.log("No tasks to show");
      } else {
        console.log("Tasks:");
        tasks.forEach((task, index) => {
          console.log(`${index + 1}. ${task}`);
        });
      }
      resolve();
    }, 1000);
  });
}

async function promptUser() {
  let continueLoop = true;
  
  while (continueLoop) {
    console.log("\nWhat would you like to do?");
    console.log("1. Add a task");
    console.log("2. View tasks");
    console.log("3. Exit");
    
    const answer = await new Promise((resolve) => {
      rl.question("Enter your choice (1-3): ", resolve);
    });
    
    switch (answer) {
      case '1':
        const taskDescription = await new Promise((resolve) => {
          rl.question("Enter task description: ", resolve);
        });
        await addTask(taskDescription);
        break;
      case '2':
        await viewTasks();
        break;
      case '3':
        continueLoop = false;
        rl.close();
        console.log("Goodbye!");
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

promptUser();