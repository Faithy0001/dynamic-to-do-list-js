// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If called from input, get and trim the task input value
        if (save) {
            taskText = taskInput.value.trim();
            
            // Check if the input is empty
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        // Create a new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Add click event to remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            
            // Remove task from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const taskIndex = storedTasks.indexOf(taskText);
            if (taskIndex > -1) {
                storedTasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append remove button to list item
        listItem.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(listItem);

        // Clear the input field if this is a new task
        if (save) {
            taskInput.value = "";
            
            // Save task to Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Load tasks from Local Storage on page load
    loadTasks();

    // Attach event listeners
    addButton.addEventListener('click', function() {
        addTask('', true);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask('', true);
        }
    });
});