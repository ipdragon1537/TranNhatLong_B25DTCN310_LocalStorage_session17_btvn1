const initialTodos = [
  { id: 1, task: "Mua bánh chưng", done: false },
  { id: 2, task: "Dọn nhà đón Tết", done: false },
  { id: 3, task: "Gói bánh chưng", done: false },
  { id: 4, task: "Trang trí nhà cửa", done: false },
];

document.addEventListener("DOMContentLoaded", function () {
  const containerElement = document.getElementById("todo-container");
  const footerElement = document.getElementById("status-footer");

  function renderTodo(data) {
    containerElement.innerHTML = "";
    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "todo-item";
      div.innerHTML = `
            <span style="margin-right:15px">🌸</span>
            <span class="task-name">${item.task}</span>
            <span class="status-text">${item.done ? "Đã xong" : "Đang chờ"}</span>`;
      containerElement.appendChild(div);
    });
  }

  const storeData = localStorage.getItem("myTodos");

  if (!storeData) {
    renderTodo(initialTodos);
    localStorage.setItem("myTodos", JSON.stringify(initialTodos));
    footerElement.innerText = "Khởi tạo lần đầu & Đã lưu localStorage";
  } else {
    const savedTodos = JSON.parse(storeData);
    renderTodo(savedTodos);
    footerElement.innerText = "Dữ liệu được tải từ localStorage";
  }
});
