// Activity 3: Practising JavaScript Object Destructuring

function printTask({ title, priority, status }) {
  console.log(`Task: ${title}`);
  console.log(`Priority: ${priority}`);
  console.log(`Status: ${status}`);
}

const task = {
  title: "Finish Learning with AI exercise",
  priority: "high",
  status: "in_progress"
};

printTask(task);