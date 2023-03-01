//Variables to access the search bar
const form = document.querySelector('form');
const searchResult = document.querySelector('.search')
const container = document.querySelector('.container');
const favourites = document.querySelector('.favourites');
const recipe = document.querySelector('.item');
const modal = document.getElementById('modalbody');
let userQuery = '';
//Variables for type-writer function
var i = 0;
var txt = 'Delicious and tasty foods';
var speed = 50;
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
//https://api.edamam.com/search
//ID and key to acces the Edamam API
const ID = "491c0a25";
const key = "90f6192735aad01f8dc20fb18ee53869";
//Event Listener for user input
form.addEventListener('submit' , (e) =>{
    e.preventDefault();
    userQuery = e.target.querySelector('input').value;
    console.log(userQuery);
    fetchData();
localStorage.setItem('favorite', userQuery );
})
//Fetch required data from Edamam API
async function fetchData(){
 const baseURL = `https://api.edamam.com/search?q=${userQuery}&app_id=${ID}&app_key=${key}`;
 const response = await fetch(baseURL);
 const data = await response.json();
 createContent(data.hits);
 console.log(data);
}
//Show the data provided by the API to the user
function createContent(results){
    let initialContent = '';
    results.map(result => {
        initialContent +=
        `<div class="item">
        <img src="${result.recipe.image}" alt="recipe-image">
        <div class="flex-container">
            <h1 class='title'>${result.recipe.label}</h1>
            <a class='view-btn' href='${result.recipe.url}'>View Recipe</a>
        </div>
    </div>`
    })
    searchResult.innerHTML = initialContent;
}
// Adding Local Storage
//Event Listener for favourites icon
let favouriteRecipe = '';
if (recipe){
recipe.addEventListener('click' , (e)=>{
  favouriteRecipe =  e.target.querySelector(recipe).value;
  console.log(favouriteRecipe);
    fetchData();
})
favourites.addEventListener('click' , (e)=>{
  localStorage.getItem(recipe);
})
}
let favorite=localStorage.getItem('favorite')
//Fetch required data from Edamam API
async function fetchDatalocal(){
 const baseURLlocal = `https://api.edamam.com/search?q=${favorite}&app_id=${ID}&app_key=${key}`;
 const responselocal = await fetch(baseURLlocal);
 const datalocal = await responselocal.json();
 createContent(datalocal.hits);
 console.log(datalocal);
 for (i=0; i<3; i++){
let imagelocal=datalocal.hits[i].recipe.image
let urllocal=datalocal.hits[i].recipe.url
let titlelocal=datalocal.hits[i].recipe.label
        let initialContentlocal =
        `<div class="item">
        <img src="${imagelocal}" alt="recipe-image">
        <div class="flex-container">
            <h1 class='title'>${titlelocal}</h1>
            <a class='view-btn' href='${urllocal}'>View Recipe</a>
        </div>
    </div>`
console.log(initialContentlocal)
modal.innerHTML=initialContentlocal
   }
   }
let x= fetchDatalocal()



























