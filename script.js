
MenuID = ['form', 'painel1'];
CurrentlyPage = 1;

DefaultStyle = 'box-shadow: 0px 3px 4px #555;text-decoration: none;margin: 5px 20px;background: #ccc;height: 60px;border-radius: 15px;display: flex;flex-direction: column;justify-content: center;color: #444;font: 600 25px Josefin Sans, sans-serif;';
ListLength = 0;
AuxiliarList = [];

CheckList();

if(localStorage.getItem("LinkList") != "[]" && localStorage.getItem("LinkList") != null) LinkList.map(CreateElement);


document.addEventListener("dragstart", event => {
    event.dataTransfer.setData("Text", event.target.id);
    event.target.style.opacity = "0.4";
});

document.addEventListener("dragend", event => event.target.style.opacity = "1");

document.addEventListener("dragenter", event => {
    if(event.target.className == "draghere") event.target.style.boxShadow = "0px 0px 15px 10px #30fd1d";
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
        var x = AuxiliarList.indexOf(data);
        AuxiliarList.splice(x, 1);
        LinkList.splice(x, 1);
        StorageList = JSON.stringify(LinkList);
        localStorage.setItem("LinkList", StorageList);
        CheckList();
        LinkList.map(CreateElement);
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
        LinkList[ListLength] = {
            "name": Name,
            "link": Link,
            "style": Style,
            "hover": Hover
        };
        // CreateElement(LinkList[ListLength]);
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
            ListLength = LinkList.length;
            console.log(ListLength);
        }    
        console.log(LinkList);
    }    
    return;
}

function CreateElement (item, index)
{
    if(document.getElementById(item.name) == null)
    {
        // console.log(item.name);
        AuxiliarList[index] = item.name;
        var element = document.createElement("A");
        element.innerHTML = item.name;
        element.className = "temp";
        element.id = item.name;
        element.setAttribute("style", (DefaultStyle + item.style));
        element.setAttribute("href", item.link);
        element.setAttribute("target", "_blank");
        element.setAttribute("draggable", "true");
        var Npainel = Math.floor(index/6) + 1;
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
    if(key == 'E' && CurrentlyPage > 0) 
    {
        let atual = document.getElementById(MenuID[CurrentlyPage]);
        let anterior = document.getElementById(MenuID[(CurrentlyPage - 1)]);
        atual.style.transform = "rotateY(90deg) translateZ(135px)";
        anterior.style.transform = "rotateY(0deg) translateZ(135px)";
        CurrentlyPage = CurrentlyPage - 1;
    }
    if(key == 'D' && CurrentlyPage < (MenuID.length - 1)) 
    {
        let atual = document.getElementById(MenuID[CurrentlyPage]);
        console.log(atual);
        let proximo = document.getElementById(MenuID[(CurrentlyPage + 1)]);
        console.log(proximo);
        atual.style.transform = "rotateY(-90deg) translateZ(135px)";
        proximo.style.transform = "rotateY(0deg) translateZ(135px)";
        CurrentlyPage = CurrentlyPage + 1;
    }
    console.log(CurrentlyPage);
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

document.onkeypress = e => {
    if(e.which == 13 && document.getElementById("name").value != "") Register();
}

