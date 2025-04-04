let vocabularyList = JSON.parse(localStorage.getItem("vocabularyList")) || [];

function saveToLocalStorage() {
    localStorage.setItem("vocabularyList", JSON.stringify(vocabularyList));
}

function displayVocabOpen(isEdit = false, index = null) {
    document.getElementById('add-edit-modal').style.display = "block";
    document.getElementById("modal-title").innerText = isEdit ? "Edit Word" : "Add New Word";
    document.getElementById("vocab-form").reset();
    document.getElementById("submit-btn").setAttribute("onclick", isEdit ? `displayEditWord(event, ${index})` : "displayAddNewWord(event)");
    
    if (isEdit) {
        let word = vocabularyList[index];
        document.getElementById("modal-word").value = word.word;
        document.getElementById("modal-mean").value = word.mean;
        document.getElementById("modal-cate").value = word.cate;
    }
}

function displayCloseModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function displayAddNewWord(event) {
    event.preventDefault();
    let word = document.getElementById("modal-word").value;
    let mean = document.getElementById("modal-mean").value;
    let cate = document.getElementById("modal-cate").value;
    
    if (!word || !mean || !cate) {
        alert("Error: All fields are required!");
        return;
    }
    
    vocabularyList.push({ word, mean, cate });
    sortVocabList();
    saveToLocalStorage();
    renderVocabList();
    displayCloseModal('add-edit-modal');
}

function displayEditWord(event, index) {
    event.preventDefault();
    let word = document.getElementById("modal-word").value;
    let mean = document.getElementById("modal-mean").value;
    let cate = document.getElementById("modal-cate").value;
    
    if (!word || !mean || !cate) {
        alert("Error: All fields are required!");
        return;
    }
    
    vocabularyList[index] = { word, mean, cate };
    sortVocabList();
    saveToLocalStorage();
    renderVocabList();
    displayCloseModal('add-edit-modal');
}

function displayDeleteModal(index) {
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this word?!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          vocabularyList.splice(index, 1);
          saveToLocalStorage();
          renderVocabList();
          
          swal("Deleted!", "Your word has been removed.", "success");
        } else {
          swal("Cancelled", "Your word is safe!", "info");
        }
      });
}      

function renderVocabList() {
    let tbody = document.getElementById("vocab-list");
    tbody.innerHTML = "";
    
    vocabularyList.forEach((item, index) => {
        let row = `
        <tr>
            <td>${item.word}</td>
            <td>${item.mean}</td>
            <td>${item.cate}</td>
            <td>
                <a href="#" class="action-edit" onclick="displayVocabOpen(true, ${index})">Edit</a>
                <a href="#" class="action-delete" onclick="displayDeleteModal(${index})">Delete</a>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function sortVocabList() {
    vocabularyList.sort((a, b) => a.word.localeCompare(b.word));
}

function searchVocab() {
    let query = document.getElementById("search-input").value.toLowerCase();
    let filteredList = vocabularyList.filter(item => 
        item.word.toLowerCase().includes(query) || 
        item.mean.toLowerCase().includes(query) || 
        item.cate.toLowerCase().includes(query)
    );
    
    let tbody = document.getElementById("vocab-list");
    tbody.innerHTML = "";
    
    filteredList.forEach((item, index) => {
        let row = `
        <tr>
            <td>${item.word}</td>
            <td>${item.mean}</td>
            <td>${item.cate}</td>
            <td>
                <a href="#" class="action-edit" onclick="displayVocabOpen(true, ${index})">Edit</a>
                <a href="#" class="action-delete" onclick="displayDeleteModal(${index})">Delete</a>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    sortVocabList();
    renderVocabList();
});
