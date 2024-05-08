// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const form = document.getElementById("standard-select");
form.addEventListener("change", (d) => {
  updatePieC1(d.target.value);
});
var data = [];

async function updateData(precint) {
  data = await d3.dsv(",", "./data/Traffic_Accidents.csv", (d) => {
    return {
      "Collision Type": d["Collision Type Description"],
      Precint: d["Precinct"],
    };
  });
  if (precint != "All") {
    data = d3.group(data, (d) => d["Precint"]).get(precint);
  }
  const groupedData = d3.rollup(
    data,
    (D) => D.length,
    (d) => d["Collision Type"]
  );
  return groupedData;
}

async function updatePieC1(precint) {
  var groupedData = await updateData(precint);
  var total = d3.sum(groupedData.values());
  var percentages = d3.map(groupedData, ([k, v]) => {
    return { key: k, value: ((v / total) * 100).toFixed(2) };
  });

  // Định dạng dữ liệu để hiển thị trên tooltip
  var formattedData = Array.from(groupedData, ([name, value]) => ({
    name,
    value,
  })).map((key) => {
    return {
      label: key.name,
      value: key.value,
    };
  });
  var width = 900,
    height = 350,
    radius = 150;

  var color = d3.scaleOrdinal().domain(percentages.keys()).range(d3.schemeSet3);

  var svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 5 + "," + height / 2 + ")")
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

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var g = svg
    .selectAll(".arc")
    // .data(pie(Object.entries(percentages).map(([key, value]) => ({ key, value }))))
    .data(pie(percentages))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    // .transition()
    .attr("d", arc)
    .style("fill", function (d) {
      return color(d.data.key);
    });

  g.on("mouseover", function (i, d) {
    var selectedData = formattedData.find((item) => item.label === d.data.key);
    tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip
      .html(selectedData.label + "- " + selectedData.value)
      .style("left", i.x + "px")
      .style("top", i.y - 28 + "px");
  }).on("mouseout", function (d) {
    tooltip.transition().duration(500).style("opacity", 0);
  });

  var legend = d3.select("svg");
  var legendX = 400;
  //remove old legend (if any)
  legend.selectAll("circle").remove();
  legend.selectAll("text").remove();

  // Add one dot in the legend for each name.
  legend
    .selectAll("mydots")
    .data(percentages)
    .enter()
    .append("circle")
    .transition()
    .attr("cx", legendX)
    .attr("cy", function (d, i) {
      return 70 + i * 20;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function (d) {
      return color(d.key);
    });

  // Add one dot in the legend for each name.
  legend
    .selectAll("mylabels")
    .data(percentages)
    .enter()
    .append("text")
    .attr("x", legendX + 20)
    .attr("y", function (d, i) {
      return 70 + i * 20;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", "black")
    .text(function (d) {
      return d.key + " - " + d.value + "%";
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");
}

updatePieC1("All");
