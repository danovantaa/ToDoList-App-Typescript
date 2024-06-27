const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");
let tasks = JSON.parse(localStorage.getItem("tasks") || null) || [];
const renderTasks = () => {
    taskList.innerHTML = "";
    const filter = filterSelect.value;
    const filteredTasks = filter === "all"
        ? tasks
        : filter === "complete"
            ? tasks.filter((task) => task.completed)
            : tasks.filter((task) => !task.completed);
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.textContent = task.text;
        if (task.completed)
            li.classList.add("completed");
        li.classList.add("w-full", "rounded", "flex", "items-center", "mb-2", "px-4", "py-2", "border", "border-gray-300", "bg-gray-100", "mx-auto", "text-lg", "justify-between");
        const statusContainer = document.createElement("div");
        statusContainer.classList.add("status-container", "flex", "items-center");
        const completedBtn = document.createElement("button");
        completedBtn.textContent = task.completed ? "Ulangi" : "Selesai";
        completedBtn.addEventListener("click", () => toggleCompleted(index));
        completedBtn.classList.add("bg-black", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.addEventListener("click", () => deleteTask(index));
        deleteBtn.classList.add("bg-black", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editTask(index));
        editBtn.classList.add("bg-black", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline");
        statusContainer.appendChild(completedBtn);
        statusContainer.appendChild(deleteBtn);
        statusContainer.appendChild(editBtn);
        li.appendChild(statusContainer);
        taskList.appendChild(li);
    });
};
const toggleCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
};
const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};
const editTask = (index) => {
    const newText = prompt("Edit task", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
};
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        addTask();
});
filterSelect.addEventListener("change", renderTasks);
renderTasks();
export {};
//# sourceMappingURL=index.js.map