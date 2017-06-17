import axios from 'axios';

export default function(state = [], action){
  const APP_TOKEN = 'YVZX1ouEpUKnP50pkta3kOsBC'
  const ROOT_URL = "https://data.cityofnewyork.us/resource/uvxr-2jwn.json"

  // const data = axios({
  //   method: 'GET',
  //   url: ROOT_URL,
  //   data: {
  //     "$limit" : 5000,
  //     "$$app_token" : APP_TOKEN
  //   }
  // })


  const data = axios.get(ROOT_URL, {
    
    params: {
      "$limit" : 5000,
      "$$app_token" : APP_TOKEN
    }
  })
  .then(function (response) {

    console.log(response.data)
  })  


  

  return data
  
} 
