/*
    Q6: Báo cáo về mỗi quan hệ giữa độ sáng của hiện trường và các loại va chạm 
*/


d3.csv("/data/IlluminationVSCollision.csv", d3.autoType)
    // Xử lý dữ liệu
    .then(function(data) {
        const margin = {top: 10, right: 30, bottom: 50, left: 80};
        const width = 1280 - margin.left - margin.right;
        const height = 768 - margin.top - margin.bottom;

        const chartContainer = d3
            .select("div[id = 'q6']")
                .select('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr("transform", `translate(${margin.left},${margin.top})`);

        // Danh sách các loại va chạm (Colision Type), columns
        const subgroups = data.columns.slice(1);
        console.log(subgroups);

        // Danh sách điều kiện ánh sáng (Illumination Type), rows
        const groups = data.map(d => (d.Illumination));
        console.log(groups);

        // Tìm dữ liệu lớn nhất
        var Value = Object.values(d3.max(data))
        Value.shift();
        maxValue = Value.reduce((a, b) => a + b, 0)

        // Thêm trục X
        const x = d3
            .scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.1]);
        chartContainer.append('g')  
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .style("font-size", "13px");

        // Thêm trục Y
        const y = d3
            .scaleLinear()
            .domain([0, maxValue + 200])
            .rangeRound([height, 0]);
        chartContainer.append('g')
            .call(d3.axisLeft(y))
            .style("font-size", "13px");

        // Thêm mã hóa màu
        const color = d3.scaleOrdinal(d3.schemeTableau10)
            .domain(subgroups)

        // Trồng dữ liệu
        const stackedData = d3.stack()
            .keys(subgroups)
            (data);

        // Vẽ cột
        chartContainer
            .append('g')
            .selectAll('g')
            .data(stackedData)
            .join('g')
                .attr("fill", d => color(d.key))
                .selectAll('rect')
                .data(d => d)
                .join('rect')
                    .attr("x", d => x(d.data.Illumination))
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth());

        // Thêm nhãn cho trục X
        chartContainer.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom / 2})`)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "black")
            .style("font-family", "sans-serif")
            .attr("dy", "1.5em")
            .text("Illumination Types");

        // Thêm nhãn cho trục Y
        chartContainer.append("text")
            .attr("transform", `translate(0, ${height / 2 - margin.bottom - margin.top}) rotate(-90)`)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "black")
            .style("font-family", "sans-serif")
            .attr("dy", "-4em")
            .attr("dx", "-1em")
            .text("Number of cases");

        // Thêm vạch đứt quãng
        chartContainer.selectAll("line.horizontal-grid")
            .data(y.ticks(5))
            .enter()
            .append("line")
            .attr("class", "horizontal-grid")
            .attr("x1", 0)
            .attr("y1", function (d) { return y(d); })
            .attr("x2", width)
            .attr("y2", function (d) { return y(d); })
            .style("stroke", "gray")
            .style("stroke-width", 0.5)
            .style("stroke-dasharray", "3 3");

        // Thêm chú thích
        var legend = chartContainer.append('svg');
            // Thêm ô màu
        legend.selectAll(".rect")
            .data(stackedData)
            .enter()
            .append("rect")
            .attr("height", 18)
            .attr("width", 18)
            .attr("x", width - 400)
            .attr("y", function(d, i) {
                return margin.top + i * 20;
            })
            .style("fill", function(d) {
                return color(d.key);
            });

            // Thêm tên giá trị
        legend.selectAll(".label")
            .data(stackedData)
            .enter()
            .append("text")
            .attr("x", width - 400 + 25)
            .attr("y", function(d, i) {
                return margin.top + i * 20;
            })
            .text(function(d) {
                return d.key
            })
            .attr("dy", "0.9em");

        
       

        
    })
    // Báo lỗi
    .catch(function(error) {
        console.log(error);
});

