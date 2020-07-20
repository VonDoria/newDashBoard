
MenuID = ['form', 'painel1'];
CurrentlyPage = 1;

DefaultStyle = 'box-shadow: 0px 3px 4px #555;text-decoration: none;margin: 5px 20px;background: #ccc;height: 8vh;border-radius: 15px;display: flex;flex-direction: column;justify-content: center;color: #444;font: 600 25px Josefin Sans, sans-serif;';
LinkListLength = 0;
AuxiliarTaskList = [];
AuxiliarLinkList = [];
StatusList = ["Branco", "Azul", "Cinza", "Verde", "Vermelho", "Amarelo", "Preto"];
TaskList = "";
initialize();





// -------------------------******************************************____________--------------------


document.onkeypress = e => {
    if(e.which == 13 && document.getElementById("name").value != "") Register();
}

document.addEventListener("dragstart", event => {
    event.dataTransfer.setData("Text", event.target.id);
    event.target.style.opacity = "0.4";
});

document.addEventListener("dragend", event => {
    event.target.style.opacity = "1";
});


document.addEventListener("dragenter", event => {
    if(event.target.className == "draghere") event.target.style.boxShadow = "0px 0px 25px 30px #96ff8c";
});

document.addEventListener("dragover", event => event.preventDefault());

document.addEventListener("dragleave", event => {
    if (event.target.className == "draghere") event.target.style.boxShadow = "none";
});

