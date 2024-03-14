import Person from "../javascripts/persons.js";
import {
  checkIDFormat,
  checkNameFormat,
  checkEmailFormat,
  checkNumberFormat,
  checkEmptyValue,
  // removeVietnameseTones,
} from "./validation.js";
let person = new Person();

class Customer extends Person {
  constructor(
    ID,
    HoTen,
    DiaChi,
    Email,
    KhachHangCongTy,
    KhachHangTriGia,
    KhachHangDanhGia
  ) {
    super(ID, HoTen, DiaChi, Email);
    this.KhachHangCongTy = KhachHangCongTy;
    this.KhachHangTriGia = KhachHangTriGia;
    this.KhachHangDanhGia = KhachHangDanhGia;
  }
}
document.querySelector(".btnHide").addEventListener("click", () => {
  document.getElementById("btnCapNhatKhachHang").style.display = "none";
});
function validateAndSubmit() {
  let arrFiled = document.querySelectorAll(".form-control, textarea");
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
      case "KhachHangCongTy":
        if (!checkEmptyValue(value, id)) {
          isValid = false;
        }
        break;
      case "KhachHangTriGia":
        if (!checkEmptyValue(value, id) || !checkNumberFormat(value, id)) {
          isValid = false;
        }
        break;

      case "KhachHangDanhGia":
        if (!checkEmptyValue(value, id)) {
          isValid = false;
        }
        break;
    }
  });

  if (isValid) {
    addCustomer();
  }
}
document.querySelector("#btnThemKhachHang").onclick = validateAndSubmit;

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

function addCustomer() {
  let arrFiled = document.querySelectorAll(".form-control, textarea");
  const customer = new Customer();
  arrFiled.forEach((item) => {
    let { id, value } = item;
    customer[id] = value;
  });

  if (checkDuplicateID(customer.ID, "ID")) {
    person.addPerson(customer);
    renderCustomers();
    saveDataCustomerLocal();
    $("#exampleModal").modal("hide");
    document.getElementById("formGroup").reset();
  }
}
// render customers
const renderCustomers = (arrFiled = person.listPersons) => {
  let content = "";
  arrFiled.forEach((item) => {
    let newCustomer = new Customer();
    newCustomer = { ...newCustomer, ...item };
    const {
      ID,
      HoTen,
      DiaChi,
      Email,
      KhachHangCongTy,
      KhachHangTriGia,
      KhachHangDanhGia,
    } = newCustomer;
    content += `
    <tr class="mb-4 pb-4 tr">

    <td class="td">${ID}</td>
    <td class="td">${HoTen}</td>
    <td class="td">${DiaChi}</td>
    <td class="td">${Email}</td>
    <td class="td">${KhachHangCongTy}</td>
    <td class="td">${KhachHangTriGia}</td>
    <td class="td">${KhachHangDanhGia}</td>
    <td class="td">
    <button  id="btnDelete"  data-id="${ID}" class="btn btn-danger" onclick="deletePerson('${ID}')">Xóa</button>

    <button  id="btnSua"  data-id="${ID}" class="btn btn-warning" onclick="getDetailPerson('${ID}')">Sửa</button>
    </td>
    </tr>
    
    
    `;
  });
  document.querySelector("#tbodyKhachHang").innerHTML = content;
};

let saveDataCustomerLocal = (key, value) => {
  let stringData = JSON.stringify(person.listPersons);
  localStorage.setItem(key, stringData);
};
// Hàm giúp lấy dữ liệu từ localStorage
let getDataCustomerLoCal = (key) => {
  let stringDataCustomer = localStorage.getItem("arrFiled");
  if (stringDataCustomer) {
    person.listPersons = JSON.parse(stringDataCustomer);
    renderCustomers();
  }
};
getDataCustomerLoCal("");

