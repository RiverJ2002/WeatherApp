




var city_drop_down = document.getElementById("city_drop_down");
var country_drop_down = document.getElementById("country_drop_down");
var dropdown_section = document.getElementById("country_cities");
var weather_girl = document.getElementById("weather_girl");
var weather_girl_section = document.getElementById("weather_girl_predicts");
var footer = document.getElementById("footer")


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function show_country_dropdown() {
  document.getElementById("country_drop_down").classList.toggle("show");
  weather_girl.classList.toggle('slid-up');
  weather_girl_section.innerHTML = ''; // Remove all children
  footer.classList.toggle('slid-up');
  document.body.classList.toggle("show_jinx");
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
      city_section.appendChild(city_element);
      
      
        // Add click event listener to city elements
      city_element.addEventListener("click", function() {
        console.log(city);
        show_country_dropdown();

        
      get_weather_days('Tehran').then(description => {  
        description.forEach(day_weather_data => {  
          var x = document.createElement("IMG");
          x.setAttribute("src", get_weather_icon(day_weather_data));


          x.setAttribute("width", "24");
          x.setAttribute("height", "24");



          console.log(get_weather_icon(day_weather_data))
          
          const p = document.createElement("P"); 
          p.innerHTML = day_weather_data; 

        
          weather_girl_section.appendChild(p); 
          weather_girl_section.appendChild(x); 

        });
      });

    });
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


 




async function get_weather_days(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d822c93ecbcf8e0a887cfaac6d93ff64`;
  const weather_data = await fetch(apiUrl)
  .then((response) => response.json())
  
  .then(data => {
      var day_number = 1;
      var weather_conditions_data =Object()
      weatherCondition_li = Array();
      for (i in data.list){
        if (data.list[i].dt_txt.endsWith("12:00:00")){
          const weatherCondition = data.list[i].weather[0].description;
          weatherCondition_li.push(weatherCondition)

        }
      }
      
      return weatherCondition_li;
  });

return weather_data
}



function get_weather_icon(weather_description) {
  
  switch (weather_description) {
    case "clear sky":
      icon_code = 'clear_sky.png';
      break;
    case "Few clouds":
      icon_code =  'few_clouds.png';
      break;
    case "scattered clouds":
      icon_code =  'broken_clouds.png';
      break;
    case "broken clouds":
      icon_code =  'broken_clouds.jpg';
      break;

    case "overcast clouds":
      icon_code =  'overcast_clouds.png';
      break;

    case "shower rain":
      icon_code =  'shower_rain.png';
      break;
    case "rain":
      icon_code =  'rain.png';
      break;
    case "thunderstorm":
      icon_code =  'thunderstorm.png';

    case "snow":
      icon_code =  'snow.png';
    
    case "mist":
      icon_code =  'mist.png';

    case "Hot":
      icon_code =  'hot.png';

    case "Windy":
      icon_code =  'windy.png';

    default:
      icon_code = 'extra.png';
      break;
  }

  weather_icon_src = `scripts/weather_icons/${icon_code}`
  return weather_icon_src

}



 


create_country_list();

