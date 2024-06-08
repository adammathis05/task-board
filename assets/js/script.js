// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $("<div>")
        .addClass("card w-75 task-card my-3")
        .attr("data-task-id", task.id);
    const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $("<p>").addClass("card-text").text(task.description);
    const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
    const cardDeleteBtn = $("<button>")
        .addClass("btn btn-danger delete")
        .text("Delete");
    cardDeleteBtn.on("click", handleDeleteTask);
    if (task.dueDate && task.status !== "done") {
        const today = dayjs();
        console.log(today, task.dueDate);
        if (today.isSame(task.dueDate),"day") {
            taskCard.addClass("bg-warning text-white");
        }
        else if (today.isAfter(dayjs(task.dueDate))) {
            taskCard.addClass("bg-danger text-white");
        }

    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();
    for (let task of taskList) {
        if (task.status === "to-do") {
            $("#todo-cards").append(createTaskCard(task));

        }
        else if (task.status === "in-progress") {
            $("#in-progress-cards").append(createTaskCard(task));
        }
        else {
            $("#done-cards").append(createTaskCard(task));
        }
    }
    $(".task-card").draggable({opacity:0.7, zIndex:100});
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const title = $("#taskTitle").val();
    const dueDate = $("#taskDueDate").val();
    const content = $("#taskDescription").val();
    const newTask = {
        id: generateTaskId(), title, dueDate, content, status: "to-do"
    }
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
    $("#taskTitle").val("");
    $("#taskDueDate").val("");
    $("#taskDescription").val("");

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $("#taskDueDate").datepicker();
    $("#taskForm").on("submit", handleAddTask);
});

