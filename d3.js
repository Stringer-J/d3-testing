function createBarChart(data) {
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 60;
    const marginLeft = 40;
  
    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(data.map(d => d.letter)) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1);
    
    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.frequency)])
        .range([height - marginBottom, marginTop]);
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("max-width", width)
        .attr("preserveAspectRatio", "xMidYMid meet");
  
    // Add a rect for each bar.
    svg.append("g")
        .attr("fill", "green")
      .selectAll()
      .data(data)
      .join("rect")
        .attr("x", (d) => x(d.letter))
        .attr("y", (d) => y(d.frequency))
        .attr("height", (d) => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());
  
    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .text("Difficulty");
  
    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 1).toFixed()))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("# Completed"));
  
    // Return the SVG element.
    return svg.node();
  }

  const data = [
    { letter: '5.7', frequency: 1 },
    { letter: '5.8', frequency: 8 },
    { letter: '5.9', frequency: 16 },
    { letter: '5.10a', frequency: 5 },
    { letter: '5.10b', frequency: 12 },
    { letter: '5.10c', frequency: 2 },
    { letter: '5.10d', frequency: 20 },
    { letter: '5.11a', frequency: 10 },
    { letter: '5.11b', frequency: 8 },
    { letter: '5.11c', frequency: 0 },
    { letter: '5.11d', frequency: 11 },
    { letter: '5.12a', frequency: 6 },
    { letter: '5.12b', frequency: 3 },
    { letter: '5.12c', frequency: 1 },
    { letter: '5.12d', frequency: 10 },
  ]

const chartContainer = document.getElementById('chart');
chartContainer.appendChild(createBarChart(data));