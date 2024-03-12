import Person from "./persons.js";
import {
  checkIDFormat,
  checkNameFormat,
  checkEmailFormat,
  checkNumberFormat,
  checkEmptyValue,
  // removeVietnameseTones,
} from "./validation.js";

// Sử dụng hàm validateAndSubmit ở đây

// import checkEmptyValue from "./validation.js";
// Import thư viện Validator
// import validator from "./../node_modules/validator/validator.js";
document.querySelector(".btnHide").addEventListener("click", () => {
  document.getElementById("btnCapNhatNhanVien").style.display = "none";
  document.getElementById("btnThemNhanVien").style.display = "block";
});

class Employee extends Person {
  constructor(ID, HoTen, DiaChi, Email, NhanVienNgayLam, NhanVienLuong) {
    super(ID, HoTen, DiaChi, Email);
    this.NhanVienNgayLam = NhanVienNgayLam;
    this.NhanVienLuong = NhanVienLuong;
  }
  tinhLuong = function () {
    return this.NhanVienLuong * this.NhanVienNgayLam;
  };
}
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
      case "NhanVienNgayLam":
      case "NhanVienLuong":
        if (!checkEmptyValue(value, id) || !checkNumberFormat(value, id)) {
          isValid = false;
        }
        break;
    }
  });

  if (isValid) {
    addEmployee();
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

document.querySelector("#btnThemNhanVien").onclick = validateAndSubmit;

function addEmployee() {
  let arrFiled = document.querySelectorAll(".form-control");
  const employee = new Employee();
  arrFiled.forEach((item) => {
    let { id, value } = item;
    employee[id] = value;
  });

  if (checkDuplicateID(employee.ID, "ID")) {
    person.addPerson(employee);
    renderEmployees();
    saveDataEmployeeLocal();
    $("#exampleModal").modal("hide");
    document.getElementById("formGroup").reset();
  }
}

// Render
const renderEmployees = (arrFiled = person.listPersons) => {
  let content = "";
  arrFiled.forEach((item) => {
    let newEmployee = new Employee();
    newEmployee = { ...newEmployee, ...item };
    const { ID, HoTen, DiaChi, Email, NhanVienNgayLam, NhanVienLuong } =
      newEmployee;
    content += `
    <tr class="mb-4 pb-4 tr">

    <td class="td">${ID}</td>
    <td class="td">${HoTen}</td>
    <td class="td">${DiaChi}</td>
    <td class="td">${Email}</td>
    <td class="td">${NhanVienNgayLam}</td>
    <td class="td">${NhanVienLuong}</td>
    <td class="td">${item.tinhLuong()}</td>
    <td class="td">
    <button  id="btnDelete"  data-id="${ID}" class="btn btn-danger" onclick="deletePerson('${ID}')">Xóa</button>
    <button  id="btnSua"  data-id="${ID}" class="btn btn-warning" onclick="getDetailPerson('${ID}')">Sửa</button>
    </td>
    </tr>
   
    
    `;
  });

  document.querySelector("#tbodyNhanVien").innerHTML = content;
};
let saveDataEmployeeLocal = (key, value) => {
  let stringData = JSON.stringify(person.listPersons);
  localStorage.setItem(key, stringData);
};
// Hàm giúp lấy dữ liệu từ localStorage
let getDataEmployeeLoCal = (key) => {
  let stringDataEmployee = localStorage.getItem("arrFiled");
  if (stringDataEmployee) {
    person.listPersons = JSON.parse(stringDataEmployee);
    renderEmployees();
  }
};
getDataEmployeeLoCal("");

// Delete
let deletePerson = (ID) => {
  let index = person.listPersons.findIndex((item) => {
    return item.ID === ID;
  });
  if (index !== -1) {
    person.deletePerson(index);
    saveDataEmployeeLocal();
    renderEmployees();
  }
};
function handleEditButtonClick() {
  document.getElementById("btnThemNhanVien").style.display = "none";
  document.getElementById("btnCapNhatNhanVien").style.display = "block"; // Hoặc "inline" tùy thuộc vào CSS của bạn
}

// getDetailPerson
let getDetailPerson = (ID) => {
  let employee = person.listPersons.find((item) => {
    return item.ID === ID;
  });
  if (employee) {
    let arrFiled = document.querySelectorAll(".form-control");
    arrFiled.forEach((item) => {
      let { id } = item;
      item.value = employee[id];
      $("#exampleModal").modal("show");
      document.getElementById("ID").readOnly = true;
    });
  }
  // document.querySelector("#btnSua").addEventListener("click", () => {
  //   document.getElementById("btnThemNhanVien").style.display = "none";
  // });
  document
    .querySelector("#btnSua")
    .addEventListener("click", handleEditButtonClick);
  handleEditButtonClick();
};
// updatePerson
// updatePerson
let updatePerson = () => {
  // Ẩn nút cập nhật khi bắt đầu xử lý
  document.getElementById("btnCapNhatNhanVien").style.display = "block";

  // Thêm nút cập nhật khi bắt đầu xử lý
  document.getElementById("btnThemNhanVien").style.display = "none";
  let arrFiled = document.querySelectorAll(".form-control");
  let employee = new Employee();
  let isHoTenValid = true; // Biến để kiểm tra trường HoTen
  let isEmailValid = true; // Biến để kiểm tra trường Email
  let isNumberValid = true; // Biến để kiểm tra trường NhanVienNgayLam và NhanVienLuong
  arrFiled.forEach((item) => {
    let { id, value } = item;
    // Kiểm tra từng trường và gán giá trị cho employee
    switch (id) {
      case "ID":
        employee[id] = value;
        break;
      case "HoTen":
        if (!checkEmptyValue(value, id) || !checkNameFormat(value, id)) {
          isHoTenValid = false;
        }
        employee[id] = value;
        break;
      case "DiaChi":
        employee[id] = value;
        break;
      case "Email":
        if (!checkEmptyValue(value, id) || !checkEmailFormat(value, id)) {
          isEmailValid = false;
        }
        employee[id] = value;
        break;
      case "NhanVienNgayLam":
      case "NhanVienLuong":
        if (!checkEmptyValue(value, id) || !checkNumberFormat(value, id)) {
          isNumberValid = false;
        }
        employee[id] = value;
        break;
    }
  });

  if (isHoTenValid && isEmailValid && isNumberValid) {
    // Chỉ gọi updatePerson nếu tất cả các trường hợp lệ
    let index = person.listPersons.findIndex((item) => {
      return item.ID === employee.ID;
    });
    if (index !== -1) {
      person.listPersons[index] = employee;
      document.getElementById("formGroup").reset();
      renderEmployees();
      saveDataEmployeeLocal();
      $("#exampleModal").modal("hide");
      document.getElementById("ID").readOnly = false;
    }
  }
};

document.querySelector("#btnCapNhatNhanVien").onclick = updatePerson;
// validateAndSubmit

// Cập nhật phần của mã để thêm sự kiện input cho phần tử input
// Lấy tham chiếu đến phần tử input
const searchInput = document.getElementById("searchNhanVien");

// Thêm sự kiện onchange cho input
searchInput.addEventListener("input", function () {
  // Lấy giá trị nhập vào từ input
  const keyword = this.value.trim();

  // Gọi phương thức searchPerson và hiển thị kết quả
  const searchResults = person.searchPerson(keyword);
  renderEmployees(searchResults);
});

// Hàm renderEmployees cần phải nhận tham số là kết quả tìm kiếm để hiển thị kết quả mới

window.deletePerson = (ID) => {
  deletePerson(ID);
};
window.getDetailPerson = (ID) => {
  getDetailPerson(ID);
};
