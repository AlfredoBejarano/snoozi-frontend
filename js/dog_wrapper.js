const API = "http://10.16.60.239:3000";

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
		"http://10.16.60.239:3000/dog", 
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
		"http://10.16.60.239:3000/dog/"+dogID, 
		function( response ) {
			var dog = JSON.parse(JSON.stringify(response));		
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

			console.log(dog);
		}			
	);
}