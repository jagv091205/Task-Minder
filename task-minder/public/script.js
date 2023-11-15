let notes = [];
let currentNote = null;

function newNote() {
    if (currentNote) {
        saveCurrentNote();
    }

    const newNote = {
        id: new Date().getTime(),
        title: "",
        content: "",
    };

    notes.push(newNote);
    displayNote(newNote);
}

function saveNote() {
    if (currentNote) {
        const title = document.getElementById("editable-title").innerText;
        const content = document.getElementById("note-content").value;

        currentNote.title = title;
        currentNote.content = content;

        updateNoteDisplay(currentNote);
    }
}

function saveCurrentNote() {
    if (currentNote) {
        const title = document.getElementById("editable-title").innerText;
        const content = document.getElementById("note-content").value;

        currentNote.title = title;
        currentNote.content = content;
        updateNoteDisplay(currentNote);
    }
}

function deleteNote() {
    if (currentNote) {
        const noteIndex = notes.findIndex((note) => note.id === currentNote.id);

        notes.splice(noteIndex, 1);

        const noteContainer = document.querySelector(`.note-container[data-note-id="${currentNote.id}"]`);
        if (noteContainer) {
            noteContainer.remove();
        }

        currentNote = null;
    }
}

function viewSavedNotes() {
    if (notes.length > 0) {
        console.log("Saved notes:");
        notes.forEach((note) => {
            console.log(`Note ID: ${note.id}, Title: ${note.title}, Content: ${note.content}`);
        });
    } else {
        console.log("No saved notes.");
    }
}

function displayNote(note) {
    saveCurrentNote();

    if (currentNote) {
        const currentNoteContainer = document.querySelector(`.note-container[data-note-id="${currentNote.id}"]`);
        if (currentNoteContainer) {
            currentNoteContainer.classList.remove("selected");
        }
    }

    currentNote = note;

    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container", "selected");
    noteContainer.dataset.noteId = note.id;

    const titleContainer = document.createElement("div");
    titleContainer.id = "title-container";

    const editableTitle = document.createElement("div");
    editableTitle.id = "editable-title";
    editableTitle.contentEditable = "true";
    editableTitle.innerText = note.title;
    editableTitle.placeholder = "Enter title";

    titleContainer.appendChild(editableTitle);
    noteContainer.appendChild(titleContainer);

    const contentArea = document.createElement("textarea");
    contentArea.classList.add("note-content");
    contentArea.value = note.content;
    contentArea.id = "note-content";

    noteContainer.appendChild(contentArea);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "note-buttons";

    const attachmentButton = document.createElement("button");
    attachmentButton.id = "attachment-button";
    attachmentButton.textContent = "Attachment";
    attachmentButton.addEventListener("click", () => {
        console.log("Attachment button clicked");
    });

    const saveButton = document.createElement("button");
    saveButton.id = "save-note-button";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", saveNote);

    buttonsContainer.appendChild(attachmentButton);
    buttonsContainer.appendChild(saveButton);

    noteContainer.appendChild(buttonsContainer);

    const additionalFeaturesButton = document.createElement("button");
    additionalFeaturesButton.id = "additional-features-button";
    additionalFeaturesButton.textContent = "Additional Features";
    additionalFeaturesButton.addEventListener("click", showAdditionalFeatures);

    noteContainer.appendChild(additionalFeaturesButton);

    document.body.appendChild(noteContainer);
}

function updateNoteDisplay(note) {
    const noteContainer = document.querySelector(`.note-container[data-note-id="${note.id}"]`);
    if (noteContainer) {
        const editableTitle = noteContainer.querySelector("#editable-title");
        const contentArea = noteContainer.querySelector(".note-content");

        editableTitle.innerText = note.title;
        contentArea.value = note.content;
    }
}

document.getElementById("new-note-button").addEventListener("click", newNote);
document.getElementById("delete-note-button").addEventListener("click", deleteNote);
document.getElementById("view-saved-notes-button").addEventListener("click", viewSavedNotes);
document.getElementById("create-list-button").addEventListener("click", createList);

document.body.addEventListener("click", function (event) {
    const clickedNoteContainer = event.target.closest(".note-container");
    if (clickedNoteContainer) {
        const noteId = clickedNoteContainer.dataset.noteId;
        const clickedNote = notes.find((note) => note.id.toString() === noteId);
        if (clickedNote) {
            displayNote(clickedNote);
        }
    }
});

function showAdditionalFeatures() {
    const featuresBox = document.getElementById("additional-features-box");
    featuresBox.style.display = "block";

    const closeButton = document.getElementById("close-features-button");
    closeButton.addEventListener("click", () => {
        featuresBox.style.display = "none";
    });
}

document.getElementById("mode-switch-button").addEventListener("click", toggleDarkMode);

// Additional Features
function changeTextColor() {
    const currentPage = document.querySelector('.note-container.selected');
    const textColor = window.prompt('Enter text color (e.g., red, #00ff00):');
    if (textColor) {
        currentPage.style.color = textColor;
    }
}

function changeTextAlignment() {
    const currentPage = document.querySelector('.note-container.selected');
    const textAlignment = window.prompt('Enter text alignment (e.g., left, center, right):');
    if (textAlignment) {
        currentPage.style.textAlign = textAlignment;
    }
}

function startDrawing() {
    alert('Start drawing feature not implemented yet.');
}

function insertImage() {
    alert('Image insertion feature not implemented yet.');
}

function toggleHighlight() {
    const currentPage = document.querySelector('.note-container.selected');
    if (currentPage.style.backgroundColor === 'yellow') {
        currentPage.style.backgroundColor = 'var(--page-color)';
    } else {
        currentPage.style.backgroundColor = 'yellow';
    }
}

function toggleBold() {
    const currentPage = document.querySelector('.note-container.selected');
    if (currentPage.style.fontWeight === 'bold') {
        currentPage.style.fontWeight = 'normal';
    } else {
        currentPage.style.fontWeight = 'bold';
    }
}

function toggleItalic() {
    const currentPage = document.querySelector('.note-container.selected');
    if (currentPage.style.fontStyle === 'italic') {
        currentPage.style.fontStyle = 'normal';
    } else {
        currentPage.style.fontStyle = 'italic';
    }
}
