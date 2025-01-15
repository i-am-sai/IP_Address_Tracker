// Task is to build a web application with an IP address API. It'll retrieve information
// about an IP address and display the location of the IP address on a map with some other information.

// Select Form
const search_Form = document.querySelector('.header_form');

search_Form.addEventListener('submit', (event) => {
    // stop form from auto submitting on click 
    event.preventDefault();

// Explaination of the above line :
// We are altering the default behaviour of the form submit action.
// Default Behavior of a Form : 
// By default, when a form is submitted (e.g., when a user clicks a submit button), the browser performs the following actions:
// Reloads the page: The browser sends the form data to the server (based on the action attribute in the <form> tag).
// Navigates away: If the action attribute is not defined, the browser reloads the current page.


//  Function of event.preventDefault : stops the default behaviour and allows us to handle form submission manually using JS enabling us to perform action such as :
// 1. Validating the form data before submitting
// 2. Sending data to a server using fetch or XMLHttpRequest instead of reloading the page.
// 3.  Logging or processing the data without causing a page reaload
   
// get the value of the form field which is the IP address in our case.
    const value = document.querySelector('#search').value;

   // Passing the IP address to the serach_IP_Address function. 
    search_IP_Address(value);
    console.log(`IP Address : $${value}`);
});

// Search for an IpAddress 
async function search_IP_Address(IP_Address) {
    const api_key = 'YOUR_API_KEY';
    let endpoint = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${IP_Address}`;
    const request = await fetch( endpoint, {method: 'GET'});
    const response = await request.json();

    // Update the UI page
    const {location, ip, isp} = response;
    console.log(response);
    console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
    console.log(isp);
    Update_UI(ip, location.city, location.region, isp);

    // Updating the map on the page
    // First remove all map instances if any
    if(map !== undefined && map !== null){
        map.remove();
    }
    create_map(location.lat, location.lng, location.country, location.region);
}

// Update UI function
function Update_UI(IP_Address, location, timezone, isp){
    // Select all the elemenets on the page
    const address = document.querySelector('.address');
    const city = document.querySelector('.location');
    const utc = document.querySelector('.utc');
    const ISP = document.querySelector('.isp');

    // Update all the UI elements :
    address.textContent = IP_Address;
    city.textContent = location;
    utc.textContent = timezone;
    ISP.textContent = isp;
    
}

/* create the map */
let map;
function create_map(lat, lng) {
  map = L.map('map').setView([lat, lng], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`${region}, ${country}`)
    .openPopup();
}
