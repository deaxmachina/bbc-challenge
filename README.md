## Usage 
The build is very simple, it can be opened with live-server or similar, or simply with the html’s URL. I chose not to use webpack or similar, and modules are not installed with node. In terms of external modules, I only used D3 and an IE CSS polyfill. 

## Concept 
I followed the style of other BBC visual articles. For the visualisations, I tried to make something intuitive, where the information is displayed both as text and as an interactive. I chose to create a search box for the cities, where a selection of a city triggers two graphs to update – one which represents PM2.5 particles (there are as many particles as the actual number) ‘floating in the air’, and one as cigarettes for the number of cigarettes ‘smoked’. 

## Notes 
* Since I decided to use D3 from the start, I also chose to do standard manipulation of the DOM with the D3 API, for consistency, and also as it is cleaner sometimes. 
* I kept size in mind, but there are some optimisations that can be done. For example, I’d look up which parts of D3 I used and only import these, rather than the full library. 

**Approach for older browsers and no JS support**
  * I used ES6 JavaScript modules for all JS code, which is ignored by older browsers. For these, I instead put the content (e.g. the summary graph image) directly into the HTML. For newer browsers, I remove these dom elements from JavaScript and replace with the dynamic content. 
  * Everything other than the interactive graphs should be the same, or as close as possible. 
  * For the interactive graph with the dropdown, I removed it completely for this version as there are many parts unsupported in the code (e.g. D3). Instead, I created a summary graph with D3 and SVG, which I put as is on the 'standard' version and as an image for older browsers. Users can't search for their city, but they can still see all the data displayed. 
  * Note: Issue with no JS support: I didn't test what happens after I added the polyfills for using CSS vars, it might remove some of the styling when running on no JS.


## Attempts 
I attempted to do a few things, for which I ultimately ran out of time: 
* Webpack + babel. I tried to create an IE-supporting version, but as I haven’t done this before, I didn’t manage to get one working quickly. I decided not to use a module bundler. 
*	Toggle the animation for the particles. I managed to create a toggle with which to stop the animation, but on restarting it, the particles started to accelerate. I didn’t have time to debug the issue. 

## To do
In addition to the issues from ‘attempts’, the following are easy to do, but I ran out of time: 
* Add colour legend for the particles in the PM2.5 particles animation. 
*	Add clarifying text both on the particles graph and the summary graph where the legend for the particles is. 
*	Fix the clutter of the text of the last few bars of the summary graph. 
*	Make the summary graph responsive so that it’s not so narrow on large screens. 
*	Capture a better picture of the summary graph and align for the option where the SVG is not displayed. 
*	Summary graph can also be made searchable, e.g. highlighting the selected city from the search bar. It can also be sortable by alphabetical order. 

## Final thoughts 
I had a lot of fun with this project, and I did exceed the recommended time. As I am new to working with supporting older browsers, some of my time was taken up by finding a solution that works with the graphs and menu. Ultimately, I’m sure there is a better way to do it. I ran out of time to add the option to switch to Hindi; I would have liked to do that! 


