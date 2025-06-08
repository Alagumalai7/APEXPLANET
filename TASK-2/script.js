function showSection(section) {
      document.getElementById("todo-section").classList.add("hidden");
      document.getElementById("gallery-section").classList.add("hidden");

      if (section === "todo") {
        document.getElementById("todo-section").classList.remove("hidden");
      } else {
        document.getElementById("gallery-section").classList.remove("hidden");
      }
    }

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();
      if (taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${taskText}</span>
          <button class="delete" onclick="this.parentElement.remove()">Delete</button>
        `;
        document.getElementById("taskList").appendChild(li);
        taskInput.value = "";
      }
    }

    function addImage() {
      const imageInput = document.getElementById("imageInput");
      const url = imageInput.value.trim();
      if (url) {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
          <img src="${url}" alt="User image" />
          <button class="delete" onclick="this.parentElement.remove()">Remove</button>
        `;
        document.getElementById("imageGallery").appendChild(div);
        imageInput.value = "";
      }
    }