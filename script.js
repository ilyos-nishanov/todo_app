const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = [];
let currentTask = {};

const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  }
  updateTaskContainer()
  reset()
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn" onclick = "editTask(this)">Edit</button>
          <button type="button" class="btn" onclick = "deleteTask(this)">Delete</button>
          
          /*To enable editing and deleting for each task, add an onclick attribute to both buttons. 
          Set the value of the onclick attribute to editTask(this) for the Edit button and deleteTask(this) for the Delete button. 
          The editTask(this) function will handle editing, while the deleteTask(this) function will handle deletion.
          this is a keyword that refers to the current context. In this case, this points to the element that triggers the event – the buttons.
          */

        </div>
      `)
    }
  );
};

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(item => item.id === buttonEl.parentElement.id);  // remember this syntax my son
    //Create a dataArrIndex variable and set its value using the findIndex() method on the taskData array. Pass item as the parameter 
    //for the arrow callback function, and within the callback, check if the id of item is equal to the id of the parentElement of buttonEl.
}
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});

const myTaskArr = [
    { task: "Walk the Dog", date: "22-04-2022" },
    { task: "Read some books", date: "02-11-2023" },
    { task: "Watch football", date: "10-08-2021" },
  ];
  
  localStorage.setItem("data", JSON.stringify(myTaskArr));
  
  localStorage.clear();
  
  const getTaskArr = localStorage.getItem("data")
  console.log(getTaskArr)
  
  const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
  console.log(getTaskArrObj);