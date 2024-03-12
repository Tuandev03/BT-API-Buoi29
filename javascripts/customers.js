import Person from "../javascripts/persons.js";

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

document.querySelector(".btnAdd").onclick = () => {
  let arrFiled = document.querySelectorAll(".form-control, textarea");
  const customers = new Customer();
  arrFiled.forEach((item) => {
    let { id, value } = item;
    customers[id] = value;
  });
  person.addPerson(customers);
  renderCustomers();
  $("#exampleModal").modal("hide");
  document.querySelector("#formGroup").reset();
  saveDataCustomerLocal();
};
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
};

let updatePerson = () => {
  let arrFiled = document.querySelectorAll(".form-control, textarea");
  let customer = new Customer();
  arrFiled.forEach((item) => {
    let { id, value } = item;
    customer[id] = value;
  });
  let index = person.listPersons.findIndex((item) => {
    return item.ID === customer.ID;
  });
  if (index !== -1) {
    person.listPersons[index] = customer; // Ghi đè dữ liệu của phần tử tại chỉ mục đã cho bằng đối tượng student mới
    document.getElementById("formGroup").reset();
    renderCustomers();
    saveDataCustomerLocal();
    $("#exampleModal").modal("hide");

    document.getElementById("ID").readOnly = false;
  }
};
document.getElementById("btnCapNhatKhachHang").onclick = updatePerson;
window.deletePerson = (ID) => {
  deletePerson(ID);
};
window.getDetailPerson = (ID) => {
  getDetailPerson(ID);
};
