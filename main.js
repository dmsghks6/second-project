// 1. 값을 입력한다. 
// 2. + 버튼을 클릭하면 아이템이 더해진다 (할일 추가)
// 3. delete 버튼 누르면 리스트에서 삭제된다. 
// 4. chk를 누르면 할일이 끝나면 밑줄이 간다. 
// 진행중 끝남 탭을 누르면, 언더바가 이동한다. 
// Done 탭은 끝난 아이템만 , not Done 탭은 진행중인 아이템만 나온다. 
// all 탭을 누르면 다시 전체 아이템으로 돌아옴 

//1.chk 버튼 클릭하면 isComplete를 false를 true로
//2. true면 끝난걸로 간주하고 밑줄 긋기
//3. false면 그대로 

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-btn');
let taskList = [];
let mode = "";
let tabs = document.querySelectorAll(".task-tabs div")
//조건에 만족하는 모든걸 가져옴 

let underLine = document.getElementById('under-line')


addButton.addEventListener('click',addTask);
taskInput.addEventListener('keypress',enterKey);

function enterKey(){
    if(window.event.keyCode == 13){
        addTask()
    }
}

taskInput.addEventListener('focus',function(){
    taskInput.value = ""
})






function addTask(){
  
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value ,
        isComplete : false,

    }
   taskList.push(task)
   console.log(taskList)

   render()
}

function render(){
    let list = [];

    if(mode == "all" || mode == ""){
        list = taskList
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList    
    }


    let resultHTML = "";


    for(let i = 0; i < list.length; i++){

        if(list[i].isComplete == true){
            resultHTML += 
            `<div class="task">
            <div class = "task-done">${list[i].taskContent}</div>
            
            <div class="click">
                <button onclick='toggleComplete("${list[i].id}")'><i class="fa-solid fa-rotate-left" style="color: #110189;"></i></button>
                <button onclick='deleteTask("${list[i].id}")'>Delete</button>
            </div>
         </div>`

        }else{
            resultHTML += `
            <div class="task">
                <div>${list[i].taskContent}</div>
                
                <div class="click">
                    <button onclick='toggleComplete("${list[i].id}")'><i class="fa-solid fa-check" style="color: #db0000;"></i></button>
                    <button onclick='deleteTask("${list[i].id}")'>Delete</button>
                </div>
             </div>
            `
        }
 
    }

    document.getElementById('task-board').innerHTML = resultHTML;

}

function toggleComplete(chkId){
    console.log("id",chkId)    

    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == chkId){
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    
    
    render()
    console.log(taskList)
}


function deleteTask(chkId){
   
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == chkId){
            taskList.splice(i,1)
            break;
        }
    }
    console.log('삭제')
    render()
    console.log(taskList)

}

tabs.forEach(menu => menu.addEventListener('click', (e)=> underLineIndicator(e)))

function underLineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.Top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";


}



for(let i=1; i < tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}


function filter(event){
    console.log("filter 클릭",event.target.id)
	    filterList = [];
    mode = event.target.id;


    if(mode == "all"){
        render()
    }else if(mode == "ongoing"){
        for(let i = 0; i <taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()

    }else if(mode == "done"){
        for(let i = 0; i <taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }

        render()
    }
    

}
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2,9)
}