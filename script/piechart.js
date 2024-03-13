  // Dữ liệu
  var data = {
    CLEAR: 147564,
    RAIN: 28391,
    CLOUDY: 31450,
    "#empty": 5350,
    "SLEET HAIL": 396,
    SNOW: 1748,
    FOG: 450,
    "SMOG SMOKE": 25,
    "SEVERE CROSSWIND": 28,
    "BLOWING SNOW": 82,
    "BLOWING SAND/SOIL/DIRT": 1,
    "OTHER (NARRATIVE)": 119,
    UNKNOWN: 2023,
  };

const createPieChart = (id, data) => {

  // Tính tổng của tất cả các giá trị
  var total = Object.values(data).reduce((acc, curr) => acc + curr, 0);

  // Tính phần trăm cho mỗi loại dữ liệu
  var percentages = {};
  Object.keys(data).forEach((key) => {
    percentages[key] = (data[key] / total) * 100;
  });

  // Định dạng dữ liệu để hiển thị trên tooltip
  var formattedData = Object.keys(data).map((key) => ({
    label: key,
    value: data[key],
    percentage: percentages[key].toFixed(2) + "%",
  }));

  // Kích thước và margin
  var width = 500,
    height = 300,
    radius = 150;
  var colors = [
    "#ff7f0e", // orange
    "#1f77b4", // blue
    "#2ca02c", // green
    "#d62728", // red
    "#9467bd", // purple
    "#8c564b", // brown
    "#98df8a", // pink
    "#7f7f7f", // gray
    "#bcbd22", // olive
    "#17becf", // cyan
    "#aec7e8", // light blue
    "#ffbb78", // light orange
    "#e377c2", // light green
    "#ff9896", // light red
    "#c5b0d5", // light purple
    "#c49c94", // light brown
    "#f7b6d2", // light pink
    "#c7c7c7", // light gray
    "#dbdb8d", // light olive
    "#9edae5", // light cyan
  ];
  // var color = d3.scaleOrdinal(d3.schemeCategory10);
  var color = d3.scaleOrdinal().domain(data).range(colors);

  var svg = d3
    .select(".chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    });

  var g = svg
    .selectAll(".arc")
    .data(pie(Object.entries(data).map(([key, value]) => ({ key, value }))))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
      return color(d.data.key);
    })
    .on("mouseover", function (d) {
      console.log(d);
      var selectedData = formattedData.find(
        (item) => item.label === d.data.key
      );
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          selectedData.label +
            ": " +
            selectedData.value +
            " - " +
            selectedData.percentage
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  //////////////////////////////////////////
};
