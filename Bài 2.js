const initialTodos = [
  { id: 1, task: "Mua bánh chưng", done: false },
  { id: 2, task: "Dọn nhà đón Tết", done: false },
  { id: 3, task: "Gói bánh chưng", done: false },
  { id: 4, task: "Trang trí nhà cửa bằng hoa mai, hoa đào", done: false },
  { id: 5, task: "Mua phong bao lì xì", done: false },
  { id: 6, task: "Chuẩn bị mâm ngũ quả", done: false },
];
const STORAGE_KEY = "myTodos";
let todos = [];
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
function loadFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      todos = JSON.parse(stored);
    } catch (e) {
      console.error("Lỗi parse dữ liệu:", e);
      todos = [...initialTodos];
    }
  } else {
    todos = [...initialTodos];
    saveToLocalStorage();
  }
}
function renderTodos() {
  const todoList = document.getElementById("todoList");
  const completedCount = document.getElementById("completedCount");
  const sortedTodos = [...todos].sort((a, b) => a.done - b.done);

  todoList.innerHTML = sortedTodos
    .map(
      (todo) => `
                <li class="todo-item ${todo.done ? "done" : ""}" data-id="${todo.id}">
                    ${todo.task}
                </li>
            `,
    )
    .join("");
  const completed = todos.filter((todo) => todo.done).length;
  completedCount.textContent = completed;
}
function handleTodoClick(e) {
  const todoItem = e.target.closest(".todo-item");
  if (!todoItem) return;

  const id = parseInt(todoItem.dataset.id);
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
  saveToLocalStorage();
  renderTodos();
}
function resetToDefault() {
  todos = [...initialTodos];
  saveToLocalStorage();
  renderTodos();
}
function init() {
  loadFromLocalStorage();
  renderTodos();
  const todoList = document.getElementById("todoList");
  todoList.addEventListener("click", handleTodoClick);
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", resetToDefault);
}

// Chạy ứng dụng khi trang đã tải xong
document.addEventListener("DOMContentLoaded", init);