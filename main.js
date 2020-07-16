const charactersUrl = "https://rickandmortyapi.com/api/character/";
const locationsUrl = "https://rickandmortyapi.com/api/location/";

let characterTemplate = `
<div class="characterView__card characterView__item">
<i class="{{gender}}"></i>
<img class="characterView__image" src='{{image}}'>
    <ul>
        <li>{{species}}</li>
        <li><h3>{{name}}</h3></li>
        <li>Status: {{status}}</li>
        <li>
          <span onclick="renderLocation()" class="characterView__locationLink" data-location-url="{{location.url}}">
            <i class="fa fa-map-marker" aria-hidden="true"></i>{{location.name}}
          </span>
        </li>
        <li>Appeared in {{episode.length}} episode(s)</li>
    </ul>
    </div>
    `;
  
let locationTemplate = `
<div class="characterView__location characterView__item">
    <ul>
        <li>{{type}}</li>
        <li><h3>{{name}}</h3></li>
        <li>
            <i class="fa fa-map-marker" aria-hidden="true"></i>{{dimension}}
        </li>
    </ul>
    </div>
    `;

// Function made for setting appropriate icon for all genders from API
function setGenderIcon() {
  switch ($(".characterView__card > i").attr("class")) {
    case "Male":
      $(".characterView__card > i").addClass("fa fa-mars fa-4x");
      break;
    case "Female":
      $(".characterView__card > i").addClass("fa fa-venus fa-4x");
      break;
    case "Genderless":
      $(".characterView__card > i").addClass("fa fa-genderless fa-4x");
      break;
    default:
      $(".characterView__card > i").addClass("fa fa-question fa-4x");
  }
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Function primarly used for getting number of characters from API
function getContentCount(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        resolve(data.info.count);
      })
      .catch(function (error) {
        reject(1);
      });
  });
}

// Function that gets gets API data from entered URL
async function getContent(generatedURL) {
  return new Promise((resolve, reject) => {
    fetch(generatedURL)
      .then((resp) => resp.json())
      .then(function (data) {
        resolve(data);
      })
      .catch(function (error) {
        reject(1);
      });
  });
}

// Function that gets character data from API using previous functions and renders data
async function renderCharacter() {
  let characterCount = await getContentCount(charactersUrl);
  let charID = getRandomNumber(1, characterCount);
  let character = await getContent(charactersUrl + charID);

  let template = Handlebars.compile(characterTemplate);
  let html = template(character);
  $(".characterView__card").replaceWith(html);
  $(".characterView__location").hide();
  setGenderIcon();
}

// Abervation of renderCharacter() for Location data
async function renderLocation(){
  let locationURL = $(".characterView__locationLink").attr("data-location-url");
  let location = await getContent(locationURL);

  let template = Handlebars.compile(locationTemplate);
  let html = template(location);
  $(".characterView__location").replaceWith(html);
}

// First 
renderCharacter();


