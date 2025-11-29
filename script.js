// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append remove button to list item
        listItem.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Add event listener for Enter key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
