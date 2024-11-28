




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

        
        get_weather_days(city).then(description => {  
          // Assuming description is an object with properties representing days
          for (const day in description) {

            var day_weather_data = description[day][0];

            var icon_path = `scripts/weather_icons/${day_weather_data}.png`


            var temperture = description[day][1];

            if (temperture>33){
              icon_path = `scripts/weather_icons/hot.png`
            }


            var day_p = document.createElement("P");
            day_p.innerHTML = day;
            if (day=="day1"){
              day_p.innerHTML+=" "+ city
            }
            day_p.classList.add("day_p");
            
            var weather_icon = document.createElement("IMG");
            weather_icon.setAttribute("src", icon_path);

            weather_icon.classList.add("weather_icon");

            var temp_p = document.createElement("P"); 
            temp_p.innerHTML = temperture; 
            temp_p.classList.add("temp_p");

            var weather_section = document.getElementById(day);
            weather_section.innerHTML = "";
            weather_section.appendChild(weather_icon);
            weather_section.appendChild(temp_p);
            weather_section.appendChild(day_p);
            
          

            
            if (day=="day1"){
              weather_girl_section.appendChild(weather_section);
              
            }else{
              var forecast_day_sections = document.getElementById("forecast_day_sections");
              forecast_day_sections.appendChild(weather_section);
            }


             

          }

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
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/2024-11-28/2024-12-03?key=TUEEN9GR67X4KGPKXA2XUZB49&unitGroup=metric&include=days`;
  const weather_data = await fetch(apiUrl)
  .then((response) => response.json())
  
  .then(data => {
      var day_number = 0;
      var weather_conditions_data ={"day1":[],"day2":[],"day3":[],"day4":[],"day5":[],"day6":[]}
      
      for (i in data.days){
        
        
        const weatherCondition = data.days[i].icon;
        const temp = data.days[i].temp;
        const humidity = data.days[i].humidity;
        const wind = data.days[i].windspeed;
        
        
        day_number++
        
        weather_conditions_data[`day${day_number}`].push(weatherCondition);
        weather_conditions_data[`day${day_number}`].push(temp);
        weather_conditions_data[`day${day_number}`].push(humidity);
        weather_conditions_data[`day${day_number}`].push(wind);
        
      }

      console.log(weather_conditions_data)
      
      return weather_conditions_data;
  });

return weather_data
}



 


create_country_list();

