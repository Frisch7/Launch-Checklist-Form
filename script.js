// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function(){
   let form = document.querySelector("form");
   let pilotName = document.getElementById("pilotName");
   let coPilotName = document.getElementById("coPilotName");
   let fuelLevel = document.getElementById("fuelLevel");
   let cargoMass = document.getElementById("cargoMass");
   let pilotStatus = document.getElementById("pilotStatus");
   let coPilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");

   fetchPlanetData()

   form.addEventListener("submit", function(){
      
      
      if(pilotName.value ===""){
         window.alert("Pilot Name Required");
         event.preventDefault();
      }else if(coPilotName.value ===""){
         window.alert("Co-pilot Name Required");
         event.preventDefault();
      }else if(fuelLevel.value === "" || isNaN(fuelLevel.value)){
         window.alert("Fuel Level is required and must be a valid Number");
         event.preventDefault();
      }else if(cargoMass.value ==="" || isNaN(cargoMass.value)){
         window.alert("Cargo Mass is required and must be a valid Number");
         event.preventDefault();
      }

      updateLaunchStatus();
      
   });

   

});

function updateLaunchStatus(){
   document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready for launch!`;
   document.getElementById("copilotStatus").innerHTML = `Co-pilot ${coPilotName.value} is ready for launch!`;
   if(fuelLevel.value < 10000){
      faultyItems.style.visibility = "visible";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
      document.getElementById("fuelStatus").innerHTML = "Fuel level too low for Launch";
      
   }
   if(cargoMass.value > 10000){
      faultyItems.style.visibility = "visible";
      launchStatus.style.color = "red";
      launchStatus.innerHTML = "Shuttle not ready for launch"; 
      document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";         
       
   }
   if(fuelLevel.value > 10000 && cargoMass.value < 10000){
      launchStatus.innerHTML = "Shuttle is ready for launch"; 
      launchStatus.style.color = "green";
      faultyItems.style.visibility = "hidden";
   }
   event.preventDefault();
}

function fetchPlanetData(){
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         let i = Math.floor(Math.random() * json.length);
         document.getElementById("missionTarget").innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[i].name}</li>
            <li>Diameter: ${json[i].diameter}</li>
            <li>Star: ${json[i].star}</li>
            <li>Distance from Earth: ${json[i].distance}</li>
            <li>Number of Moons: ${json[i].moons}</li>
         </ol>
         <img src="${json[i].image}">
         `;
      });
   });
}
