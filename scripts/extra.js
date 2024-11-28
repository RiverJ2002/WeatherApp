// Define the API endpoint
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London/2024-11-28/2024-12-03?key=TUEEN9GR67X4KGPKXA2XUZB49&unitGroup=metric&include=days';

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();
        console.log(data.days[0].icon);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchData();
