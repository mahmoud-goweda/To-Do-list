var userInput = document.getElementById("hey");
var btn = document.getElementById('click');
var ide = [];
var hold = Array.from (document.getElementsByClassName("addTask"))
var idbn = document.getElementById('inprogress')
var colorArr = ['gray', 'red', 'blue', 'green'];
var Data;
console.log(hold)
var count = 0;
for (var i = 0; i < hold.length; i++) {
    hold[i].addEventListener("dragover", function (event) {
        console.log('hey')
        event.preventDefault()
    });
    hold[i].addEventListener("drop", function (ev) {
        var data = document.getElementById(ev.dataTransfer.getData("text"));
        for (var i = 0; i < ide.length; i++) {
            if (data.id == ide[i].id) {
                ide[i].parent = ev.target.id
            }
            localStorage.setItem('inprogress', JSON.stringify(ide))
        }
        ev.target.appendChild(data)
    });
}
var taskList = JSON.parse(localStorage.getItem('inprogress'));
if (taskList) {
    count = taskList.length;
    for (var i = 0; i < taskList.length; i++) {
        createTask(taskList[i]);
    }
}
function createTask(obj) {
    var newEl = document.createElement('p');
    newEl.innerHTML = obj.value;
    newEl.id = obj.id;
    document.getElementById(obj.parent).append(newEl);
    hold[0].style.color = colorArr[0];
    userInput.value = ' ';
    newEl.setAttribute("draggable", "true");
    newEl.setAttribute("id", ++count);
    newEl.addEventListener("dragstart", function (event) {
        console.log('dragstart')
        event.dataTransfer.setData('text', event.target.id);
    });
    var obj = {
        id: newEl.id,
        value: newEl.innerHTML,
        parent: obj.parent
    };
    ide.push(obj);
}
btn.addEventListener('click', function () {
    Data = {
        id: ++count,
        value: userInput.value,
        parent: idbn.id
    }
    createTask(Data);
    var stringObj = JSON.stringify(ide);
    localStorage.setItem('inprogress', stringObj)
});