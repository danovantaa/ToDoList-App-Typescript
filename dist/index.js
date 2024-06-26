const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");
let tasks = JSON.parse(localStorage.getItem("tasks") || null) || [];
const renderTasks = () => {
    taskList.innerHTML = "";
    const filter = filterSelect.value;
    const filteredTasks = filter === "all"
        ? tasks
        : filter === "complete"
            ? tasks.filter(task => task.completed)
            : tasks.filter(task => !task.completed);
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.textContent = task.text;
        if (task.completed)
            li.classList.add("completed");
        const statusContainer = document.createElement("div");
        statusContainer.classList.add("status-container");
        const completedBtn = document.createElement("button");
        completedBtn.textContent = task.completed ? "Ulangi" : "Selesai";
        completedBtn.addEventListener("click", () => { toggleCompleted(index); });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus ";
        deleteBtn.addEventListener("click", () => { deleteTask(index); });
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => { editTask(index); });
        statusContainer.appendChild(completedBtn);
        statusContainer.appendChild(deleteBtn);
        statusContainer.appendChild(editBtn);
        li.appendChild(statusContainer);
        taskList.appendChild(li);
    });
};
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
    ;
}
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
function editTask(index) {
    const newText = prompt("Edit Task", tasks[index].text);
    if (newText !== null && newText.trim() != "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        addTask();
});
filterSelect.addEventListener("change", renderTasks);
renderTasks();
export {};
//# sourceMappingURL=index.js.map