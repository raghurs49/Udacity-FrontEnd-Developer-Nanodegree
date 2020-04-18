/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
const apiKey = 'a816cadd091c0bcf6a5e64ee430be071&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='

const addDataURL = '/add'
const projDataURL = '/all'

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    // select the input feelings to include in POST
    const feelText = document.getElementById('feelings').value;

    // get the API data
    getApiData(baseURL, document.getElementById('zip').value, apiKey)
    .then(function (APItemperature) {
        postData(addDataURL, { temperature: APItemperature, date: newDate, userResponse: feelText });
        // update UI
        updateUI();
    })
}

/* Function to GET Web API Data*/
const getApiData = async (baseURL, zip, key) => {
    const response = await fetch(baseURL + zip + ',in&appid=' + key);
    try {
        const webData = await response.json();
        APItemperature = webData.list[0].main.temp;
        return APItemperature
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    return allData
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };


/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

/* Update UI */
const updateUI = async () => {
    const request = await fetch(projDataURL)
    try{
        const allData = await request.json()
        const mostRecentRecord = allData[allData.length - 1];
        document.getElementById('date').innerHTML = 'Date: ' + mostRecentRecord.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + mostRecentRecord.temperature;
        document.getElementById('content').innerHTML = 'Feelings: ' + mostRecentRecord.userResponse;
    }catch(error){
        console.log("error",error)
    }
}
