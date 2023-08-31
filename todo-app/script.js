// 새로고침시 이전 태스크를 로드
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => appendTask(task.text, task.completed));
});

// 태스크 추가 함수
function addTask() {
  const taskText = document.getElementById('task').value;
  if (taskText) {
    appendTask(taskText, false);
    saveTask(taskText, false);
    document.getElementById('task').value = "";
  }
}

// 태스크를 DOM에 추가
function appendTask(text, completed) {
  const div = document.createElement('div');
  div.className = 'task-box';
  if (completed) {
    div.classList.add('completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', function() {
    toggleCompleted(div, text);
  });

  const span = document.createElement('span');
  span.contentEditable = true;
  span.textContent = text;
  span.addEventListener('blur', function() {
    const originalText = text;
    const newText = span.textContent;
    updateTask(originalText, newText);
  });

  const editButton = document.createElement('button');
  editButton.className = 'icon-button';
  editButton.innerHTML = '<span class="material-icons">edit</span>';
  
  const deleteButton = document.createElement('button');
  deleteButton.className = 'icon-button';
  deleteButton.innerHTML = '<span class="material-icons">delete</span>';
  deleteButton.onclick = function() {
    deleteTask(div, text);
  };

  div.appendChild(checkbox);
  div.appendChild(span);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  const taskList = document.getElementById('taskList');
  taskList.insertBefore(div, taskList.firstChild);
}

// 태스크를 localStorage에 저장
function saveTask(text, completed) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// 태스크 완료 상태 토글
function toggleCompleted(div, text) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = savedTasks.find(task => task.text === text);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    div.classList.toggle('completed');
  }
}

// 태스크 삭제
function deleteTask(div, text) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = savedTasks.findIndex(task => task.text === text);
  if (index > -1) {
    savedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    div.remove();
  }
}

// 태스크 내용 업데이트
function updateTask(originalText, newText) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = savedTasks.find(task => task.text === originalText);
  if (task) {
    task.text = newText;
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }
}
