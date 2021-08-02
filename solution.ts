const form:HTMLFormElement = document.querySelector("#todo-add");
const submitBtn:HTMLInputElement = document.querySelector("#todo-save");
const main:HTMLDivElement = document.querySelector("todo-list");
const delAllBtn:HTMLInputElement = document.querySelector("#todo-delall");
const delComBtn:HTMLInputElement = document.querySelector("#todo-delcom");
const yesDelete:HTMLButtonElement = document.querySelector("#yes-delete");
const exitDelete:HTMLButtonElement = document.querySelector("#exit-delet");
const modalDivEl:HTMLButtonElement = document.querySelector(".modal");
let tempTask:String = "";

const fetchMemory = ():any => {
    let tempArr = localStorage.getItem("assignment")
      ? JSON.parse(localStorage.getItem("assignment"))
      : [];
    return [...tempArr];
  };

let taskArr = fetchMemory();

class TASK {
    input:String
    isDone: Boolean
    constructor (input,isDone){
        this.input = input
        this.isDone =isDone
    }
} 

submitBtn.onclick = ():void => {
    let input:HTMLLIElement = document.querySelector("#todo-item");
    let tempTask:any= input.value
    let newTask:Object = new TASK (tempTask, false)
        taskArr.push(newTask);
        localStorage.setItem("assignment", JSON.stringify(taskArr));
        createDivEl();
      };


let createDivEl = ():void => { 
    document.querySelector("#todo-list").innerHTML = "";
    let list = "";
    for (let i = 0; i < taskArr.length; i++) {
        if (!taskArr[i].isDone){
            list += `<div class="todo-row"><p class="todo-item">${taskArr[i].input}</p>
            <button class="todo-ok" onclick = completedTask(${i}) >V</button></div>`;
        }else{
            list += `<div class="todo-row"><p class="todo-item done">${taskArr[i].input}</p>
            <button class="todo-ok" onclick = completedTask(${i}) >V</button></div>`;
        }
    }
    document.querySelector("#todo-list").innerHTML = list;
}

const completedTask= (index:any):void => {
    if (!taskArr[index].isDone){
            taskArr[index].isDone=true
    }else {
        taskArr[index].isDone=false
    }
    localStorage.setItem("assignment", JSON.stringify(taskArr));
    createDivEl();
  };

window.onload= ():void => {
    createDivEl()
}
delComBtn.onclick = ():void => {
    for (let i = taskArr.length-1 ; i >=0; i--) {
        if (taskArr[i].isDone){
            taskArr.splice(i, 1);
        }
    }
    localStorage.setItem("assignment", JSON.stringify(taskArr));
    createDivEl()
}

delAllBtn.onclick = ():void => {
    modalDivEl.style.display = "block";
}
const deleteAll = ():void =>{
    taskArr = []
    localStorage.setItem("assignment", JSON.stringify(taskArr));
    createDivEl()
    closeModal()
}
      
const closeModal = ():void =>{
    modalDivEl.style.display = "none"
}
yesDelete.onclick = ():void => {
    taskArr = []
    localStorage.setItem("assignment", JSON.stringify(taskArr));
    createDivEl()
    closeModal()
}

exitDelete.onclick = ():void => {
    closeModal()
}