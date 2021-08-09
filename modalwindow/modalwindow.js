const modal = document.getElementById('my_modal');
const btn = document.getElementById('btn_modal_window');
const span = document.getElementsByClassName("window__close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () { //кнопка Х
    modal.style.display = "none";
}

window.onclick = function (event) { //при клике за окно, закрывает модалку
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
