const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

let totalTasks = 0;

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', function() {
        span.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        totalTasks--;
        taskCount.textContent = totalTasks;
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    totalTasks++;
    taskCount.textContent = totalTasks;
    taskInput.value = '';
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
