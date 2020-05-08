window.onload = function () {
  const taskField = document.querySelector("#taskField");
  const addTaskbtn = document.querySelector("#addTaskbtn");
  const allTask = document.querySelector("#allTask");

  taskField.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      createNewTast(allTask, event.target.value);
      event.target.value = "";
    }
  });
};

function createNewTast(parent, task) {
  let col = create({ class: "col-sm-3 " });
  let singleTask = create({ class: "single-task d-flex" });
  let singleTaskP = create("p");
  singleTaskP.innerHTML = task;
  singleTask.appendChild(singleTaskP);

  let span = create("span", { class: "ml-auto" });
  span.innerHTML = '<i class="far fa-window-close"></i>';
  span.addEventListener("click", () => {
    parent.removeChild(col);
  });
  singleTask.appendChild(span);

  let taskControler = createTaskControler(singleTask);
  singleTask.appendChild(taskControler);

  col.appendChild(singleTask);
  parent.appendChild(col);
}

window.create = function () {
  if (arguments.length === 0) {
    return document.createElement("div");
  }

  if (arguments.length === 1 && typeof arguments[0] != "object") {
    return document.createElement(arguments[0]);
  }

  var tag = arguments[0];
  var attr = arguments[1] || arguments[0];

  if (arguments.length === 1 && typeof arguments[0] === "object") {
    tag = "div";
  }

  var element = document.createElement(tag);

  for (var i in attr) {
    element.setAttribute(i, attr[i]);
  }

  return element;
};
