let arr = [];
let checkedList = [];
let firstName;
let lastName;
let email;
let age;
let id = 0;
let gender;

$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    // or return false;
  });
  drawDataTable();

  $("#submit").click(function () {
    firstName = $("#firstName").val();
    lastName = $("#lastName").val();
    email = $("#email").val();
    age = $("#age").val();
    gender = $("#selectGender").val();

    let objArr = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      gender: gender,
    };
    id++;

    if ($("#id").val() !== "") {
      _id = $("#id").val();
      // replace value
      arr[_id].firstName = firstName;
      arr[_id].lastName = lastName;
      arr[_id].email = email;
      arr[_id].age = age;
      arr[_id].gender = gender;
    } else {
      // push
      arr.push(objArr);
    }
    //id = -1;

    $(".input").val("");
    // console.log(arr);
    // delete all
    btnDelete();
    getDataRow();
    drawDataTable();
    // btnCheck();
    checkAll(arr);
  });
});
function drawDataTable() {
  $("#dataTable").DataTable({
    destroy: true,
    data: arr,
    columns: [
      { title: "Id", data: "id" },
      {
        title: "<input type='checkbox' id='selectAll' class='selectAll'/>",
        data: function (data) {
          return (
            "<input id='checkList' class='chckItem' type='checkbox' data-id=" + data.id + "></input>"
          );
        },
      },
      {
        title: "Edit",
        data: function (data) {
          return (
            "<button id='btnSelect' class='btn btn-primary btnSelect' type='button' data-id= " +
            data.id +
            ">Edit</button>"
          );
        },
      },
      { title: "First Name", data: "firstName" },
      { title: "Last Name", data: "lastName" },
      { title: "Email", data: "email" },
      { title: "Age", data: "age" },
      { title: "Gender", data: "gender" },
    ],
    "drawCallback": function () {
      $("#dataTable").on("click", "tr td .btnSelect", function () {
        // get the current row
        var currentRow = $(this).closest("tr");
        var id = currentRow.find("td:eq(0)").text();
        let firstName = currentRow.find("td:eq(3)").text(); // get current row firstName table cell TD value
        let lastName = currentRow.find("td:eq(4)").text(); // get current row lastName table cell TD value
        let email = currentRow.find("td:eq(5)").text(); // get current row email table cell  TD value
        let age = currentRow.find("td:eq(6)").text(); // get current row age table cell  TD value
        let gender = currentRow.find("td:eq(7)").text(); // get current row gender table cell  TD value
        // console.log(gender);

        // passing to text input fields
        $("#id").val(id);
        $("#firstName").val(firstName);
        $("#lastName").val(lastName);
        $("#email").val(email);
        $("#age").val(age);
        $("#selectGender").val(gender);
      });
      $(".chckItem").change(function() {
        if ($(this).is(":checked")) {
          checkedList.push($(this).attr("data-id"));
        }
        else {
          checkedList = checkedList.filter((item) => !checkedList.includes(item));
        }
      });
    },
  });
}

function getDataRow() {
  // code to read selected table row cell data (values).
  $("#dataTable").on("click", "#btnSelect", function () {
    /*
    // get the current row
    var currentRow = $(this).closest("tr");
    var id = currentRow.find("td:eq(0)").text();
    let firstName = currentRow.find("td:eq(3)").text(); // get current row firstName table cell TD value
    let lastName = currentRow.find("td:eq(4)").text(); // get current row lastName table cell TD value
    let email = currentRow.find("td:eq(5)").text(); // get current row email table cell  TD value
    let age = currentRow.find("td:eq(6)").text(); // get current row age table cell  TD value
    let gender = currentRow.find("td:eq(7)").text(); // get current row gender table cell  TD value
    // console.log(gender);

    // passing to text input fields
    $("#id").val(id);
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);
    $("#email").val(email);
    $("#age").val(age);
    $("#gender").val(gender);
    */
  });
}

function checkAll(objArr) {
  $(".selectAll").on("change", function () {
    $("input:checkbox").not(this).prop("checked", this.checked);
    // checkedList.push($(this).attr("data-id"));
    checkedList.push(objArr);
    console.log(checkedList);
  });
}

function btnDelete() {
  $("#btnDelete").on("click", function () {
    console.log(checkedList);

    $.each(checkedList, function(i, v) {
      arr = arr.filter(x => x.id != parseInt(v));
    });

    drawDataTable()
  });
}
