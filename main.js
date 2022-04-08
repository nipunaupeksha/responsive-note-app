const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = document.querySelector("header p"),
  closeIcon = document.querySelector("header i"),
  titleTag = document.querySelector("input"),
  descTag = document.querySelector("textarea"),
  addBtn = document.querySelector("button");

//getting localstorage notes if exist and parsing them to JS objects else passing an empty array to notes.
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText("Add Note");
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    console.log(note);
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>
                                ${note.description}
                            </span>
                        </div>
                        <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                            <i onClick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                            <li onClick="updateNote(${index},'${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onClick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure want you want to delete this note?");
  if(!confirmDel) return;
  notes.splice(noteId, 1); //remove the selected note.
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;
  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      //getting month, day, year
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();
    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo); //adding new notes to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    // saving notes in localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
