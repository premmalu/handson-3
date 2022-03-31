let card = document.getElementById("cards");
let cardbody = document.getElementById("cardBody");
var table = document.querySelector("#mytable");
var list = document.getElementById("tableBody");

let empList = [];

function fetchdata() {
  fetch("./employee.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      empList = jsondata;                                   

      // console.log(empList);
    });
}
// remove elemrnt inside grid
function removeGridEle(ele, empid) {
  ele.remove();
  empList = empList.filter((emp, ind) => {
    return emp.id != empid;
  });
  gridLoop();
  listLoop();
  console.log(empList);
}
// remove elemrnt inside list
function removeListEle(ele, empid) {
  ele.remove();
  empList = empList.filter((emp, ind) => {
    return emp.id != empid;
  });
  gridLoop();
  listLoop();
  console.log(empList);
}

function gridToggle() {
  card.classList.toggle("display");
  gridLoop();
}

// iterating array of json for card contant display
function gridLoop() {
  let empele = "";
  for (let i = 0; i < empList.length; i++) {
    let emp = empList[i];
    var edit = "editg" + i;
    var save = "saveg" + i;
    let listId = "listId" + i;
    let inputbox = "inputbox" + i;
    empele += `<div class="card col-lg-3 col-md-6 col-sm-12 col-12 m-5 justify-content-center" >
    <button id="button remove" onclick="removeGridEle(parentNode,${emp.id})">
      
      X
    </button>

    <img src="${emp.img}" alt="profile" srcset="" />

    <h2 id="Name">NAME: ${emp.name}</h2>
    <p id="addons">
      <li>ID: ${emp.id}</li>
      <li>PROJECT: ${emp.project}</li>
      <li>HCM: ${emp.HCM}</li>
      <li class="${listId}">SKILLS :  ${emp.Skills}
      </li>
    </p>
    <div class='editbuttons'>
    <div class=" btn-sm  bg-danger ${edit} " onclick="editinput(${i})">
      Edit
      </div>
    <div class=" btn-sm  bg-danger ${save} hidden" onclick="saveinput(${i})">
      Save
      </div>
      </div>
  </div>`;
  }
  cardbody.innerHTML = empele;
  // console.log(empele);
}




function editinput(empi) {
  // temporary variable for syntax validation purpose
  let inputbox = "inputbox" + empi;
  let emp = empList[empi];
  // let read = document.querySelector("#inputbox" + empi).textContent;
  let read = document.querySelector(".listId" + empi);

  read.innerHTML = `SKILLS: <input class='input' type='text' id="${inputbox}" value= ${emp.Skills}>`;
  document.querySelector(".editg" + empi).classList.add("hidden");
  document.querySelector(".saveg" + empi).classList.remove("hidden");
}

// function to save elements inside input tag
function saveinput(empi) {
  let read = document.querySelector("#inputbox" + empi).value;
  const arrays = empList[empi];
  arrays.Skills = read;
  document.querySelector(
    ".listId" + empi
  ).innerHTML = `SKILLS: ${arrays.Skills}`;
  console.log(read, arrays.Skills, arrays);
  document.querySelector(".editg" + empi).classList.remove("hidden");
  document.querySelector(".saveg" + empi).classList.add("hidden");
  listLoop();
}



// iterating array of json for card contant display

function listLoop() {
  let row = "";
  for (var i = 0; i < empList.length; i++) {
    let emp = empList[i];
    var listId = "listid" + i;
    var edit = "edit" + i;
    var save = "save" + i;
    row += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.id}</td>
        <td class="${listId}">${emp.Skills}</td>  
        <td>${emp.project}</td>
        <td>${emp.HCM}</td>
        <td>
        <i class="far fa-edit ${edit}" onclick="editinputlist(${i})"></i>
        <i class="far fa-save ${save} hidden" onclick="saveinputList(${i})"></i>
        </td>
        <td id="button" class ="btn-xs  remove " onclick="removeListEle(parentNode,${emp.id})">
        X
      </td>
      </tr>`;
  }
  list.innerHTML = row;
}
// function to toggle list
function listToggle() {
  table.classList.toggle("disp");
  listLoop();
}
// function to fetch dta for table

// Function to enable edit in input tag input


function editinputlist(empi) {
  // temporary variable for syntax validation purpose
  let inputbox = "inputbox" + empi;
  let emp = empList[empi];
  // let read = document.querySelector("#inputbox" + empi).textContent;
  let read = document.querySelector(".listid" + empi);

  read.innerHTML = `<input class='input' type='text' id="${inputbox}" value= ${emp.Skills}>`;

  document.querySelector(".edit" + empi).classList.add("hidden");
  document.querySelector(".save" + empi).classList.remove("hidden");
}

function saveinputList(empi) {
  let read = document.querySelector("#inputbox" + empi).value;
  const arrays = empList[empi];
  arrays.Skills = read;
  document.querySelector(".listid" + empi).innerHTML = `${arrays.Skills}`;
  console.log(read, arrays.Skills, arrays);
  document.querySelector(".edit" + empi).classList.remove("hidden");
  document.querySelector(".save" + empi).classList.add("hidden");
  gridLoop();
}
