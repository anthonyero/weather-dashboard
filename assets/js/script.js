var userCityInputEl = document.getElementById("city-name-input");
var submitCityButton = document.querySelector(".submit-city-name-button");


// Calling the OpenWeather API 
    // Can be called by: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// To get the latitude and longitude we need to use the Godcoding API
    // Can be called by: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

apiKey = "f53ab74dd566b816acb325cb5f4a1e19"


submitCityButton.addEventListener("click", retrieveCityCoordinates);

function retrieveCityCoordinates(event) {
    event.preventDefault();
    var cityName = userCityInputEl.value;
    cityName = cityName.replaceAll(" ", "_"); // If a city submitted 
    console.log("cityName: " + cityName);
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;
    console.log("requestURL: " + requestURL);

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                window.alert("I'm sorry, the city name you entered did not return any results.")
            }
            else {
                var name = data[0]["name"];
                var cityLatitude = data[0]["lat"];
                var cityLongitude = data[0]["lon"];
                var country = data[0]["country"]
               
                console.log("")
                console.log("cityName: " + cityName);
                console.log("name: " + name);
                console.log("cityLatitude: " + cityLatitude);
                console.log("cityLongitude: " + cityLongitude);
                console.log("country: " + country)
                if ("state" in data[0]){
                    var state = data[0]["state"];
                    console.log("state: " + state);
                }
            }
        })
            
            }



    
