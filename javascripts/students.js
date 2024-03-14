import Person from "../javascripts/persons.js";
import {
  checkIDFormat,
  checkNameFormat,
  checkEmailFormat,
  checkNumberFormat,
  checkEmptyValue,
  checkNumberFloat,
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
        if (!checkEmptyValue(value, id) || !checkNumberFloat(value, id)) {
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

const searchInput = document.getElementById("searchHocVien");
// Thêm sự kiện onchange cho input
searchInput.addEventListener("input", function () {
  // Lấy giá trị nhập vào từ input
  const keyword = this.value.trim();

  // Gọi phương thức searchPerson và hiển thị kết quả
  const searchResults = person.searchPerson(keyword);
  renderStudent(searchResults);
});

window.deletePerson = (ID) => {
  deletePerson(ID);
};

window.getDetailPerson = (ID) => {
  getDetailPerson(ID);
};

let updatePerson = () => {
  // Ẩn nút cập nhật khi bắt đầu xử lý

  let arrFiled = document.querySelectorAll(".form-control");
  let student = new Student();
  let isHoTenValid = true; // Biến để kiểm tra trường HoTen
  let isEmailValid = true; // Biến để kiểm tra trường Email
  let isNumberValid = true; // Biến để kiểm tra trường NhanVienNgayLam và NhanVienLuong
  arrFiled.forEach((item) => {
    let { id, value } = item;
    // Kiểm tra từng trường và gán giá trị cho student
    switch (id) {
      case "ID":
        student[id] = value;
        break;
      case "HoTen":
        if (!checkEmptyValue(value, id) || !checkNameFormat(value, id)) {
          isHoTenValid = false;
        }
        student[id] = value;
        break;
      case "DiaChi":
        student[id] = value;
        break;
      case "Email":
        if (!checkEmptyValue(value, id) || !checkEmailFormat(value, id)) {
          isEmailValid = false;
        }
        student[id] = value;
        break;
      case "HocVienToan":
      case "HocVienHoa":
      case "HocVienLy":
        if (!checkEmptyValue(value, id) || !checkNumberFloat(value, id)) {
          isNumberValid = false;
        }
        student[id] = value;
        break;
    }
  });

  if (isHoTenValid && isEmailValid && isNumberValid) {
    // Chỉ gọi updatePerson nếu tất cả các trường hợp lệ
    let index = person.listPersons.findIndex((item) => {
      return item.ID === student.ID;
    });
    if (index !== -1) {
      person.listPersons[index] = student;
      document.getElementById("formGroup").reset();
      renderStudent();
      saveDataStudentLocal();
      $("#exampleModal").modal("hide");
      document.getElementById("ID").readOnly = false;
    }
  }
};
document.getElementById("btnCapNhat").onclick = updatePerson;

// Đợi cho DOM được tải xong trước khi thêm sự kiện
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến phần tử select
  const selectElement = document.querySelector(".custom-select");

  // Thêm sự kiện "change" cho phần tử select
  selectElement.addEventListener("change", handleSortOptionChange);
});

// Xử lý sự kiện khi người dùng thay đổi tùy chọn sắp xếp
function handleSortOptionChange(event) {
  // Lấy giá trị của tùy chọn được chọn
  const selectedOption = event.target.value;

  // Sắp xếp và hiển thị lại danh sách nhân viên
  sortAndRenderEmployees(selectedOption);
}

// Sắp xếp và hiển thị lại danh sách nhân viên dựa trên tùy chọn
function sortAndRenderEmployees(option) {
  // Lấy danh sách nhân viên từ person.listPersons
  let sortedEmployees = [...person.listPersons];

  // Sắp xếp theo tùy chọn
  if (option === "A->Z") {
    sortedEmployees.sort((a, b) => a.HoTen.localeCompare(b.HoTen));
  } else if (option === "Z->A") {
    sortedEmployees.sort((a, b) => b.HoTen.localeCompare(a.HoTen));
  }

  // Hiển thị danh sách nhân viên sau khi đã sắp xếp
  renderStudent(sortedEmployees);
}

// Xử lý hành động khi người dùng nhấn vào sửa nhưng bỏ ý định sửa khi click ra window, nhưng hàm add ch đc reset value trong input, dưới đây là cách xử lý
document.querySelector(".btnHide").addEventListener("click", () => {
  document.getElementById("ID").readOnly = false;
  document.querySelector(".btnAdddd").style.display = "block";
  document.getElementById("formGroup").reset();
});
