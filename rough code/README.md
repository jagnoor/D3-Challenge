# D3-challenge
Assignment # 15: D3

This is my over-all 15th, and first D3 assignment. In this assignment, my task was to analyze the current trends shaping people's lives, as well as to create charts, graphs, and interactive elements to help readers understand my findings such as health risks facing particular demographics. My information sources for this assignment, are the U.S. Census Bureau and the Behavioural Risk Factor Surveillance System.
The data set included with the assignment is based on 2014 ACS 1-year estimates: https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."
In this assignment, I have utilized both: html and JavaScript.
As mandatory part of this the assignment, I was required to create a scatter plot between two of the data variables such as “Healthcare vs. Poverty” or “Smokers vs. Age”.
Using the D3 techniques, I created a scatter plot that represents each state with circle elements. I performed coding for this graphic in the “app.js” file; and pulled in the data from “data.csv” by using the “d3.csv” function. Apart from this, I performed the following tasks:
-	Included state abbreviations in the circles.
-	Created and situated the axes and labels to the left and bottom of the chart.
-	Used ”python -m http.server” to run the visualization in order to host the page at localhost:8000 in my web browser.

As bonus part of this assignment, I performed the following tasks:
-	Included more demographics and more risk factors.
-	Placed additional labels in the scatter plot.
-	Gave the additional labels “click” events, so that users can decide which data to display.
-	Animated the transitions for the circles (the US States’ abbreviations) locations as well as the range of the axes.
-	Did the above-mentioned tasks for three risk factors per each axis.

While the ticks on the axes allowed us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Therefore, I entered tooltips in D3 graphics to reveal a specific element's data when the user would hover their cursor over the element. Also, I added tooltips to the circles (the US-States’ abbreviations) and displayed each tooltip with the data that the user would select; And last but not least, I used the “d3-tip.js” plugin developed by Justin Palmer.
