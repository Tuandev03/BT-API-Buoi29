// Lấy danh sách tất cả các phần tử có class 'header-list-item'
const headerItems = document.querySelectorAll(".header-item");
console.log(headerItems);
// Thêm sự kiện click cho mỗi phần tử
headerItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Loại bỏ class 'header-active' khỏi tất cả các phần tử
    headerItems.forEach((element) => {
      element.classList.remove("header-active");
    });
    // Thêm class 'header-active' cho phần tử được click
    item.classList.add("header-active");
  });
});
