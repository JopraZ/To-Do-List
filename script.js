let taskInput = document.getElementById("taskInput");
let button = document.getElementById("button");
let list = document.getElementById("list");

function ajouterUneTache() {
    let task = taskInput.value.trim();
    if (task !== "") {
        // Créer l'élément li
        let listItem = document.createElement("li");
        listItem.textContent = task;

        // Listener pour cocher/décocher
        listItem.addEventListener("click", function() {
            listItem.classList.toggle("completed");
        });

        // Ajouter le bouton supprimer
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "supprimer";

        // Supprimer sans déclencher le toggle
        deleteButton.addEventListener("click", function(e){
            e.stopPropagation(); // empêche le clic sur li
            list.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);

        // Réinitialiser l'input
        taskInput.value = "";
    }
};

button.addEventListener("click", ajouterUneTache);

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        ajouterUneTache();
        }
});

