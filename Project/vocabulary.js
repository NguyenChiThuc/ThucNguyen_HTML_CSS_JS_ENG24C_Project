function displayShowDashboard() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
        displayShowLogin();
        return;
    }
    document.getElementById("loggin").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.querySelector(".quizlet").style.display = "none";
    document.querySelector(".main-container").style.display = "none";
    document.querySelector(".nav-bar-create").style.display = "none";
    document.getElementById("dashboard-nav").style.display = "flex";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("container-vocab").style.display = "none"
    document.getElementById("user-hi").innerText = `Hi, ${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById("welcome-mess").innerText = `Chào mừng bạn đã quay lại học, ${currentUser.firstName} ${currentUser.lastName}!`;
}
function displayVocab() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
        displayShowLogin();
        return;
    }
    document.getElementById("loggin").style.display = "none";
    document.getElementById("register-card").style.display = "none";
    document.querySelector(".quizlet").style.display = "none";
    document.querySelector(".main-container").style.display = "none";
    document.querySelector(".nav-bar-create").style.display = "none";
    document.getElementById("dashboard-nav").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("container-vocab").style.display = "block"
    renderVocabList();
}
window.onload = function () {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser) {
        displayDashboard();
    }
}