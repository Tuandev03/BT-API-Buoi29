import Person from "../javascripts/persons.js";
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
