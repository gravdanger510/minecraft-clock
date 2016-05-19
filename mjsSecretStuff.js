
	//CLOCK STUFF
	var currentTime = new Date(),
	numbersClock = document.getElementById("numbers");
	interval = 1000,
	long = 41,
	lat = -71,
	clock = document.getElementById('clock'),
	timeToggle = document.getElementById('time'),
	numSeconds = function(time){
		return (time.getHours() * 3600) + (time.getMinutes() * 60) + time.getSeconds();
	},
	tick = function(){
		//Here's where the magic happens
		//Boston = 42, 71
		
		var nowSeconds = numSeconds(new Date());
		sunSet = SunCalc.getTimes(new Date(), lat, long).sunset,
		sunSetSeconds = numSeconds(sunSet),
		r = ((180 * nowSeconds)/sunSetSeconds) - 45 ;
		
		// console.log(r);
		clock.setAttribute("style", "transform:rotate(" + r + "deg)");

		//Real Clock Stuff
		if (!(new Date().getMinutes()===currentTime.getMinutes() )) {
			currentTime = new Date();
			setTime();
		}
	},
	setTime = function(){
		var timeString = "",
		isAm = "AM",
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes();

		//check if AM or PM
		if (hours > 11) {
			isAm = "PM";
		}
		//Make sure we're not in military time
		if (hours > 12) {
			hours -= 12;
		}
		//Add Zero?
		if (hours < 10) {
			timeString += "0" + hours + ":";
		}else{
			timeString += hours + ":";
		}

		//MINUTES
		if (minutes < 10) {
			timeString += "0" + minutes + "<span>" + isAm + "</span>";
		}else{
			timeString += minutes + "<span>" + isAm + "</span>";
		}
		numbersClock.innerHTML = timeString;
	},
	toggleTime = function(){
		toggleClass(numbersClock, "show");
		toggleClass(timeToggle, "on");
	}
	icons = document.getElementsByClassName("fa"),
	info = document.getElementById("info");

	for(i = 0; i < icons.length; i++){

		icons[i].addEventListener("click", function(){
			toggleClass(info, "open");
		});
	}
	setTime();
	tick();
	// getLocation();


	window.setInterval(function(){
		// tick();
	}, interval);

	var toggleClass = function(element, newClass) {
	if (element.classList.contains(newClass)) {
		element.classList.remove(newClass);
	}else{
		element.classList.add(newClass);
	}
	};
	//LOCATION STUFF
	var getLocation = function() {
		var headsUp = confirm("This clock uses your location, is that cool?");
		if(headsUp && navigator.geolocation){
			navigator.geolocation.getCurrentPosition(setLocation);
		}else{
			alert("No worries! Showing the time for Boston, MA");
		}
	},
	setLocation = function (position) {
	    lat = position.coords.latitude;
	    long = position.coords.longitude;
	};	
	