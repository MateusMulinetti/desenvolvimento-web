const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>
                <input type="checkbox" class="complete-checkbox">
                ${taskText}
            </span>
        `;

        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

taskList.addEventListener('click', (event) => {

    if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN') {
        const itemToRemove = event.target.closest('li');
        itemToRemove.remove();
    }

    if (event.target.classList.contains('complete-checkbox')) {
        const span = event.target.parentElement;
        span.style.textDecoration = event.target.checked ? "line-through" : "none";
        span.style.color = event.target.checked ? "gray" : "black";


        event.stopPropagation();
    }


});