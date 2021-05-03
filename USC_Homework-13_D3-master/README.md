# Sample Work
**Using D3 for USC Data Analytics Bootcamp**  
See the example run [here][demo]
The repo is located [here][1]

### Resources

* ToolTip with just D3 code [example][2]
* Simple tool tip [example][3]
* [Tick Format][4]
* [Tick Date Format][5]
* [d3 Format][6]
* [and d3 Format examples][7]
* [d3-tip with d3 v5][8]


[demo]
[2]: https://www.d3-graph-gallery.com/graph/interactivity_tooltip.html "click and go to example"
[3]: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
[4]: https://bl.ocks.org/mbostock/9764126
[5]: http://bl.ocks.org/ChandrakantThakkarDigiCorp/6489ffd64504d90fdd6f36535e5dd3fd
[6]: https://github.com/d3/d3-format
[7]: http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
[8]: https://bl.ocks.org/bytesbysophie/0311395c1e082f98e67efaf2c7f9555b

## Unit 16 | Assignment - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml), but you are free to investigate a different data set. The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

## Assignment Task

### Level 1: D3 Dabbler

![4-scatter](Images/4-scatter.jpg)

Create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Using D3 techniques, create a scatter plot that represents each state with circle elements. The code for the graphic will be located in the `app.js` file of the homework directory—make sure data is pulled in from `data.csv` by using the `d3.csv` function. The scatter plot should should be styled like the image at the top of this section.

* Include state abbreviations in the circles.

* Create and situate your axes and labels to the left and bottom of the chart.

### Note: To *run visualization* you either need to use:  
 *  `python -m http.server` 
 	 - This will host the page at `localhost:8000` in your web browser.
 *  **or** VS Code `Open with Live Server` (right click .html file).  
 	 - This will host the page in web browser at `localhost:5500` or next available port.

- - -

### Level 2: Impress the Boss (Optional Challenge Assignment)

Why make a static graphic when D3 lets you interact with your data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

This approach will include more demographics and more risk factors. Placing additional labels in the scatter plot and give them click events will enable users can decide which data to display. Animating the transitions for the circles' locations as well as the range of the axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

* Hint: Try binding all of the CSV data to the circles. This will let you easily determine their x or y values when you click the labels.

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Tooltips can be added to the circles that display the data that the user has selected. The `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged) helps with this task and has already been included in the assignment directory.

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

- - -

## Copyright
This selection of code is displayed by to Warren Ross @ [this GitHub][1].  
The content was derived from an assignment distributed by USC Data Analytics Bootcamp and Trilogy. Copyright anotated below:

Data Boot Camp © 2018. All Rights Reserved.

[1]: https://github.com/RandallPark/USC_Homework-13_D3 "my repo"