document.addEventListener("drop", event => {
    if(event.target.className == "draghere")
    {
        document.querySelector('.draghere').style.boxShadow = "none";
        var data = event.dataTransfer.getData("Text");
        document.getElementById(data).style.display = "none";

        if(data.includes("Task_"))
        {
            var x = AuxiliarTaskList.indexOf(data);
            AuxiliarTaskList.splice(x, 1);
            TaskList.splice(x, 1);
            StorageList = JSON.stringify(TaskList);
            localStorage.setItem("TaskList", StorageList);
            CheckTask();
            TaskList.map(CreateTask);
        }else{
            var x = AuxiliarLinkList.indexOf(data);
            AuxiliarLinkList.splice(x, 1);
            LinkList.splice(x, 1);
            StorageList = JSON.stringify(LinkList);
            localStorage.setItem("LinkList", StorageList);
            CheckList();
            LinkList.map(CreateElement);
        }        
        console.log("Item excluido");
    }    
    if(event.target.className == "painel")
    {
        document.querySelector('.draghere').style.boxShadow = "none";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
});

// ---------------------------------------------------------------------------------


function Register()
{
    var Name = document.getElementById("name").value;
    var Link = document.getElementById("link").value;
    var Style = document.getElementById("style").value;
    var Hover = document.getElementById("hover").value;

    document.getElementById("name").value = "";
    document.getElementById("link").value = "";
    document.getElementById("style").value = "";
    document.getElementById("hover").value = "";

    if(document.getElementById(Name) == null)
    {
        LinkList[LinkListLength] = {
            "name": Name,
            "link": Link,
            "style": Style,
            "hover": Hover
        };
        StorageList = JSON.stringify(LinkList);
        localStorage.setItem("LinkList", StorageList);
        CheckList();
        LinkList.map(CreateElement);
        console.log("Item criado");
    }
    else{console.log("O item já existe");}
    return;
}

function CheckList()
{
    if(localStorage.getItem("LinkList") == null)
    {
        console.log("Lista de Links não encontrada");
        localStorage.setItem("LinkList", "[]");
        if(localStorage.getItem("LinkList") != null) 
        {
            console.log("Lista de Links criada");
            LinkList = localStorage.getItem("LinkList");
            LinkList = JSON.parse(LinkList);
            console.log(LinkList);
        }
    }
    else{
        LinkList = localStorage.getItem("LinkList");
        if(localStorage.getItem("LinkList") != "" && localStorage.getItem("LinkList") != null)
        {
            LinkList = JSON.parse(LinkList);
            LinkListLength = LinkList.length;
        }
    }    
    return;
}

function CreateElement (item, index)
{
    var Task_id = "Link_" + item.name;
    if(document.getElementById(Task_id) == null)
    {
        // console.log(item.name);
        AuxiliarLinkList[index] = "Link_" + item.name;
        var element = document.createElement("A");
        element.innerHTML = item.name;
        element.className = "temp";
        element.id = "Link_" + item.name;
        element.setAttribute("style", (DefaultStyle + item.style));
        element.setAttribute("href", item.link);
        element.setAttribute("target", "_blank");
        element.setAttribute("draggable", "true");
        var Npainel = Math.floor(index/painelSize) + 1;
        Npainel.toString;
        var painel = 'painel' + Npainel;
        if(document.getElementById(painel) == null) CreatePainel(painel);
        var painel = document.getElementById(painel);
        painel.appendChild(element);
    }
    return;
}

function CreatePainel(ID)
{
    var carrocel = document.getElementById('carrocel');
    var newpainel = document.createElement("DIV");
    newpainel.className = "painel";
    newpainel.id = ID;
    carrocel.appendChild(newpainel);
    MenuID[MenuID.length] = ID;
    return;
}

function Switch (key) 
{
    let deslocamento = screen.width / 10;
    
    if(key == 'E' && CurrentlyPage > 0) 
    {
        let atual = document.getElementById(MenuID[CurrentlyPage]);
        let anterior = document.getElementById(MenuID[(CurrentlyPage - 1)]);
        atual.style.transform = `rotateY(90deg) translateZ(${deslocamento}px)`;
        anterior.style.transform = `rotateY(0deg) translateZ(${deslocamento}px)`;
        CurrentlyPage = CurrentlyPage - 1;
    }
    if(key == 'D' && CurrentlyPage < (MenuID.length - 1)) 
    {
        let atual = document.getElementById(MenuID[CurrentlyPage]);
        let proximo = document.getElementById(MenuID[(CurrentlyPage + 1)]);
        atual.style.transform = `rotateY(-90deg) translateZ(${deslocamento}px)`;
        proximo.style.transform = `rotateY(0deg) translateZ(${deslocamento}px)`;
        CurrentlyPage = CurrentlyPage + 1;
    }
    return;
}

function Prevew()
{
    var Name = document.getElementById("name").value;
    var Style = document.getElementById("style").value;

    var tempitem = document.getElementById("example");
    tempitem.innerHTML = Name;
    tempitem.className = "temp";
    tempitem.setAttribute("style", (DefaultStyle + Style));
    return;
}

function initialize()
{
    painelSize = Math.floor((document.querySelector("#carrocel").offsetHeight) / 100);
    CheckList();
    if(localStorage.getItem("LinkList") != "[]" && localStorage.getItem("LinkList") != null) LinkList.map(CreateElement);
    TaskList = CheckTask();
    if(localStorage.getItem("TaskList") != "[]" && localStorage.getItem("TaskList") != null) TaskList.map(CreateTask);
}

function ChangePage(ID)
{
    if(ID == 'main_menu') 
    {
        var element = document.getElementById(ID);
        element.style.zIndex = "2";
        element.style.opacity = "1";
    }
    else
    {
        var pageList = document.querySelectorAll(".page_menu");
        pageList.forEach(element => {
            if(element.id == ID) 
            {
                element.style.zIndex = "0";
                element.style.opacity = "1";
            }else{
                element.style.zIndex = "-1";
                element.style.opacity = "0";
            }    
        });
    }
    return;
}

function CheckTask()
{
    if(localStorage.getItem("TaskList") == null)
    {
        console.log("Lista de Tarefas não encontrada");
        localStorage.setItem("TaskList", "[]");
        if(localStorage.getItem("TaskList") != null) 
        {
            console.log("Lista de Tarefas criada");
            TaskList = localStorage.getItem("TaskList");
            TaskList = JSON.parse(TaskList);
            console.log(TaskList);
        }
    }
    else{
        TaskList = localStorage.getItem("TaskList");
        if(localStorage.getItem("TaskList") != "" && localStorage.getItem("TaskList") != null)
        {
            TaskList = JSON.parse(TaskList);
            TaskListLength = TaskList.length;
        }
    }    
    return TaskList;
}

function CreateTask(item, index)
{
    var idName = item.title.replace(/ /g, "");
    var Task_id = "Task_" + idName;
    AuxiliarTaskList[index] = Task_id;
    if(document.getElementById(Task_id) == null)
    {
        var elementContainer = document.createElement("DIV");
        var elementTitle = document.createElement("DIV");
        var elementDescription = document.createElement("P");
        elementContainer.appendChild(elementTitle);
        elementContainer.appendChild(elementDescription);
        elementContainer.setAttribute("draggable", "true");
        elementTitle.innerHTML = item.title;
        elementDescription.innerHTML = item.description;
        elementContainer.id = Task_id;
        elementContainer.setAttribute("onClick", `ChangeColor(${elementContainer.id})`);
        elementContainer.className = "Task_container " + item.status;
        var fatherElement = document.querySelector('.planner_window');
        fatherElement.appendChild(elementContainer);
    }else{
        return;
    }
    return;
}

function ChangeColor(id)
{
    TaskId = id.id;
    clss = document.querySelector("#" + TaskId);
    indexC = StatusList.indexOf(clss.classList[1]);

    clss.classList.remove(clss.classList[1]);
    clss.classList.add(StatusList[indexC + 1]);

    var posicao = AuxiliarTaskList.indexOf(id.id);
    TaskList[posicao].status = StatusList[indexC + 1];
    StorageList = JSON.stringify(TaskList);
    localStorage.setItem("TaskList", StorageList);
    return;
}

function RegisterTask()
{
    var title = document.querySelector('#input_title').value;
    var description = document.querySelector('#input_description').value;

    document.querySelector('#input_title').value = "";
    document.querySelector('#input_description').value = "";
    var tempObject = {
        "title": title,
        "description": description,
        "status": "Branco"
    };

    var idItem = "Task_" + title.replace(/ /g, "");
    if(AuxiliarTaskList.indexOf(idItem) == -1)
    {
        AuxiliarTaskList.push(idItem);
        TaskList[TaskListLength] = tempObject;
        StorageList = JSON.stringify(TaskList);
        localStorage.setItem("TaskList", StorageList);
        CheckTask();
        TaskList.map(CreateTask);
        console.log("Item criado");
    }
    else{console.log("O item já existe");}
    return;
}
