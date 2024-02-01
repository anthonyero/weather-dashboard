# Weather Dashboard Webpage

This webpage presents a weather dashboard that will run in the browser and features dynamically updated HTML and CSS. This webpage  makes use of the OpenWeather Map API to retrieve weather information.

**Features include**:

- Allows user to submit the name of a city which will initiate a request for the city's longitude and latitude coordinates using OpenWeatherMap Geocoding API
- The returned coordinates will be submitted as a request to two of OpenWeather's APIs to present the user with their selected city's current weather information as well as a five-day forecast. Weather information include:
    - Temperature
    - Wind speed
    - Humidity
    - An icon describing the weather / weather forecast
- User's previous searches are locally stored and provide the user with a search history list
- Each previous search has an event listener that will initiate a search for the selected city and will populate the webpage with new weather information
- HTML elements with corresponding CSS styling are dynamically added to the markup 

This exercise was provided by Northwestern University and edX through the Coding boot camp. Submitted as fulfillment of the Module 06 exercise during the December, 2023 - June, 2024 cohort.

## Installation

N/A

## Usage

This webpage has been published through GitHub Pages and this project's files can be accessed through the following links:

- [Link to the published GitHub Page](https://anthonyero.github.io/weather-dashboard/)

- [Link to the GitHub repository](https://github.com/anthonyero/weather-dashboard)

To utilize this webpage: a user visits the GitHub Page, enters text into the search bar and submits. This will trigger API calls to retrieve relevant weather information for their selected city and HTML elements will be dynamically created. A user can also reference previous searches on the left-hand side of the webpage and click on the name of a previous search to populate the webpage with their new selection's weather information. 

Relevant images, HTML file, CSS stylesheet, and JavaScript files are included within this repository. 

The HTML, CSS, and JavaScript files include comments detailing changes implemented within them. Further justifications can also be found within the repository's "Issues" tab.

Please refer to the commit history and branches within the repository for a tracked history of changes.

## Credits

Initial code was not provided for this exercise and thus I wrote the HTML, CSS, and JavaScript files myself.

This webpage utilizes OpenWeather Map, jQuery, Day.js, and Google Fonts. 

## License

N/A

![Screenshot of live weather dashboard webpage 1-31-24](/assets/images/live-weather-dashboard-webpage.png)