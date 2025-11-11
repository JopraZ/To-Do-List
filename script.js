// Sélections
const taskInput = document.getElementById("taskInput");
const button = document.getElementById("button");
const list = document.getElementById("list");

// --- LocalStorage helpers ---
function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Ajouter une tâche ---
function ajouterTache() {
    const text = taskInput.value.trim();
    if (!text) return;

    const taskObj = { text: text, done: false };

    renderTask(taskObj);

    const tasks = loadTasks();
    tasks.push(taskObj);
    saveTasks(tasks);

    taskInput.value = "";
}

// --- Créer et afficher une tâche dans le DOM ---
function renderTask(taskObj) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskObj.text;
    li.appendChild(span);

    if (taskObj.done) li.classList.add("completed");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "supprimer";
    li.appendChild(deleteButton);

    // --- Coche / décoche la tâche ---
    li.addEventListener("click", function(e) {
        // Ignorer si on clique sur le bouton supprimer
        if (e.target === deleteButton) return;

        li.classList.toggle("completed");

        let tasks = loadTasks();
        tasks = tasks.map(t => {
            if (t.text === taskObj.text) t.done = !t.done;
            return t;
        });
        saveTasks(tasks);
    });

    // --- Supprimer la tâche ---
    deleteButton.addEventListener("click", function(e) {
        e.stopPropagation();
        list.removeChild(li);

        let tasks = loadTasks();
        tasks = tasks.filter(t => t.text !== taskObj.text);
        saveTasks(tasks);
    });

    list.appendChild(li);
}

// --- Listeners ---
button.addEventListener("click", ajouterTache);

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        ajouterTache();
    }
});

// --- Charger les tâches au démarrage ---
window.addEventListener("load", function() {
    const tasks = loadTasks();
    tasks.forEach(renderTask);
});
