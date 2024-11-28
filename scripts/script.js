

var city_drop_down = document.getElementById("city_drop_down");
var country_drop_down = document.getElementById("country_drop_down");
var dropdown_section = document.getElementById("country_cities");
var weather_girl = document.getElementById("weather_girl");
var weather_girl_section = document.getElementById("weather_girl_predicts");
var footer = document.getElementById("footer")

var Iran_cities = {  
  "Isfahan": "اصفهان",  
  "Karaj": "کرج",  
  "Mashhad": "مشهد",  
  "Tabriz": "تبریز",  
  "Tehran": "تهران",  
  "Shiraz": "شیراز",  
  "Kerman": "کرمان",  
  "Yazd": "یزد",  
  "Rasht": "رشت",  
  "Arak": "اراک",  
  "Sanandaj": "سنندج",  
  "Bandar Abbas": "بندرعباس",  
  "Urmia": "ارومیه",  
  "Zanjan": "زنجان",  
  "Dezful": "دزفول",  
  "Khorramabad": "خرم‌آباد",  
  "Sari": "ساری"  
};  




function get_date(){  
  let date = new Date();  
  
  // Update the Farsi date format to show month before day  
  let farsi_date = new Intl.DateTimeFormat("fa", {  
      month: "long",  
      day: "numeric",
      weekday: "long" 
  }).format(date).split(" ");  
  
  
  let english_date = new Intl.DateTimeFormat("en", {  
    month: "long",  
    day: "numeric",
    weekday: "long" 
}).format(date).split(" "); 

  function get_date_text(d){  
      let day = d.getDate();  
      let month = d.getMonth() + 1; // month is 0-indexed  
      let year = d.getFullYear();  
      let full_date = `${year}-${month}-${day}`;  
  
      return full_date;  
  }  

  let fullDate_now = get_date_text(date);  
  
  let laterDate = new Date(date);  
  laterDate.setDate(date.getDate() + 5);  

  // Format the later date  
  let fullDate_later = get_date_text(laterDate);  
  
  return [fullDate_now, fullDate_later, farsi_date,english_date];  
}  




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

      if (city in Iran_cities) {  
        var city_farsi = Iran_cities[city]; 
      }else{
        var city_farsi = city;
        
      }

      
      
      city_element.textContent = city_farsi;
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

            forecast_intro = document.getElementById("forecast_intro");


            if (city in Iran_cities) {  
              forecast_intro.innerHTML = `هوای چند روز آینده در ${city_farsi}`
              if (day=="day1"){
                day_p.innerHTML = city_farsi + " "+  get_date()[2][1] +" " +  get_date()[2][2];
  
              }else{
                day_p.innerHTML = day;
              }
            }else{
              forecast_intro.innerHTML = `weather forecast for the next days in ${city}`
              if (day=="day1"){
                day_p.innerHTML = city_farsi + " "+  get_date()[3][1] +" " +  get_date()[3][2]+"th";
  
              }else{
                day_p.innerHTML = day;
              }
            }  



            
          

            day_p.classList.add("day_p");
            
            var weather_icon = document.createElement("IMG");
            weather_icon.setAttribute("src", icon_path);

            weather_icon.classList.add("weather_icon");

            var temp_p = document.createElement("P"); 
            temp_p.innerHTML = temperture; 
            temp_p.classList.add("temp_p");



            var humidity_p = document.getElementById("humidity_p");
            var wind_p = document.getElementById("wind_p");
            
            humidity_p.innerHTML = description[day][2];
            wind_p.innerHTML = description[day][3];
            
            document.getElementById("humidity").classList.add("show_humidity_wind");
            document.getElementById("wind").classList.add("show_humidity_wind");

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
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${get_date()[0]}/${get_date()[1]}?key=TUEEN9GR67X4KGPKXA2XUZB49&unitGroup=metric&include=days`;
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
        weather_conditions_data[`day${day_number}`].push(temp+"°");
        weather_conditions_data[`day${day_number}`].push(humidity);
        weather_conditions_data[`day${day_number}`].push(wind);
        
      }

      console.log(weather_conditions_data)
      
      return weather_conditions_data;
  });

return weather_data
}



 


create_country_list();

