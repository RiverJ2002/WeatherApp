
var city_drop_down = document.getElementById("city_drop_down");
var country_drop_down = document.getElementById("country_drop_down");
var dropdown_section = document.getElementById("country_cities");
var weather_girl_section = document.getElementById("weather_girl_predicts");
 

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function show_country_dropdown() {
  document.getElementById("country_drop_down").classList.toggle("show");
    const citySections = document.querySelectorAll('.city_section');  
  citySections.forEach(section => {  
    section.style.display = 'none';  
  });  
}



// Show the respective city dropdown for the clicked country  
function show_city_dropdown(event) {  
  event.preventDefault(); 
   
  const citySections = document.querySelectorAll('.city_section');  
  citySections.forEach(section => {  
    section.style.display = 'none';  
  });  

  // Display the selected country’s city section  
  const city_sectionid = event.target.id + "_cities";  
  document.getElementById(city_sectionid).style.display = 'block';  
  
} 



async function fetchCityData() {
  try {
    const response = await fetch("scripts/city_lists.json");
    const city_data = await response.json();

    return city_data; 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}





// Create the country list and city dropdowns  
async function create_country_list() {  
  let country_city = await fetchCityData();  
  
  for ([countryName, cities] of Object.entries(country_city)) {  
    var country = document.createElement("A");   
    country.id = `country_${countryName.replace(/\s+/g, '_')}`; // Unique ID for each country  
    country.classList.add("contries");  
    country.textContent = countryName;   
    country_drop_down.appendChild(country);  

    // Create city dropdown for selected country  
    var city_section = document.createElement("SECTION");  
    city_section.id = country.id + "_cities";
    city_section.classList.add("city_section");  
    

    cities.forEach(city => {  
      var city_element = document.createElement("A");  
      city_element.classList.add("cities");  
      city_element.textContent = city;  
      city_section.appendChild(city_element)  
    });

    // Append city section (initially hidden)  
    city_section.style.display = "none";  
    city_drop_down.appendChild(city_section);  

    // Event listener for displaying cities  
    country.addEventListener("click", function(event) {   
      show_city_dropdown(event);  
    });  
  }  
}  







async function get_weather_title(city) {
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d822c93ecbcf8e0a887cfaac6d93ff64`;  
  const weather_data = await fetch(apiUrl)
      .then((response) => response.json())
      .then(data => {

          const weatherCondition = data.list[0].weather[0].main;
          const weatherCondition2 = data.list[1].weather[0].main;
          var li =Array()
          li.push(`The current weather in ${city} is ` + weatherCondition)
          li.push(`tomorrow weather in ${city} will be `+ weatherCondition2)
          const weatherCondition3 = data.list[2].weather[0].main;
          // Change the returned value here
          return li;
      });
  


  return weather_data
}



 


create_country_list();

get_weather_title('London').then(message => {
  var today = document.createElement("P");  
  var tomorrow = document.createElement("P");  
  today.innerHTML = message[0];
  tomorrow.innerHTML = message[1];

  weather_girl_section.appendChild(today);
  weather_girl_section.appendChild(tomorrow);

});