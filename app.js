window.onload = function () {
  updatetsks();
};

function do_insert_row_table() {
  //overloadinng doesnt work in javascript like in other OOP
  //arguments[0]=tas k
  //argumentnts[1]=hour
  //arguments[2]=check

  let tableau = document.getElementsByTagName("table")[0];
  let row = document.createElement("tr");

  let col1 = document.createElement("td");
  let col2 = document.createElement("td");
  let col3 = document.createElement("td");
  let col4 = document.createElement("td");

  chkbx = document.createElement("input");
  chkbx.setAttribute("type", "checkbox");
  chkbx.setAttribute("class", "chk");

  dltt = document.createElement("button");
  dltt.setAttribute("class", "dlt");
  dltt.innerHTML = "DELET";

  col1.innerHTML = arguments[0];
  col2.innerHTML = arguments[1];
  col3.append(chkbx);
  col4.append(dltt);

  row.append(col1);
  row.append(col2);
  row.append(col3);
  row.append(col4);

  tableau.append(row);

  if (arguments.length == 3) {
    //do_insert_row_table(arguments[0] ,arguments[1]);

    if (arguments[2] == true) {
      let tableau = document.getElementById("tbl");

      let j = tableau.rows.length - 1;

      tableau.rows[j].cells[2].children[0].checked = true;
    }
  }
}

taskks = [
  // {
  //     task:" creat weather app",
  //     hour:"",
  //     tcheck:false
  // },
  // {
  //     task:"codea todo list app 2",
  //     hour:"",
  //     tcheck:true
  // },
  // {
  //     task:"finish js course",
  //     hour:"",
  //     tcheck:true
  // }
];

function initlocal() {
  if (window.localStorage.getItem("tasks")) {
    let data = window.localStorage.getItem("tasks");
    taskks = JSON.parse(data);
    // console.log(taskks);
    let tableau = document.getElementsByTagName("table")[0];

    for (let i = 1; i < tableau.rows.length; i++) {
      let task = tableau.rows[i].cells[0].innerHTML;
      let hour = tableau.rows[i].cells[1].innerHTML;
      let tcheck = tableau.rows[i].cells[2].children[0].checked;

      taskks.push({ task, hour, tcheck });
    }

    init();
  }
}

function init() {
  for (let i = 0; i < taskks.length; i++) {
    do_insert_row_table(taskks[i].task, taskks[i].hour, taskks[i].tcheck);
  }
}

initlocal();

function add_row_from_click() {
  let inptadd = document.getElementById("inptadd");
  let inptaddh = document.getElementById("inptaddh");

  hourr = inptaddh.value;
  taskk = inptadd.value;

  if (taskk != "") {
    //the hour fiels is not nessecary
    do_insert_row_table(taskk, hourr);
    inptaddh.value = "";
    inptadd.value = "";
  } else {
    alert("Please fill out the task");
  }
  inptadd.focus();
  saveff();
  updatetsks();
}

function updatetsks() {
  var tsks = 0,
    tsksdone = 0;

  let tableau = document.getElementById("tbl");
  tsks = tableau.rows.length - 1;
//   console.log(tsks);

  for (var j = 1; j < tableau.rows.length; j++) {
    if (tableau.rows[j].cells[2].children[0].checked == true) {
      tsksdone = tsksdone + 1;
    }
  }

  let dnn = document.getElementById("dnn");

  dnn.innerHTML = `${tsksdone} / ${tsks}`;
}

function deleetRow() {
  let tableau = document.getElementsByTagName("table")[0],
    rIndex;

  for (var i = 1; i < tableau.rows.length; i++) {
    tableau.rows[i].cells[3].onclick = function () {
      rIndex = this.parentElement.rowIndex;

      tableau.deleteRow(rIndex);
    };
  }
}
function deletall() {
  let tableau = document.getElementsByTagName("table")[0];  
  let i = tableau.rows.length;  
    while (i>1) {
        tableau.deleteRow(i-1);
        i=i-1;
    }
}

//   for (var i = 1; i < tableau.rows.length; i++) {
//     tableau.deleteRow(1);
//   }
// }

function saveff() {
  let tableau = document.getElementsByTagName("table")[0];

  // for (let i = 0; i < taskks.length; i++) {
  //    taskks.pop();

  // }

  taskks = [];
  for (let i = 1; i < tableau.rows.length; i++) {
    let task = tableau.rows[i].cells[0].innerHTML;
    let hour = tableau.rows[i].cells[1].innerHTML;
    let tcheck = tableau.rows[i].cells[2].children[0].checked;

    taskks.push({ task, hour, tcheck });
  }

  savetoloccal(taskks);
}
function savetoloccal(taskfs) {
  window.localStorage.setItem("tasks", JSON.stringify(taskfs));
}
// function popfromloccal() {
//   let jj = window.localStorage.getItem("tasks");
//   if (jj) {
//     console.log(JSON.parse(jj));
//   }
// }

let inptadd = document.getElementById("inptadd");
let inptaddh = document.getElementById("inptaddh");

inptadd.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    inptaddh.focus();
  }
});
inptaddh.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    document.getElementById("btnadd").focus();
  }
});
addEventListener("click", () => {
  deleetRow();
  updatetsks();
  saveff();
});
