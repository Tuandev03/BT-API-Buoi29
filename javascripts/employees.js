import Person from "./persons.js";
class Employee extends Person {
  constructor(ID, HoTen, DiaChi, Email, NhanVienNgayLam, NhanVienLuong) {
    super(ID, HoTen, DiaChi, Email);
    this.NhanVienNgayLam = NhanVienNgayLam;
    this.NhanVienLuong = NhanVienLuong;
  }
}
