/*
    Q5: So sánh số vụ Hit and Run giữa các loại va chạm 
*/

d3.csv("/data/Traffic_Accidents.csv")
    // Xử lý dữ liệu
    .then(function(data) {

        // Lọc dữ liệu trống trong 'Collision Type Description'
        var filteredData = data.filter(function(d) {
            return d["Collision Type Description"] !== "";
        });

        // Lấy dữ liệu độc nhất của 'Collision Type Description'
        const collision = d3.rollup(filteredData, v => v.length, d => d["Collision Type Description"]);
        const uniqueValues = Array.from(collision.keys());

        // Tạo dữ liệu để vẽ biểu đồ
        var chartData = [];
        const groupData = d3.group(data, (d) => d["Collision Type Description"], (d) => d["Hit and Run"]);
        for (var i = 0; i  < uniqueValues.length; i++) {
            chartData.push({Type: uniqueValues[i], Value: groupData.get(uniqueValues[i]).get("TRUE").length})
        }
        chartData = d3.sort(chartData, (a, b) => d3.descending(a.Value, b.Value));


        const margin = {top: 70, right: 30, bottom: 50, left: 350};
        const width = 1280 - margin.left - margin.right;
        const height = 768 - margin.top - margin.bottom;

        const x = d3
            .scaleLinear()
            .range([0, width])
            .domain([0, d3.max(chartData, d => d.Value)]);

        const y = d3
            .scaleBand()
            .range([height, 0])
            .padding(0.1)
            .domain(chartData.map(d => d.Type));

        const chartContainer = d3
            .select("#q5")
            .select('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);


        // Vẽ trục x và y
        chartContainer
            .append('g')
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .attr('transform', `translate(0, ${height})`)
            .style("font-size", "14px");
        
        chartContainer
            .append('g')
            .call(d3.axisLeft(y))
            .style("font-size", "14px");

        // Thêm nhãn cho trục X
        chartContainer.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom / 2})`)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "black")
            .style("font-family", "sans-serif")
            .attr("dy", "1.5em")
            .text("Number of \"Hit and Run\" cases");

        // Thêm nhãn cho trục Y
        chartContainer.append("text")
            .attr("transform", `translate(0, ${height / 2 - margin.bottom - margin.top}) rotate(-90)`)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "black")
            .style("font-family", "sans-serif")
            .attr("dy", "-24em")
            .attr("dx", "-10em")
            .text("Collision Types");

        // Thêm vạch đứt quãng
        chartContainer.selectAll("line.vertical-grid")
            .data(x.ticks(5))
            .enter()
            .append("line")
            .attr("class", "vertical-grid")
            .attr("x1", function (d) { return x(d); })
            .attr("y1", 0)
            .attr("x2", function (d) { return x(d); })
            .attr("y2", height)
            .style("stroke", "gray")
            .style("stroke-width", 0.5)
            .style("stroke-dasharray", "3 3");


        // Vẽ các cột
        chartContainer
            .append('g')
            .attr("fill", "steelblue")
            .selectAll()
            .data(chartData)
            .join("rect")
            .attr("x", x(10))
            .attr("y", (d) => y(d.Type))
            .attr("width", (d) => x(d.Value) - x(0))
            .attr("height", y.bandwidth());

        // In các giá trị
        chartContainer
            .append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .selectAll()
            .data(chartData)
            .join("text")
            .attr("x", (d) => x(d.Value))
            .attr("y", (d) => y(d.Type) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -4)
            .text((d) => (d.Value))
            .call((text) => text.filter(d => x(d.Value) - x(0) < 30) // short bars
                .attr("dx", +4)
                .attr("fill", "black")
                .attr("text-anchor", "start"));
    })
    // Báo lỗi nếu không có file
    .catch(function(error) {
        console.log(error);
});

