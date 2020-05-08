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
  let controlPannerl = create({ class: "task-control-panel" });

  let colorPallete = createColorPallete(parent);
  controlPannerl.appendChild(colorPallete);

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
