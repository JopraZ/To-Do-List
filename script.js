let taskInput = document.getElementById("taskInput");
let button = document.getElementById("button");
let list = document.getElementById("list");
let search = document.getElementById("search");

button.addEventListener("click", function() {
    let task = taskInput.value.trim();
    if (task !== "") {
        let listItem = document.createElement("li");
        listItem.textContent = task;
        list.appendChild(listItem);
        taskInput.value = "";
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "supprimer";
        listItem.appendChild(deleteButton);
        deleteButton.addEventListener("click", function(){
            list.removeChild(listItem);
        })
    }
});
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        button.click();
        event.prevenetDefault();
    }
});

