var ToDo = function () {
    this.newNoteButton = document.getElementById("createNew");
    this.mainDiv = document.getElementById("main");
    this.clearAll = document.getElementById("clear");
    this.itemObject = this.jsonLoad();
};

ToDo.prototype.drawPage = function drawPage() {
    for (var data in this.itemObject) {
        var key = data,
            value = this.itemObject[key],
            entireDiv = document.createElement("div"),
            divButtons = document.createElement("div"),
            delButton = document.createElement("button"),
            editButton = document.createElement("button");
        entireDiv.classList = "entireDiv";
        entireDiv.textContent = value;
        divButtons.classList = "buttons";
        delButton.classList = "del";
        delButton.setAttribute("id", "del" + key);
        delButton.textContent = "Delete";
        editButton.classList = "edit";
        editButton.setAttribute("id", "edit" + key);
        editButton.textContent = "Edit";
        divButtons.appendChild(delButton);
        divButtons.appendChild(editButton);
        entireDiv.appendChild(divButtons);
        this.mainDiv.appendChild(entireDiv);
    }
    this.initEvents();
};

ToDo.prototype.initEvents = function () {
    this.mainDiv.addEventListener("click", this.targetBtn.bind(this));
    this.newNoteButton.addEventListener("click", this.addNew.bind(this));
    this.clearAll.addEventListener("click", this.clearAllTasks.bind(this));
};

ToDo.prototype.clearAllTasks = function () {
    if (this.objectLength(this.itemObject) == 0) {
        alert("You don't have any tasks!")
    } else {
        var deleteAllConfirm = confirm("Are You Sure?");
        if (deleteAllConfirm == true) {
            localStorage.clear();
            location.reload();
        } else {
            location.reload();
        }
    }
};

ToDo.prototype.addNew = function () {
    var taskTitle = "time" + new Date().getTime();
    var taskText = prompt("Text:");
    if (taskText == null) {
        location.reload();
    } else {
        console.log(this.itemObject);
        this.itemObject[taskTitle] = taskText;
        localStorage.setItem("obj", JSON.stringify(this.itemObject));
        location.reload();
    }
};

ToDo.prototype.targetBtn = function (event) {
    if (event.target !== event.currentTarget) {
        if (event.target.id.includes("edit")) {
            this.editTask();
        } else if (event.target.id.includes("del")) {
            this.deleteTask();
        }
    }
    event.stopPropagation();
};

ToDo.prototype.jsonLoad = function () {
        if (JSON.parse(localStorage.getItem("obj")) == null) {
            return {};
        } else {
            return JSON.parse(localStorage.getItem("obj"));
        }
    };

ToDo.prototype.deleteTask = function () {
    var idTargetDelBtn = event.target.id.substr(3);
    var deleteConfirm = confirm("Are you sure?");
    if (deleteConfirm == true) {
        delete this.itemObject[idTargetDelBtn];
        localStorage.setItem("obj", JSON.stringify(this.itemObject));
        location.reload();
    } else {
        location.reload();
    }
};

ToDo.prototype.editTask = function () {
    var title = "time" + new Date().getTime();
    var idTargetEditBtn = event.target.id.substr(4);
    var textForEditing = prompt("Text:", this.itemObject[idTargetEditBtn]);
    if (textForEditing == null) {
        location.reload();
    } else {
        this.itemObject[title] = textForEditing;
        delete this.itemObject[idTargetEditBtn];
        localStorage.setItem("obj", JSON.stringify(this.itemObject));
        location.reload();
    }
};

ToDo.prototype.objectLength = function (obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var toDo = new ToDo();
toDo.drawPage();