let deletePerson = (ID) => {
  let index = person.listPersons.findIndex((item) => {
    return item.ID === ID;
  });
  if (index !== -1) {
    person.deletePerson(index);
    saveDataCustomerLocal();
    renderCustomers();
  }
};

let getDetailPerson = (ID) => {
  let customers = person.listPersons.find((item) => {
    return item.ID === ID;
  });
  if (customers) {
    let arrFiled = document.querySelectorAll(".form-control, textarea");
    arrFiled.forEach((item) => {
      let { id } = item;
      item.value = customers[id];
      $("#exampleModal").modal("show");
      document.getElementById("ID").readOnly = true;
    });
  }
  document.getElementById("btnCapNhatKhachHang").style.display = "block";
  document.getElementById("btnThemKhachHang").style.display = "none";
};

let updatePerson = () => {
  // Ẩn nút cập nhật khi bắt đầu xử lý

  // Thêm nút cập nhật khi bắt đầu xử lý
  let arrFiled = document.querySelectorAll(".form-control, textarea");
  let customer = new Customer();
  let isHoTenValid = true; // Biến để kiểm tra trường HoTen
  let isEmailValid = true; // Biến để kiểm tra trường Email
  let isNumberValid = true; // Biến để kiểm tra trường NhanVienNgayLam và NhanVienLuong
  arrFiled.forEach((item) => {
    let { id, value } = item;
    // Kiểm tra từng trường và gán giá trị cho customer
    switch (id) {
      case "ID":
        customer[id] = value;
        break;
      case "HoTen":
        if (!checkEmptyValue(value, id) || !checkNameFormat(value, id)) {
          isHoTenValid = false;
        }
        customer[id] = value;
        break;
      case "DiaChi":
        if (!checkEmptyValue(value, id)) {
          isEmailValid = false;
        }
        customer[id] = value;
        break;

      case "Email":
        if (!checkEmptyValue(value, id) || !checkEmailFormat(value, id)) {
          isEmailValid = false;
        }
        customer[id] = value;
        break;
      case "KhachHangCongTy":
        if (!checkEmptyValue(value, id)) {
          isEmailValid = false;
        }
        customer[id] = value;
        break;

      case "KhachHangTriGia":
        if (!checkEmptyValue(value, id) || !checkNumberFormat(value, id)) {
          isNumberValid = false;
        }
        customer[id] = value;
        break;
      case "KhachHangDanhGia":
        if (!checkEmptyValue(value, id)) {
          isEmailValid = false;
        }
        customer[id] = value;
        break;
    }
  });

  if (isHoTenValid && isEmailValid && isNumberValid) {
    // Chỉ gọi updatePerson nếu tất cả các trường hợp lệ
    let index = person.listPersons.findIndex((item) => {
      return item.ID === customer.ID;
    });
    if (index !== -1) {
      person.listPersons[index] = customer;
      document.getElementById("formGroup").reset();
      renderCustomers();
      saveDataCustomerLocal();
      $("#exampleModal").modal("hide");
      document.getElementById("ID").readOnly = false;
    }
  }
};

document.getElementById("btnCapNhatKhachHang").onclick = updatePerson;

const searchInput = document.getElementById("searchKhachHang");

// Thêm sự kiện onchange cho input
searchInput.addEventListener("input", function () {
  // Lấy giá trị nhập vào từ input
  const keyword = this.value.trim();

  // Gọi phương thức searchPerson và hiển thị kết quả
  const searchResults = person.searchPerson(keyword);
  renderCustomers(searchResults);
});


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
  // renderEmployees(sortedEmployees);
  renderCustomers(sortedEmployees);
}

window.deletePerson = (ID) => {
  deletePerson(ID);
};
window.getDetailPerson = (ID) => {
  getDetailPerson(ID);
};
document.querySelector(".btnHide").addEventListener("click", () => {
  document.getElementById("ID").readOnly = false;
  document.querySelector(".btnAdd").style.display = "block";
  document.getElementById("formGroup").reset();
});
