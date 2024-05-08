import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
var data = await d3.dsv(",", "./data/Traffic_Accidents.csv", (d) => {
  return {
    "Property Damage": d["Property Damage"],
    "Collision Type": d["Collision Type Description"],
  };
});

data = d3.group(data, (d) => d["Property Damage"]).get("TRUE");

const groupedData = d3.rollup(
  data,
  (D) => D.length,
  (d) => d["Collision Type"]
);

const createBarChar = (id, dataMap) => {
  var colors = [
    "#1f77b4", // blue
    "#ff7f0e", // orange
    "#2ca02c", // green
    "#d62728", // red
    "#9467bd", // purple
    "#8c564b", // brown
    "#e377c2", // pink
    "#7f7f7f", // gray
    "#bcbd22", // olive
    "#17becf", // cyan
    "#aec7e8", // light blue
    "#ffbb78", // light orange
    "#98df8a", // light green
    "#ff9896", // light red
    "#c5b0d5", // light purple
    "#c49c94", // light brown
    "#f7b6d2", // light pink
    "#c7c7c7", // light gray
    "#dbdb8d", // light olive
    "#9edae5", // light cyan
  ];

  var chartData = [];
  var data = Array.from(dataMap.entries());
  for (var i = 0; i < data.length; i++) {
    console.log({ Type: data[i][0].toUpperCase(), Value: data[i][1] });
    chartData.push({
      Type: data[i][0],
      Value: Math.round(Math.log(data[i][1])),
    });
  }
  // chartData = d3.sort(chartData, (a, b) => d3.descending(a.Value, b.Value));

  console.log("chartData ", chartData);

  const margin = { top: 20, right: 30, bottom: 50, left: 350 };
  const width = 900 - margin.left - margin.right;
  const height = 470 - margin.top - margin.bottom;

  const x = d3
    .scaleLinear()
    .range([0, width])
    .domain([0, d3.max(chartData, (d) => d.Value)]);

  const y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1)
    .domain(chartData.map((d) => d.Type));

  var chartContainer = d3
    .select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // const color = d3.scaleOrdinal(d3.schemeTableau10).domain(subgroups);

  // Vẽ trục x và y
  chartContainer
    .append("g")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr("transform", `translate(0, ${height})`)
    .style("font-size", "14px");

  chartContainer.append("g").call(d3.axisLeft(y)).style("font-size", "14px");

  // Thêm nhãn cho trục X
  chartContainer
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.bottom / 2})`)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .attr("dy", "1.5em")
    .text('Damage');

  // // Thêm nhãn cho trục Y
  chartContainer
    .append("text")
    .attr(
      "transform",
      `translate(0, ${height / 2 - margin.bottom - margin.top}) rotate(-90)`
    )
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .attr("dy", "-24em")
    .attr("dx", "-10em")
    .text("Collision Types");

  // Vẽ các cột
  chartContainer
    .append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(chartData)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.Type))
    .attr("width", (d) => {
      return x(d.Value) - x(0)
    })
    .attr("fill", (d,index) => colors[index])
    .attr("height", y.bandwidth());

  // In các giá trị
  chartContainer
    .append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .selectAll()
    .data(chartData)
    .join("text")
    .attr("x", (d) => x(d.Value - 100))
    .attr("y", (d) => y(d.Type) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text((d) => d.Value / 1000)
    .call((text) =>
      text
        .filter((d) => x(d.Value) - x(0) < 30) // short bars
        .attr("dx", +4)
        .attr("fill", "black")
        .attr("text-anchor", "start")
    );

  // Chiều rộng và chiều cao của biểu đồ
  // var width = 500;
  // var height = 400;

  // // Tạo SVG container cho biểu đồ
  // var svg = d3
  //   .select(id)
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height);

  // // Chuyển đổi dữ liệu từ map sang array
  // var data = Array.from(dataMap.entries());
  // data = data.map((d) => {
  //   console.log([d[0], Math.log(d[1])]);
  //   return [d[0], Math.round(Math.log(d[1]))];
  // });
  // // Tạo scale cho trục x và trục y
  // var yScale = d3
  //   .scaleBand()
  //   .domain(data.map((d) => d[0]))
  //   .range([0, width])
  //   .padding(0.1);

  // var xScale = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(data, (d) => d[1] * 1.1)])
  //   .range([height, 0]);

  // // Vẽ các cột
  // svg
  //   .selectAll(".bar")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("class", "bar")
  //   .attr("x", (d) => yScale(d[0]))
  //   .attr("width", yScale.bandwidth())
  //   .attr("y", (d) => xScale(d[1]))
  //   .attr("height", (d) => height - xScale(d[1]))
  //   .style("fill", "#ccc");

  // // Thêm các nhãn
  // svg
  //   .selectAll(".label")
  //   .data(data)
  //   .enter()
  //   .append("text")
  //   .attr("class", "label")
  //   .attr("x", (d) => yScale(d[0]) + yScale.bandwidth() / 2)
  //   .attr("y", (d) => xScale(d[1]) - 5)
  //   .attr("text-anchor", "middle")
  //   .text((d) => d[1])
  //   .style("fill", "#ccc");

  // // Tạo trục x và trục y
  // svg
  //   .append("g")
  //   .attr("class", "x-axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(d3.axisBottom(yScale));

  // svg.append("g").attr("class", "y-axis").call(d3.axisLeft(xScale));
};

createBarChar("#chart-container", groupedData);
