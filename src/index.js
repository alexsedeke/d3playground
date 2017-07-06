/*
 * Date Range functions
 */

var currentTime = new Date()

var timeScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), currentTime])
    .range([0, 100]);

console.log(timeScale(new Date(2017,4,15)));
console.log(timeScale(currentTime));
console.log(timeScale.invert(50));
