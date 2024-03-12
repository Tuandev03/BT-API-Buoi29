// Hàm kiểm tra giá trị bỏ trống
import Person from "./persons.js";
let person = new Person();

export function checkDuplicateID(value, id) {
  if (person.listPersons.some((employee) => employee.ID === value)) {
    document.getElementById(`invalid${id}`).innerHTML =
      "ID đã tồn tại trong danh sách. Vui lòng nhập ID khác.";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    return true;
  }
}

export function checkEmptyValue(value, id) {
  if (value.trim() === "") {
    document.getElementById(`invalid${id}`).innerHTML =
      "Vui lòng không bỏ trống trường này";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    document.getElementById(`invalid${id}`).innerHTML = "";
    document
      .getElementById(`invalid${id}`)
      .classList.remove("invalid-feedback");
    return true;
  }
}

// Hàm kiểm tra ID chỉ được nhập từ 4 đến 6 ký tự là số
export function checkIDFormat(value, id) {
  const idRegex = /^\d{4,6}$/;
  if (!idRegex.test(value)) {
    document.getElementById(`invalid${id}`).innerHTML =
      "ID chỉ được nhập từ 4 đến 6 ký tự là số";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    document.getElementById(`invalid${id}`).innerHTML = "";
    document
      .getElementById(`invalid${id}`)
      .classList.remove("invalid-feedback");
    return true;
  }
}

// Hàm kiểm tra họ tên chỉ được nhập chữ cái
export function checkNameFormat(value, id) {
  const nameRegex =
    /^[a-zA-Z\s\-ẽẼễỄểỂíÍìÌỉỈĩĨóÓòÒỏỎõÕọỌốỐồỒổỔỗỖộỘớỚờỜởỞỡỠợỢủỦứỨừỪửỬỹỸỷỶỵỴýÝáÁắẮấẤàÀảẢạẠãÃạạậặậẫẪăĂắẮấẤằẰẩẨặẶẵẴậẬâÂầẦấẤẩẨậẬãÃẫẪẵẴáÁạẠ]/;

  if (!nameRegex.test(value)) {
    document.getElementById(`invalid${id}`).innerHTML =
      "Họ tên chỉ được nhập chữ cái và không bỏ dấu";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    document.getElementById(`invalid${id}`).innerHTML = "";
    document
      .getElementById(`invalid${id}`)
      .classList.remove("invalid-feedback");
    return true;
  }
}

// Hàm kiểm tra định dạng email
export function checkEmailFormat(value, id) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    document.getElementById(`invalid${id}`).innerHTML = "Email không hợp lệ";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    document.getElementById(`invalid${id}`).innerHTML = "";
    document
      .getElementById(`invalid${id}`)
      .classList.remove("invalid-feedback");
    return true;
  }
}

// Hàm kiểm tra lương theo ngày và số ngày làm chỉ được nhập là số
export function checkNumberFormat(value, id) {
  const numberRegex = /^[0-9]+$/;
  if (!numberRegex.test(value)) {
    document.getElementById(`invalid${id}`).innerHTML = "Vui lòng chỉ nhập số";
    document.getElementById(`invalid${id}`).classList.add("invalid-feedback");
    return false;
  } else {
    document.getElementById(`invalid${id}`).innerHTML = "";
    document
      .getElementById(`invalid${id}`)
      .classList.remove("invalid-feedback");
    return true;
  }
}
// Bỏ dấu trong chữ cái
export  function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
