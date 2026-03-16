// TODO list code

// searchbar section
let searchIcon = document.getElementById('searchBar');
let searchBarInput = document.getElementById('searchBarInput');

searchIcon.addEventListener("click", () => {
    searchIcon.classList.toggle("active")
    searchBarInput.classList.toggle("toggle");
    searchBarInput.focus();
});



// shearch input section 
searchBarInput.addEventListener('input', () => {
    let items = document.getElementsByClassName('item');
    let len = items.length;
    
    for (let i = 0; i < len; i++){
        let itemText = items[i].getElementsByTagName("label")[0];
        
        if (itemText.textContent.toUpperCase().indexOf(searchBarInput.value.toUpperCase().trim()) > -1){
            console.log(itemText.parentElement)
            itemText.parentElement.style.display = "";
        }else{
            itemText.parentElement.style.display = "none";
            
        }
    }    
    
});



// adding new task section
let itemContainer = document.getElementById("itemHolder");
let newItem = document.getElementById("addItem");
newItem.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        if (newItem.value.trim() !== ""){
            addTask();
            newItem.value = "";
        }else{
            alert(`Cannot add an empty task!`);
        }
    }
});

function addTask(){
    // add new input to the list item property.
    let data = localStorage.getItem('todoList');
    let readyData = JSON.parse(data) || [];
    
    // add the new item to the saved list
    const newData = {
        id: Date.now(),
        title: `${newItem.value}`,
        completed: false
    }

    readyData.push(newData);

    // create a new div tag for new input.
    let tag = document.createElement('div');
    tag.innerHTML = `
    <div class="item" data-id="${newData.id}">
        <input type="checkbox" class="checkBox" id="${newData.id}">
        <label for="${newData.id}">${newData.title}</label>
        
        <div class="editCover">
            <span id="edit" class="edit"><i class="fas fa-pencil"></i></span>
            <span id="close" class="close"><i class="fas fa-close"></i></span>
        </div>
    </div> 
    `
    
    let savedData =JSON.stringify(readyData); 
    localStorage.setItem("todoList", savedData);
    
    // finally, add the new div to the HTML list
    itemContainer.appendChild(tag);    
}



// loading the page for the first time
window.addEventListener('load', displayAllTasks);
function displayAllTasks() {
    let heading = JSON.parse(localStorage.getItem('todoHeading')) || "";
    headingInput.value = heading;

    let data = localStorage.getItem('todoList');
    let readyData = JSON.parse(data) || [];
    
    for (let i= 0; i < readyData.length; i++){
        
        // create a new div tag for new input.
        let tag = document.createElement('div');

        if (readyData[i].completed === true){
            tag.innerHTML = `
            <div class="item" data-id="${readyData[i].id}">
                <input type="checkbox" class="checkBox" id="${readyData[i].id}" checked>
                <label for="${readyData[i].id}">${readyData[i].title}</label>
                
                <div class="editCover">
                    <span id="edit" class="edit"><i class="fas fa-pencil"></i></span>
                    <span id="close" class="close"><i class="fas fa-close"></i></span>
                </div>
            </div> 
            `
            itemContainer.appendChild(tag); 
            
        }else{
            tag.innerHTML = `
            <div class="item" data-id="${readyData[i].id}">
                <input type="checkbox" class="checkBox" id="${readyData[i].id}">
                <label for="${readyData[i].id}">${readyData[i].title}</label>
                
                <div class="editCover">
                    <span id="edit" class="edit"><i class="fas fa-pencil"></i></span>
                    <span id="close" class="close"><i class="fas fa-close"></i></span>
                </div>
            </div> 
            `
            itemContainer.appendChild(tag); 

        }
    }
}




// Editing heading section
let todoHeading = document.getElementById("toDoHeading");
let headingInput = todoHeading.getElementsByTagName("input")[0];

let editHeadingIcon = document.getElementById("editHeading").addEventListener("click", () => {
    headingInput.focus()
});

headingInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        if (headingInput.value.trim() === ""){
            alert("Todo Title cannot be empty");
        }else{
            let savedHeading = localStorage.setItem("todoHeading", JSON.stringify(`${headingInput.value}`));
            headingInput.blur();
        }
    }
});



