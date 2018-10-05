var data = [];

var bg_color = "#e0e0e0";

var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
  "married": {
    desc: "Married",
    color: "#5B7BE9"
  },
  "children": {
    desc: "Own children in Household",
    color: "#E0D22E"
  },
  "healthcare": {
    desc: "Has Healthcare Coverage",
    color: "#2CCEF6"
  },
  "college": {
    desc: "Bachelor's Degree or More",
    color: "#FB7F23"
  },
  "employed": {
    desc: "Employed",
    color: "#D63CA3"
  },
  "selfemp": {
    desc: "Self-employed",
    color: "#c38014"
  },
  "publictrans": {
    desc: " Primarily Pub. Trans. to Work",
    color: "#E24062"
  },
  "income_moremed": {
    desc: "Personal Income Above Nat. Med.",
    color: "#5BB923"
  },
  "inpoverty": {
    desc: "Below Poverty Line",
    color: "#555"
  },
  "isveteran": {
    desc: "Veteran",
    color: "#B190D0"
  },
  "bornoutus": {
    desc: "Born Outside US",
    color: "#bcc832"
  },
  "diffmovecog": {
    desc: "Cog. or Phys. Difficulty",
    color: "#ee7b9c"
  },
  "diffhearvis": {
    desc: "Hearing or Vis. Difficulty",
    color: "#f299b3"
  },
  "widowed": {
    desc: "Widowed",
    color: "#01d99f"
  },
};

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file
function loadData() {
    // load the demographics.csv file
    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem
    d3.csv("data/demographics.csv", function (d) {
      data = d;
      var dataitem = findDataItem();
      visualizeSquareChart(dataitem);
    });
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
  var item = data.filter(function(d) {
    if (d.sex == USER_SEX && d.racesimp == USER_RACESIMP && d.agegrp == USER_AGEGRP) {
      return d;
    }
  });
  if (item.length == 1) {
    return item[0];
  }
  return null;
}

//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(dataitem) {
    // visualize the square plot per attribute in the category_color variable
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 150,
        height = 150;

    var fields = d3.keys(category_colors);
    fields.forEach(function(v, i) {
      //div for each chart
      var div = d3.select("#chart1").append("div")
        .attr("class", "chartholder");
      //title
      div.append("h6").html(category_colors[v].desc);

      var svg = div.append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("display", "inline-block")
                    .append("g");


      var rectWidth = width/10;

      var rects = svg.selectAll("rect")
        .data(d3.range(100).reverse())
        .enter().append("rect")
        .attr("x", function (d, i) {
          return rectWidth * (i % 10);
        })
        .attr("y", function (d, i) {
          return rectWidth * Math.floor(i / 10);
        })
        .attr("height", rectWidth)
        .attr("width", rectWidth)
        .attr("stroke", "white")
        .attr("fill", function(d){
            return (d>=dataitem[v]) ? "#E0E0E0" : category_colors[v].color;
        });
      });

      //Update the count div whose id is "n" with item.total
      //var total = d3.select("#n").html(dataitem.total.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      d3.select("#n").html(dataitem.total);
}


//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value.
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem());
        // TODO: find the data item and invoke the visualization function
    });
    // RACE
    d3.selectAll("#racesimp .button").on("click", function () {
        USER_RACESIMP = d3.select(this).attr("data-val");
        d3.select("#racesimp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem());
    });
    //AGEGROUP
    d3.selectAll("#agegrp .button").on("click", function () {
        USER_AGEGRP = d3.select(this).attr("data-val");
        d3.select("#agegrp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem());
    });
}
