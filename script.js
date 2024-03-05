
//Start Function and const variables
//to fetch from API and convert into JSON object.
//Called Breedlist
async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  createBreedlist(data.message);
}

start();
//function to create breedlist. Creates object for div breed.
//Option to cycle through array using map.Join""to remove 
//unwanted characters
function createBreedlist(breedlist) {
  document.getElementById("breed").innerHTML = `
        <select onchange="loadBybreed(this.value)">
            <option> Choose a dog breed </option>
            ${Object.keys(breedlist)
              .map((breed) => `<option>${breed}</option>`)
              .join("")}
        </select>`;
}

//function to load breed in drop down menu. Error correcting for
// possibility of someone selecting "choose a dog breed."
//fetch of dog breed image using dynamic code. returns json
//object of image.displays returned breed

async function loadBybreed(breed) {
  if (breed !== "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    displayImages(data.message);
  }
}

//function to control slideshow div in html
//
function displayImages(images) {
  const slideshow = document.querySelector(".slideshow");
  slideshow.innerHTML = ""; // Clear existing slides
//creates html element div.
//classlist( DOMTokenList) and add slide
//establishes background image
//appends to slide
  images.forEach((imageUrl) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.style.backgroundImage = `url(${imageUrl})`;
    slideshow.appendChild(slide);
  });
}
