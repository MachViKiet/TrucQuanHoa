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

console.log(groupedData);

const createBarChar = (id, dataMap) => {
  // Chiều rộng và chiều cao của biểu đồ
  var width = 500;
  var height = 400;

  // Tạo SVG container cho biểu đồ
  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Chuyển đổi dữ liệu từ map sang array
  var data = Array.from(dataMap.entries());
  data = data.map((d) => {
    console.log([d[0], Math.log(d[1])]);
    return [d[0], Math.round(Math.log(d[1]))];
  });
  // Tạo scale cho trục x và trục y
  var xScale = d3
    .scaleBand()
    .domain(data.map((d) => d[0]))
    .range([0, width])
    .padding(0.1);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1] * 1.1)])
    .range([height, 0]);

  // Vẽ các cột
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d[0]))
    .attr("width", xScale.bandwidth())
    .attr("y", (d) => yScale(d[1]))
    .attr("height", (d) => height - yScale(d[1]))
    .style("fill", "#ccc");

  // Thêm các nhãn
  svg
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => xScale(d[0]) + xScale.bandwidth() / 2)
    .attr("y", (d) => yScale(d[1]) - 5)
    .attr("text-anchor", "middle")
    .text((d) => d[1])
    .style("fill", "#ccc");

  // Tạo trục x và trục y
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));
};

createBarChar("#chart-container", groupedData);
