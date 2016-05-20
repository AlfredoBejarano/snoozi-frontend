const API = "http://10.16.60.66:3000";
//const API = "http://localhost:3000";

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	    results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function index() {
	jQuery.get(
		API + "/dog",
		function( response ) {			
			var json_array = JSON.parse(JSON.stringify(response));			
			var list = document.getElementById('gallery');

			for(var i in json_array) {
				id = json_array[i].id;
				breed = json_array[i].breed;
				color = json_array[i].color;
				found_date = json_array[i].found_date;
				found_location = json_array[i].found_location;
				image_url = json_array[i].thumb_url;

				console.log(image_url);

				var link =  document.createElement("a");
				link.className = "thumb-link"
				link.setAttribute("target","_top");
				link.setAttribute("href","dog.html?dog="+id);

				var dog = document.createElement("div");
				dog.className = "thumbnail";

				var dog_thumb = document.createElement("img");
				dog_thumb.setAttribute("src",API + image_url);

				var dog_breed = document.createElement("h3");
				dog_breed.innerHTML = breed + " " + color;

				var dog_location = document.createElement("p");
				dog_location.innerHTML = found_location + ", " + found_date;

				dog.appendChild(dog_thumb);
				dog.appendChild(dog_breed);
				dog.appendChild(dog_location);

				link.appendChild(dog);
				list.appendChild(link);
			}
		} 
	);
}

function show(dogID) {
	var dog = getParameterByName("dog");
	var dogPhoto = document.getElementById("dog-photo");

	var head = document.getElementsByTagName("head")[0];
	var title = document.createElement("title");			

	var p = document.getElementsByTagName("p");	

	jQuery.get(
		API + "/dog/"+dogID, 
		function( response ) {
			var dog = JSON.parse(JSON.stringify(response));		
			if(dog.code == "404") {
				window.open("404.html","_top");
			} else {
				dogPhoto.setAttribute("src",API+dog.image_url);
				title.innerHTML = dog.breed + " " + dog.color;
				head.appendChild(title);
			
				var texts = [
					"Hola, soy un " + dog.breed + " color " + dog.color+".",
					"Me encontrarón en " + dog.found_location + " el " + dog.found_date+".",
					'"'+dog.description+'"',
					"¿Me reconoces?, la persona que me encontro dejó un número telefónico.",
					dog.number				
				];

				for (var i = p.length - 1; i >= 0; i--) {
					p[i].innerHTML = texts[i];
					console.log(texts[i]+"");
				}	
			
				console.log(response);
			}
		}			
	);
}

function progressBar(step) {
	var bar = document.getElementById('bar');
	var number = 14;
	var ending = "%;"
	var style = "width:"
	var text = "% Completado"
	var button =  document.getElementById('submit');

	var forms = document.getElementsByClassName('form');

	/* FORM elements */
	var breed = document.getElementById('breed');
	var color = document.getElementById('color');
	/* Step 2 */
	var gender =  document.getElementsByName('gender');

	forms[step-1].style.display = "none";
	forms[step-1].style.opacity = 0;

	forms[step].style.display = "block";
	forms[step].style.opacity = 1;

	if(step == 1 ) {
		bar.innerHTML = number+text;
		bar.setAttribute("style",style+number+ending);
		button.setAttribute("onclick","progressBar(2);");
	} else if (step == 2) {
		bar.innerHTML = (number * 2)+text;
		bar.setAttribute("style",style+(number * 2)+ending);
		button.setAttribute("onclick","progressBar(3);");		
	} else if (step == 3) {
		bar.innerHTML = (number * 3)+text;
		bar.setAttribute("style",style+(number * 3)+ending);
		button.setAttribute("onclick","progressBar(4);");
	} else if (step == 4) {
		bar.innerHTML = (number * 4)+text;
		bar.setAttribute("style",style+(number * 4)+ending);
		button.setAttribute("onclick","progressBar(5);");
	}else if (step == 5) {
		bar.innerHTML = (number * 5)+text;
		bar.setAttribute("style",style+(number * 5)+ending);
		button.setAttribute("onclick","progressBar(6);");
	}else if (step == 6) {
		bar.innerHTML = (number * 6)+text;
		bar.setAttribute("style",style+(number * 6)+ending);
		button.setAttribute("onclick","progressBar(7);");
	} else {
		bar.innerHTML = "100"+text;
		bar.setAttribute("style",style+"100"+ending);
		button.setAttribute("onclick","progressBar(0);");
	}
}