let button = document.querySelector("button");
let key = ""; //key to API
let city = document.querySelector("input");

let place = document.querySelector("h1");
let date = document.querySelector(".date");
let temp = document.querySelector(".degrees");
let description = document.querySelector(".description");
let container = document.querySelector(".container");
let main = document.querySelector("main");

window.addEventListener("load", () => {
	let lat;
	let lon;

	//Get current location:
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			console.log(lat, lon);

			let des =
				"http://api.weatherapi.com/v1/current.json?key=" +
				key +
				"&q=" +
				lat +
				"," +
				lon +
				"&aqi=no";

			fetch(des)
				.then(response => {
					return response.json(); //get to json
				})
				.then(data => {
					place.innerHTML = data.location.country + " " + data.location.name;
					date.innerHTML += data.location.localtime;
					temp.innerHTML = data.current.temp_c + " C";

					if (data.current.temp_c > 17) {
						description.innerHTML = "warm";
						container.style.backgroundImage =
							"url(pic/pexels-alex-azabache-4094260.jpg)";
						main.style.color = "white";
					} else {
						description.innerHTML = "cold";
						container.style.backgroundImage =
							"url(pic/pexels-brett-sayles-2097628.jpg)";
						main.style.color = "black";
					}
				});
		});
	}
});
/*get current date and timezone
let date = new Date();
let offset = date.getTimezoneOffset();*/

button.addEventListener("click", function () {
  date.innerHTML = "Date: ";
	temp.innerHTML = "Temperature: ";

	// Enter key
	let privateKey = prompt("Please enter your key");
	if (privateKey != null) {
		key = privateKey;
	} else {
	}

	// Get data
	let url =
		"http://api.weatherapi.com/v1/current.json?key=" +
		key +
		"&q=" +
		city.value +
		"&aqi=no";

	fetch(url)
		.then(response => {
			return response.json(); //get to json
		})
		.then(data => {
			console.log(data);
			place.innerHTML = data.location.country + " " + data.location.name;
			date.innerHTML += data.location.localtime;
			temp.innerHTML = data.current.temp_c + " C";

			// if (data.current.temp_c > 17) {
				description.innerHTML = "warm";
				container.style.backgroundImage =
					"url(pic/pexels-alex-azabache-4094260.jpg)";
				container.style.backgroundSize = "100%";
				container.style.backgroundPosition = "center";
				container.style.backgroundRepeat = "no-repeat";
				main.style.color = "white";
			} else {
				description.innerHTML = "cold";
				container.style.backgroundImage =
					"url(pic/pexels-brett-sayles-2097628.jpg)";
				main.style.color = "black";
			}
		});
});
