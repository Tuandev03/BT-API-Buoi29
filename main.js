import Student from "./javascripts/students.js";
// import Customer from "./javascripts/customers.js";
import Person from "./javascripts/persons.js";
let person = new Person();
document.querySelector(".btnAdddd").onclick = () => {
  let arrFiled = document.querySelectorAll(".form-control");
  const students = new Student();
  arrFiled.forEach((item) => {
    let { id, value } = item;
    // Chuyển đổi dữ liệu thành số trước khi gán vào thuộc tính của đối tượng Student
    students[id] = value;
  });
  person.addPerson(students);
  // console.log(person.listPersons);
  renderStudent();

  // Tắt modal
  $("#exampleModal").modal("hide");
  document.querySelector("#formGroup").reset();
  saveDataStudentLocal();
};
let hide = document.querySelector(".btnHide");
hide.addEventListener("click", () => {
  document.getElementById("btnCapNhat").style.display = "none";
});

// Xóa món ăn

const renderStudent = (arrFiled = person.listPersons) => {
  let content = "";
  arrFiled.forEach((item) => {
    let newStudent = new Student();
    newStudent = { ...newStudent, ...item };
    const { ID, HoTen, DiaChi, Email, HocVienToan, HocVienHoa, HocVienLy } =
      newStudent;
    // Chuyển đổi dữ liệu thành số

    // Kiểm tra dữ liệu sau khi chuyển đổi
    content += `
        <tr class="mb-4 pb-4 tr">
          <td class="td">${ID}</td>
          <td class="td">${HoTen}</td>
          <td class="td">${DiaChi}</td>
          <td class="td">${Email}</td>
          <td class="td">${HocVienToan}</td>
          <td class="td">${HocVienHoa}</td>
          <td class="td">${HocVienLy}</td>
          <td class="td">${item.diemTB()}</td>
          <td class="td">
  <button  data-id="${ID}" id="btnDelete" onclick="deletePerson('${ID}')" class ="btn btn-danger">Xóa</button>
  <button  data-id="${ID}" id="btnSua" onclick="getDetailPerson('${ID}')" class ="btn btn-warning">Sửa</button>
    </td>
        </tr>`;
  });
  document.querySelector(".btnAdd").style.display = "block";

  document.querySelector("#tbodyHocVien").innerHTML = content;
};

// Hàm giúp lưu trữ xuống localStorage
let saveDataStudentLocal = (key, value) => {
  let stringData = JSON.stringify(person.listPersons);
  localStorage.setItem(key, stringData);
};
// Hàm giúp lấy dữ liệu từ localStorage
let getDataStudentLoCal = (key) => {
  let stringDataStudent = localStorage.getItem("arrFiled");
  if (stringDataStudent) {
    person.listPersons = JSON.parse(stringDataStudent);
    renderStudent();
  }
};
getDataStudentLoCal("");

// Xóa một đối tượng từ danh sách
let deletePerson = (ID) => {
  let index = person.listPersons.findIndex((item) => {
    return item.ID === ID;
  });
  if (index !== -1) {
    person.deletePerson(index);
    saveDataStudentLocal();
    renderStudent();
  }
};
let getDetailPerson = (ID) => {
  let students = person.listPersons.find((item) => {
    return item.ID === ID;
  });
  if (students) {
    let arrFiled = document.querySelectorAll(".form-control");
    arrFiled.forEach((item) => {
      let { id } = item;
      item.value = students[id];
      $("#exampleModal").modal("show");
      document.getElementById("ID").readOnly = true;
    });
    // Hiển thị lại nút "Cập nhật" và ẩn nút 'Thêm"
    document.getElementById("btnCapNhat").style.display = "block";
    document.querySelector(".btnAdd").style.display = "none";
  }
};
// Lắng nghe sự kiện click trên nút "Sửa"

// Update student
let updatePerson = () => {
  let arrFiled = document.querySelectorAll(".form-control");
  let student = new Student(); // Tạo một đối tượng Student mới để lưu dữ liệu cập nhật
  arrFiled.forEach((item) => {
    let { id, value } = item;
    student[id] = value; // Gán giá trị từ form vào đối tượng student
  });
  let index = person.listPersons.findIndex((item) => {
    return item.ID === student.ID;
  });
  if (index !== -1) {
    person.listPersons[index] = student; // Ghi đè dữ liệu của phần tử tại chỉ mục đã cho bằng đối tượng student mới
    document.getElementById("formGroup").reset();
    renderStudent();
    saveDataStudentLocal();
    document.getElementById("ID").readOnly = false;
    // document.getElementById("btnAdd").style.display = "none";
    $("#exampleModal").modal("hide");
  }
  // let show = document.querySelector("#btnSua");
  // show.addEventListener("click", () => {
  //   document.getElementById("btnCapNhat").style.display = "block";
  // });
};
document.getElementById("btnCapNhat").onclick = updatePerson;

// ------ QUẢN LÝ CUSTOMER -----------

window.deletePerson = (ID) => {
  deletePerson(ID);
};

window.getDetailPerson = (ID) => {
  getDetailPerson(ID);
};
