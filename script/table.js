const createTable = (id, data) => {
  var table = document.createElement("table");

  // Thêm dữ liệu từ mảng vào bảng
  for (var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < data[i].length; j++) {
      var cell = document.createElement(i === 0 ? "th" : "td"); // Sử dụng th cho hàng đầu tiên (tiêu đề)
      cell.textContent = data[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Thêm bảng vào body của tài liệu
  document.querySelector(id).appendChild(table);
};