// sideNav selection
let sideNav = document.getElementById("sideNav");
sideNav.addEventListener("click", (e) => {
    if (!e.target.matches("p")) return;

    let todoItems = itemHolder.getElementsByClassName("item");
    for (let i = 0; i<todoItems.length; i++){
        todoItems[i].style.display = "";
    }
    
    let tagss = sideNav.querySelectorAll("p");
    tagss.forEach(tag => tag.classList.remove("active"));
    
    if(e.target.matches("p")){
        e.target.classList.add("active");
        
        if(e.target.id == "showAllTasks"){
            for (let i = 0; i<todoItems.length; i++){
                todoItems[i].style.display = "";
            }
        }


        if(e.target.id == "showPendingTasks"){
            for (let i = 0; i<todoItems.length; i++){
                if(todoItems[i].getElementsByTagName("input")[0].checked){
                    console.log(todoItems[i].getElementsByTagName("input")[0].checked);
                    todoItems[i].style.display = "none";
                }
            }
        }
        

        if(e.target.id == "showCompletedTasks"){
            for (let i = 0; i<todoItems.length; i++){
                if(!todoItems[i].getElementsByTagName("input")[0].checked){
                    todoItems[i].style.display = "none";
                }
            }
            
        }
    }

    document.getElementById("toggleLabel").checked = false;
})



// removing a particular task
const itemHolder = document.getElementById("itemHolder");

itemHolder.addEventListener("click", (e) => {
    if (e.target.closest(".close")){
        let data = e.target.closest(".item");
        
        let storage = localStorage.getItem('todoList');
        let readyData = JSON.parse(storage) || [];
        
        let dataId = data.dataset.id;
        console.log(dataId) 
        let indexofdata = readyData.findIndex(x => x.id === dataId);
        
        readyData.splice(indexofdata, 1);
        data.classList.add("removeTask");
        
        let savedData =JSON.stringify(readyData); 
        localStorage.setItem("todoList", savedData);
    }
});



// updating localstorage when task is checked as completed
itemHolder.addEventListener("change", (e) => {
    if (!e.target.matches("input[type='checkbox']")) return;

    let storedItem = JSON.parse(localStorage.getItem("todoList")) || [];

    const taskEl = e.target.closest(".item");
    if(!taskEl) return;

    let item = storedItem.find(i => Number(i.id) === Number(taskEl.dataset.id));
    
    if (!item) return;
    item.completed = e.target.checked;

    localStorage.setItem("todoList", JSON.stringify(storedItem));

})



// Editing a particular task
let editInput = document.getElementById("editInput");
let taskValueToEdit;
let inputEl;

itemHolder.addEventListener("click", (e) => {
    if (!e.target.matches(".fa-pencil")) return;
    
    let editItem = e.target.closest(".item");
    taskValueToEdit = editItem.dataset.id;
    inputEl = editItem.getElementsByTagName("label")[0];
    
    document.getElementById("editIcon").style.display = "flex";
    editInput.value = inputEl.innerHTML;
});

// edit section after edit modal box appears
document.getElementById("editBtnCover").addEventListener("click", (e) => {
    
    if (!e.target.matches("button")) return;

    let storedItem = JSON.parse(localStorage.getItem("todoList")) || [];
    let storedItemToEdit = storedItem.find(item => item.id == taskValueToEdit)
    console.log(storedItemToEdit)
    if (e.target.matches("#yes" )){
        if (!editInput.value.trim()) {
            alert("Cannot add empty task");
        }

        if (editInput.value.trim()) {
            inputEl.innerHTML = editInput.value.trim();
            let newEdited = editInput.value.trim();
            storedItemToEdit.title = newEdited;
            localStorage.setItem("todoList", JSON.stringify(storedItem));
            
            document.getElementById("editIcon").style.display = "none";
        }
    }else if (e.target.matches("#no")){
        document.getElementById("editIcon").style.display = "none";
    }
});






// removing all items 
const trash = document.querySelector(".fa-trash");
trash.addEventListener("click", (e) => {
    // display the modal
    let modalBox = document.getElementById("modal");
    modalBox.style.display = "flex";

    modalBox.addEventListener("click", (e) => {
        if(e.target.id === "allTaskDelete"){
            let allItems = document.getElementsByClassName("item");
            let allItemsLength = allItems.length;
            for (let i=allItemsLength - 1; i>=0; i--){
                allItems[i].remove();
            }
            
            localStorage.removeItem('todoList');
            modalBox.style.display = "none";
        }else{
            modalBox.style.display = "none";
        }
    });
});
