import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { BikeStolen } from './bike.js';
import { DinoSpam } from './dino.js';
import { GoogleLocate } from './map.js'

let globalArray = [];

$(document).ready(function() {
  let googleMap = new GoogleLocate();
  let loadMap = googleMap.geocodeFromLocation("Portland,OR,97212");

  loadMap.then(function(response) {
    let body = JSON.parse(response)
    let latitude = body.results[0].geometry.location.lat
    let long = body.results[0].geometry.location.lng
    return [latitude, long]
  })
  .then(function(latLongArray){
    let script = document.createElement("script");
    script.innerHTML = `let map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5122, lng: -122.6587},
        zoom: 12
      });
      let marker = new google.maps.Marker({position: {lat: ${latLongArray[0]}, lng: ${latLongArray[1]}}, map: map});
    }
    `
    let body = document.getElementById('body');
    body.prepend(script);
  })
  .then(function() {
    let mapScript = document.createElement("script");
    mapScript.setAttribute("src", 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC9lMrrD9IIguOMmDBYH9oPJW44zxCX5GA&callback=initMap');
    let body = document.getElementById('body');
    body.append(mapScript);
  });

  let dinoNames = new DinoSpam();
  let promiseDinos = dinoNames.getDinoNames();


  promiseDinos.then(function(response){
    let body = JSON.parse(response);

    body[0].forEach(function(name) {
      globalArray.push(name);
    });
  });

  let stolenBikes = new BikeStolen();
  let promiseBikes = stolenBikes.getStolenBikes();
  let bikeArray = [];
  promiseBikes.then(function(response) {

    let body = JSON.parse(response);
    let bikes_array = body.bikes;
console.log("bikes_array: ", bikes_array)
    for (let i = 0; i < bikes_array.length; i++) {
        // bikes_array[i].manufacturer_name = globalArray[i];  //This line changes the bike manufacturer name for a dinosaur name
        $("#output").append("<li>" + bikes_array[i].title + ", " + bikes_array[i].manufacturer_name + " Last seen: " + bikes_array[i].stolen_location + "</li>")
        bikeArray.push(bikes_array[i].stolen_location);
      }


    console.log(globalArray);
    console.log(bikeArray);
    // document.getElementById("output").innerHTML = response;
  }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });

});
