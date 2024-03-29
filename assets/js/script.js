var userCityInputEl = document.getElementById("city-name-input");
var submitCityButton = document.querySelector(".submit-city-name-button");
var fiveDayForecastContainer = document.querySelector(".card-container");
var todayWeatherContainer = document.querySelector(".today-weather-container");
var cardContainer = document.querySelector(".card-container")
var previousCitiesContainer = document.querySelector(".previous-cities-container");

var currentCity = {
    cityName: "",
    cityLatitude: "",
    cityLongitude: "",
    country: "",
    state: ""
}

var currentDay = dayjs().format("YYYY-MM-DD");


if (localStorage.getItem("previousCitySearches") === null) { 
    localStorage.setItem("previousCitySearches", JSON.stringify([]));
  } 

// Calling the OpenWeather API 
    // Can be called by: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} for a 5-day forecast
    // Can be called by: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} for a current forecast
// To get the latitude and longitude we need to use the Geodcoding API
    // Can be called by: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var apiKey = "f53ab74dd566b816acb325cb5f4a1e19"


submitCityButton.addEventListener("click", retrieveCityCoordinates);

function init() {
    renderSearchHistory();
}

function retrieveCityCoordinates(event) {
    event.preventDefault();
    var cityName = userCityInputEl.value;
    cityName = cityName.replaceAll(" ", "_"); // If a city submitted 
   // console.log("cityName: " + cityName);
    var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;
    //console.log("requestURL: " + requestURL);
    userCityInputEl.value = ""; // Added to clear the text box 

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                window.alert("I'm sorry, the city name you entered did not return any results.")
            }
            else {
             //   var name = data[0]["name"];
                currentCity["cityName"] = data[0]["name"];
                console.log(currentCity)
              //  var cityLatitude = data[0]["lat"];
                currentCity["cityLatitude"] = data[0]["lat"];
                console.log(currentCity)
              //  var cityLongitude = data[0]["lon"];
                currentCity["cityLongitude"] = data[0]["lon"];
                console.log(currentCity)
            //    var country = data[0]["country"]
                currentCity["country"] = data[0]["country"]
                console.log(currentCity)
               
              //  console.log("")
               // console.log("cityName: " + cityName);
              //  console.log("name: " + name);
              //  console.log("cityLatitude: " + cityLatitude);
              //  console.log("cityLongitude: " + cityLongitude);
              //  console.log("country: " + country)
                if ("state" in data[0]){
                  //  var state = data[0]["state"];
                    currentCity["state"] = data[0]["state"];
                    console.log(currentCity)
                   // console.log("state: " + state);
                } else {
                    currentCity["state"] = ""
                }
                console.log("After if: " + currentCity)
                searchHistorySave();
                getWeather() // Up to this point, the currentCity object is defined completely so I called getWeather here

            }
        })    
    console.log("End " + currentCity) // Why does this run before the fetch request?
}

function getWeather () {
    // Current Forecast
    // While statement introduced to prevent appending multiple cities
    while (todayWeatherContainer.hasChildNodes()) {
        todayWeatherContainer.removeChild(todayWeatherContainer.firstChild); // As long as the container has child elements, it will delete the first. This repeats until the list container doesn't have any child elements
    }

    var currentRequestURL =  "https://api.openweathermap.org/data/2.5/weather?lat=" + currentCity["cityLatitude"] +"&lon=" + currentCity["cityLongitude"] + "&appid=" + apiKey + "&units=imperial";//for a current forecast 
    fetch(currentRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            $(".today-weather-container").append("<h2>" + currentCity["cityName"].toUpperCase() + " (" + currentDay + ")</h2>");
            $(".today-weather-container").append("<p class='today-temp'>Temp: " +  data["main"]["temp"] + " °F</p>");
            $(".today-weather-container").append("<p class='today-wind'>Wind: " + data["wind"]["speed"]+ " MPH</p>");
            $(".today-weather-container").append("<p class='today-humidity'> Humidity: " + data["main"]["humidity"] + "%</p>");
            $(".today-weather-container").append("<img class='today-icon' src='https://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png'></img>");
        
        })



    // Five Day Weather forecast
        // Can be called by: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
        // While statement introduced to prevent appending multiple cities
        while (cardContainer.hasChildNodes()) {
            cardContainer.removeChild(cardContainer.firstChild); // As long as the container has child elements, it will delete the first. This repeats until the list container doesn't have any child elements
        }    

    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + currentCity["cityLatitude"] + "&lon=" + currentCity["cityLongitude"] +"&appid=" + apiKey + "&units=imperial";
    console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var indexes = [];
            for (var index = 0; index < data["list"].length; index++) {
                if (data["list"][index]["dt_txt"].includes("15:00")) {
                        indexes.push(index);
                }
            }
            console.log("indexes: " + indexes)
            for (var i = 0; i < indexes.length; i++) {
                $(".card-container").append("<div class='card card" + i + "'>");
                $(".card" + i).append("<h3 class='date'>" + data["list"][indexes[i]]["dt_txt"].slice(0,10) + "</h3>"); // Pulls date from
                $(".card" + i).append("<img class='today-icon' src='https://openweathermap.org/img/wn/" + data["list"][indexes[i]]["weather"][0]["icon"] +  "@2x.png'></img>"); // Pulls icon 
                $(".card" + i).append("<p class='temp'>Temp: " + data["list"][indexes[i]]["main"]["temp"] + " °F</p>"); // Pulls temperature 
                $(".card" + i).append("<p class='wind'>Wind: " + data["list"][indexes[i]]["wind"]["speed"] + " MPH</p>"); // Pulls temperature 
                $(".card" + i).append("<p class='humidity'>Humidity: " + data["list"][indexes[i]]["main"]["humidity"] + "%</p>"); // Pulls temperature 
                $(".card-container").append("</div>");
            }
        })
}
    
function searchHistorySave () {
    var storedCitySearches = JSON.parse(localStorage.getItem("previousCitySearches"));
    var tempSearches = []

    if (storedCitySearches.includes(currentCity["cityName"])) {
        for (var i = 0; i < storedCitySearches.length; i++){
            if (storedCitySearches[i] != currentCity["cityName"]) {
                tempSearches.push(storedCitySearches[i])
            }
        }
        tempSearches.push(currentCity["cityName"]);
        localStorage.setItem("previousCitySearches",JSON.stringify(tempSearches));
        renderSearchHistory() // Call a render function
        return

    } else {
        storedCitySearches.push(currentCity["cityName"]);
        localStorage.setItem("previousCitySearches", JSON.stringify(storedCitySearches));
        renderSearchHistory() // Call a render function
        return
    }
}

function renderSearchHistory () {
    var storedCitySearches = JSON.parse(localStorage.getItem("previousCitySearches"));

    while (previousCitiesContainer.hasChildNodes()) {
        previousCitiesContainer.removeChild(previousCitiesContainer.firstChild); 
    }

    for (var i = 0; i < storedCitySearches.length; i++) {
        $(".previous-cities-container").append("<p class='previous-search' city='" + storedCitySearches[i] + "'>" + storedCitySearches[i] + "</p>");
    }
    return 
}
// Event Listener that allows a user to select a previously searched location
$(".previous-cities-container").on("click", ".previous-search", function (event) {
    let target = event.target;
    //console.log($(target).attr("city"));
    userCityInputEl.value = $(target).attr("city"); // Uses `value`, not `textContent`
    retrieveCityCoordinates(event);
})



init();