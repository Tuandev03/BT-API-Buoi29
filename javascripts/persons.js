export default class Person {
  listPersons = [];
  constructor(ID, HoTen, DiaChi, Email) {
    this.ID = ID;
    this.HoTen = HoTen;
    this.DiaChi = DiaChi;
    this.Email = Email;
  }
  addPerson = function (person) {
    this.listPersons.push(person);
  };

  deletePerson = function (index) {
    this.listPersons.splice(index, 1);
  };
  updatePerson = function (person, index) {};
}
