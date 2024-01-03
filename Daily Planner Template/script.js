// Get the elements from the document
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");
    const taskList = document.getElementById("task-list");

    // Create an array to store the tasks
    let tasks = [];

    // Load the tasks from the local storage
    function loadTasks() {
      // Get the tasks from the local storage
      const tasksString = localStorage.getItem("tasks");

      // If there are any tasks, parse them and add them to the list
      if (tasksString) {
        tasks = JSON.parse(tasksString);
        tasks.forEach((task) => {
          addTaskToList(task);
        });
      }
    }

    // Save the tasks to the local storage
    function saveTasks() {
      // Stringify the tasks array
      const tasksString = JSON.stringify(tasks);

      // Save the tasks to the local storage
      localStorage.setItem("tasks", tasksString);
    }

    // Add a task to the list
    function addTaskToList(task) {
      // Create a new list item element
      const listItem = document.createElement("div");
      listItem.className = "list-item";

      // Create a paragraph element to display the task
      const taskText = document.createElement("p");
      taskText.textContent = task.text;

      // Create a span element to display the delete icon
      const deleteIcon = document.createElement("span");
      deleteIcon.textContent = " ❌🔥";

      // Add an event listener to the delete icon
      deleteIcon.addEventListener("click", () => {
        // Remove the task from the array
        tasks = tasks.filter((t) => t.id !== task.id);

        // Save the tasks to the local storage
        saveTasks();

        // Remove the list item from the list
        taskList.removeChild(listItem);
      });

      // Add an event listener to the list item
      listItem.addEventListener("click", () => {
        // Toggle the done property of the task
        task.done = !task.done;

        // Save the tasks to the local storage
        saveTasks();

        // Toggle the done class of the list item
        listItem.classList.toggle("done");
      });

      // If the task is done, add the done class to the list item
      if (task.done) {
        listItem.classList.add("done");
      }

      // Append the elements to the list item
      listItem.appendChild(taskText);
      listItem.appendChild(deleteIcon);

      // Append the list item to the list
      taskList.appendChild(listItem);
    }

    // Add an event listener to the add button
    addButton.addEventListener("click", () => {
      // Get the value of the input
      const taskText = taskInput.value;

      // If the input is not empty, create a new task object
      if (taskText) {
        const task = {
          id: Date.now(),
          text: taskText,
          done: false,
        };

        // Add the task to the array
        tasks.push(task);

        // Save the tasks to the local storage
        saveTasks();

        // Add the task to the list
        addTaskToList(task);

        // Clear the input
        taskInput.value = "";
      }
    });

    // Load the tasks when the page loads
    loadTasks();