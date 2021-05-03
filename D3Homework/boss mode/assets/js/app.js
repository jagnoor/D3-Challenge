var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 90,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(scatData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(scatData, d => d[chosenXAxis]),
      d3.max(scatData, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;

}
function yScale(scatData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(scatData, d => d[chosenYAxis]),
  d3.max(scatData, d => d[chosenYAxis])
])
    .range([height, 0]);

  return yLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}
// function used for updating circles group with a transition to
// new circles
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}
//function for updating STATE labels
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  textGroup.transition()
    .duration(2000)
    .attr('x', d => newXScale(d[chosenXAxis]))
    .attr('y', d => newYScale(d[chosenYAxis]));

  return textGroup
}

//function to stylize x-axis values for tooltips
function styleX(value, chosenXAxis) {

  //style based on variable
  //poverty
  if (chosenXAxis === 'poverty') {
      return `${value}%`;
  }
  //household income
  else if (chosenXAxis === 'income') {
      return `USD ${value}`;
  }
  else {
    return `${value}`;
  }
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis,chosenYAxis, circlesGroup) {

  var xLabel,yLabel;

  if (chosenXAxis === "poverty") {
    xLabel = "Poverty:";
  }
  else if(chosenXAxis === "age") {
    xLabel = "Age:"  
  }else{
    xLabel = "Income:"
  }

  if (chosenYAxis === "smokes") {
    yLabel = "Smokers:";
  }
  else if(chosenYAxis === "healthcare") {
    yLabel = "Health Care:"  
  }else{
    yLabel = "Obesity:"  
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`State: ${d.state}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}%`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });
    
  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(scatData, err) {
  if (err) throw err;

  // parse data
  scatData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.income = +data.income;
    data.obesity = +data.obesity;
    data.age = +data.age;
    data.smokes = +data.smokes;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(scatData, chosenXAxis);
  var yLinearScale = yScale(scatData, chosenYAxis);  

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(scatData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");

  // Create group for two x-axis labels
  var XLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  var povertyLabel = XLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .style('font-family', 'sans-serif')
    .text("In Poverty (%)");

  var ageLabel = XLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .style('font-family', 'sans-serif')
    .text("Age (Median)");

  var houseHoldLabel = XLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .style('font-family', 'sans-serif')
    .text("Household Income (Median)");

    var yXLabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");
  // append y axis

var obesityLabel = yXLabelsGroup.append("text")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("value","obesity")
  .classed("inactive", true)
  .style('font-family', 'sans-serif')
  .text("Obese (%)");
  
  var smokeLabel = yXLabelsGroup.append("text")
    .attr("y", 0 - margin.left+20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value","smokes")
    .classed("inactive", true)
    .style('font-family', 'sans-serif')
    .text("Smokes (%)");

  var healthcareLabel = yXLabelsGroup.append("text")    
    .attr("y", 0 - margin.left+40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "healthcare")
    .classed("active", true)
    .style('font-family', 'sans-serif')
    .text("Lacks Healthcare (%)");
  

  
    var textGroup = chartGroup.selectAll(".stateText")
      .data(scatData)
      .enter()
      .append("text")
      .classed('stateText', true)
      .style("font-family", "sans-serif")
      .attr("font-size", "8px")
      .attr("fill", "blue")
      .attr("dy", ".4em")
      .attr("dx", "-.7em")
      .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .text(function(d){return d.abbr});
  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

  // x axis labels event listener
  XLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(scatData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);
//update text 
textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);
        
        // changes classes to change bold text
        if (chosenXAxis === "age") {
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
            houseHoldLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if(chosenXAxis === "poverty") {
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
            houseHoldLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else{
          ageLabel
          .classed("active", false)
          .classed("inactive", true);
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
          houseHoldLabel
          .classed("active", true)
          .classed("inactive", false);
        }
      }
    });
    yXLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;
        
        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(scatData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
        //update text 
        textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);
        
        // changes classes to change bold text
        if (chosenYAxis === "smokes") {
          smokeLabel
            .classed("active", true)
            .classed("inactive", false);
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
            obesityLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if(chosenYAxis === "healthcare") {
          smokeLabel
            .classed("active", false)
            .classed("inactive", true);
            healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
            obesityLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          smokeLabel
            .classed("active", false)
            .classed("inactive", true);
            healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
            obesityLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});
