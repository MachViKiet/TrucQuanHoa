// var data = [
//     { year: 2015, ANTIOCH: 2840, 'ASHLAND CITY': 2, BELLEVUE: 0, BRENTWOOD: 602, FAIRVIEW: 0, GOODLETTSVILLE: 202, HENDERSONVILLE: 0, HERMITAGE: 1063, JOELTON: 209, LAKEWOOD: 1, LAVERGNE: 2, MADISON: 2119, 'MOUNT JULIET': 4, NASHVILLE: 24653, NOLENSVILLE: 16, 'OLD HICKORY': 291, PEGRAM: 1, 'SPRING HILL': 1, 'WHITES CREEK': 283 },
//     { year: 2016, ANTIOCH: 3281, 'ASHLAND CITY': 9, BELLEVUE: 0, BRENTWOOD: 681, FAIRVIEW: 0, GOODLETTSVILLE: 186, HENDERSONVILLE: 1, HERMITAGE: 1225, JOELTON: 215, LAKEWOOD: 1, LAVERGNE: 1, MADISON: 2279, 'MOUNT JULIET': 3, NASHVILLE: 25873, NOLENSVILLE: 29, 'OLD HICKORY': 336, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 312 },
//     { year: 2017, ANTIOCH: 3160, 'ASHLAND CITY': 8, BELLEVUE: 0, BRENTWOOD: 627, FAIRVIEW: 0, GOODLETTSVILLE: 182, HENDERSONVILLE: 0, HERMITAGE: 1170, JOELTON: 241, LAKEWOOD: 1, LAVERGNE: 0, MADISON: 2126, 'MOUNT JULIET': 2, NASHVILLE: 26012, NOLENSVILLE: 32, 'OLD HICKORY': 337, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 377 },
//     { year: 2018, ANTIOCH: 3077, 'ASHLAND CITY': 3, BELLEVUE: 0, BRENTWOOD: 580, FAIRVIEW: 0, GOODLETTSVILLE: 197, HENDERSONVILLE: 0, HERMITAGE: 1240, JOELTON: 256, LAKEWOOD: 0, LAVERGNE: 0, MADISON: 2173, 'MOUNT JULIET': 5, NASHVILLE: 26267, NOLENSVILLE: 25, 'OLD HICKORY': 290, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 357 },
//     { year: 2019, ANTIOCH: 3505, 'ASHLAND CITY': 7, BELLEVUE: 0, BRENTWOOD: 498, FAIRVIEW: 0, GOODLETTSVILLE: 170, HENDERSONVILLE: 0, HERMITAGE: 1077, JOELTON: 218, LAKEWOOD: 0, LAVERGNE: 0, MADISON: 2172, 'MOUNT JULIET': 4, NASHVILLE: 26223, NOLENSVILLE: 32, 'OLD HICKORY': 280, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 408 },
//     { year: 2020, ANTIOCH: 2267, 'ASHLAND CITY': 6, BELLEVUE: 0, BRENTWOOD: 258, FAIRVIEW: 1, GOODLETTSVILLE: 119, HENDERSONVILLE: 0, HERMITAGE: 786, JOELTON: 136, LAKEWOOD: 0, LAVERGNE: 0, MADISON: 1503, 'MOUNT JULIET': 3, NASHVILLE: 15414, NOLENSVILLE: 17, 'OLD HICKORY': 237, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 278 },
//     { year: 2021, ANTIOCH: 2265, 'ASHLAND CITY': 6, BELLEVUE: 1, BRENTWOOD: 266, FAIRVIEW: 0, GOODLETTSVILLE: 111, HENDERSONVILLE: 0, HERMITAGE: 609, JOELTON: 158, LAKEWOOD: 0, LAVERGNE: 0, MADISON: 1342, 'MOUNT JULIET': 6, NASHVILLE: 13564, NOLENSVILLE: 16, 'OLD HICKORY': 181, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 251 },
//     { year: 2022, ANTIOCH: 864, 'ASHLAND CITY': 0, BELLEVUE: 0, BRENTWOOD: 121, FAIRVIEW: 0, GOODLETTSVILLE: 47, HENDERSONVILLE: 0, HERMITAGE: 279, JOELTON: 78, LAKEWOOD: 0, LAVERGNE: 0, MADISON: 503, 'MOUNT JULIET': 2, NASHVILLE: 5681, NOLENSVILLE: 12, 'OLD HICKORY': 77, PEGRAM: 0, 'SPRING HILL': 0, 'WHITES CREEK': 102 }
// ];

var data = [
  { year: 2015, ANTIOCH: 2840, MADISON: 2119, NASHVILLE: 24653 },
  { year: 2016, ANTIOCH: 3281, MADISON: 2279, NASHVILLE: 25873 },
  { year: 2017, ANTIOCH: 3160, MADISON: 2126, NASHVILLE: 26012 },
  { year: 2018, ANTIOCH: 3077, MADISON: 2173, NASHVILLE: 26267 },
  { year: 2019, ANTIOCH: 3505, MADISON: 2172, NASHVILLE: 26223 },
  { year: 2020, ANTIOCH: 2267, MADISON: 1503, NASHVILLE: 15414 },
  { year: 2021, ANTIOCH: 2265, MADISON: 1342, NASHVILLE: 13564 },
  { year: 2022, ANTIOCH: 864, MADISON: 503, NASHVILLE: 5681 },
];

const createLineChart = (id, data, title, x_name, y_name ) => {
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

  var margin = { top: 50, right: 50, bottom: 50, left: 70 },
    width = 650 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 20)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.year;
      })
    )
    .range([0, width])
    .padding(0.1);

  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d3.max(Object.values(d).slice(1));
      }),
    ])
    .nice()
    .range([height, 0]);

  var line = (city) =>
    d3
      .line()
      .x(function (d) {
        return x(d.year) + x.bandwidth() / 2;
      })
      .y(function (d) {
        return y(d[city]);
      });

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

  var cities = Object.keys(data[0]).slice(1);
  console.log(cities);

  cities.forEach(function (city, index) {
    svg
      .append("path")
      .datum(data)
      .attr("class", "line " + city.replace(/ /g, "-").toLowerCase())
      .attr("d", line(city))
      .style("stroke", colors[index]);
  });

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 80)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(y_name);

  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top) + ")"
    )
    .style("text-anchor", "middle")
    .text(x_name);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2 + 5)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text(title);
};
