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
  taskControler.style.visibility = "hidden";

  singleTask.appendChild(taskControler);

  singleTask.onmouseenter = () => {
    taskControler.style.visibility = "visible";
  };
  singleTask.onmouseleave = () => {
    taskControler.style.visibility = "hidden";
  };

  col.appendChild(singleTask);
  parent.appendChild(col);
}

function createTaskControler(parent) {
  let controlPannerl = create({ class: "task-control-panel d-flex" });

  let colorPallete = createColorPallete(parent);
  controlPannerl.appendChild(colorPallete);

  let editBtn = createEditBtn(parent);
  controlPannerl.appendChild(editBtn);

  return controlPannerl;
}

function createColorPallete(parent) {
  const colors = [
    "palegreen",
    "skyblue",
    "powderblue",
    "salmon",
    "red",
    "grey",
  ];

  let colorDiv = create({ class: "d-flex" });
  colors.forEach((color) => {
    let div = create({ class: "color-circle ml-2" });
    div.style.background = color;

    div.addEventListener("click", () => {
      parent.style.background = color;
    });

    colorDiv.appendChild(div);
  });
  return colorDiv;
}

function createEditBtn(parent) {
  let span = create("span", { class: "ml-auto mr-2" });
  span.innerHTML = '<i class="far fa-edit"></i>';
  span.style.color = "white";
  span.addEventListener("click", () => {
    let p = parent.querySelector("p");
    let textArea = create("textarea", { class: "inner-textarea" });
    textArea.style.width = parent.offsetWidth + "px";
    textArea.style.height = parent.offsetHeight + "px";
    textArea.innerHTML = p.innerHTML;

    textArea.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        event.stopPropagation();
        if (this.value) {
          p.innerHTML = this.value;
          parent.removeChild(this);
        } else {
          alert("Task Cannot be empty");
        }
      }
    });

    parent.appendChild(textArea);
  });

  return span;
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
