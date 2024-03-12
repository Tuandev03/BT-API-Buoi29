import Person from "../javascripts/persons.js";
import {
  checkIDFormat,
  checkNameFormat,
  checkEmailFormat,
  checkNumberFormat,
  checkEmptyValue,
  // removeVietnameseTones,
} from "./validation.js";
export default class Student extends Person {
  constructor(ID, HoTen, DiaChi, Email, HocVienToan, HocVienHoa, HocVienLy) {
    super(ID, HoTen, DiaChi, Email);
    this.HocVienToan = HocVienToan;
    this.HocVienHoa = HocVienHoa;
    this.HocVienLy = HocVienLy;
    // phương thức
  }
  diemTB = function () {
    let diemToan = parseFloat(this.HocVienToan);
    let diemHoa = parseFloat(this.HocVienHoa);
    let diemLy = parseFloat(this.HocVienLy);

    if (isNaN(diemToan) || isNaN(diemHoa) || isNaN(diemLy)) {
      return "Không thể tính";
    }

    return parseFloat(((diemToan + diemHoa + diemLy) / 3).toFixed(1));
  };
}
let hide = document.querySelector(".btnHide");
hide.addEventListener("click", () => {
  document.getElementById("btnCapNhat").style.display = "none";
});
let person = new Person();
function validateAndSubmit() {
  let arrFiled = document.querySelectorAll(".form-control");
  let isValid = true;

  arrFiled.forEach((item) => {
    let { id, value } = item;
    switch (id) {
      case "ID":
        if (!checkEmptyValue(value, id) || !checkIDFormat(value, id)) {
          isValid = false;
        }
        break;
      case "HoTen":
        if (!checkEmptyValue(value, id) || !checkNameFormat(value, id)) {
          isValid = false;
        }
        break;
      case "DiaChi":
        if (!checkEmptyValue(value, id)) {
          isValid = false;
        }
        break;
      case "Email":
        if (!checkEmptyValue(value, id) || !checkEmailFormat(value, id)) {
          isValid = false;
        }
        break;
      case "HocVienToan":
      case "HocVienHoa":
      case "HocVienLy":
        if (!checkEmptyValue(value, id) || !checkNumberFormat(value, id)) {
          isValid = false;
        }
        break;
    }
  });

  if (isValid) {
    addStudent();
  }
}
function checkDuplicateID(value, id) {
  if (person.listPersons.some((employee) => employee.ID === value)) {
    document.getElementById(`invalid${id}`).innerHTML =
      "ID đã tồn tại trong danh sách. Vui lòng nhập ID khác.";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    return true;
  }
}

function addStudent() {
  let arrFiled = document.querySelectorAll(".form-control");
  const student = new Student();
  arrFiled.forEach((item) => {
    let { id, value } = item;
    student[id] = value;
  });
  if (checkDuplicateID(student.ID, "ID")) {
    person.addPerson(student);
    renderStudent();
    saveDataStudentLocal();
    $("#exampleModal").modal("hide");
    document.getElementById("formGroup").reset();
  }
}
document.getElementById("btnThemHocVien").onclick = validateAndSubmit;

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

const searchInput = document.getElementById("searchHocVien");

// Thêm sự kiện onchange cho input
searchInput.addEventListener("input", function () {
  // Lấy giá trị nhập vào từ input
  const keyword = this.value.trim();

  // Gọi phương thức searchPerson và hiển thị kết quả
  const searchResults = person.searchPerson(keyword);
  renderStudent(searchResults)
});

window.deletePerson = (ID) => {
  deletePerson(ID);
};

window.getDetailPerson = (ID) => {
  getDetailPerson(ID);
};
