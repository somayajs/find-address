
'use strict';
const smartyApiKey = "keygoeshere";
const baseUrl = `https://us-street.api.smartystreets.com/street-address?key=${smartyApiKey}&candidates=10`;
const smartyInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Host: 'us-street.api.smartystreets.com'
  }
}

const addressFeild = document.querySelector("#address");
const cityFeild = document.querySelector("#city");
const stateFeild = document.querySelector("#state");
const zipFeild = document.querySelector("#zip");

// const updateUISucsses = (data) => { // handel the success response
//   const parsedData = JSON.parse(data);
//   // console.log(parsedData);
//   const zip = parsedData[0].components.zipcode;
//   const plus4_code = parsedData[0].components.plus4_code;
//   zipFeild.value = zip + "-" + plus4_code;
// }

// const updatUIError = (error) => {  // handel the failed response
//   console.log(error);
// }
// const responseMethod = (httpRequest, succeed, failed) =>{
//   if (httpRequest.readyState === 4) { // means httpRequest is completed
//     if(httpRequest.status === 200) {
//       const response = httpRequest.responseText;
//       succeed(response);
//     } else {
//       failed(`${httpRequest.status}: ${httpRequest.responseText}`);
//     }
//   }
// }

// function createRequest(url) {
//   const httpRequest = new XMLHttpRequest();
//   httpRequest.onreadystatechange =  () => {
//     responseMethod(httpRequest, updateUISucsses, updatUIError)
//   }
//   httpRequest.open("get", url)
//   httpRequest.send()
// }


// use fetch api instead
const handleResponsestatus = (response) => {
  // if(data.status === 200) {
  if(!response.ok) {
    throw new Error((response.status + ": " + response.statusText));
  }
  console.log(response);
  // console.log(data.json());
  return response.json()
}
const updateUISucsses = (data) => { // handel the success response
  console.log(data)
  const dataObject = data[0].components
  const zip = dataObject.zipcode;
  const plus4_code = dataObject.plus4_code;
  zipFeild.value = zip + "-" + plus4_code;
};

const updatUIError = (error) => {  // handel the failed response
  console.log('hi');
  zipFeild.value = "hi";
}

function createRequest(url, success, fail, init) {
  fetch(url, init)
    .then(response => handleResponsestatus(response))
    .then(parseddata => success(parseddata))
    .catch(error => fail(error))
}
// to complete the url
const checkComplation = () =>{
  if (addressFeild.value && cityFeild.value && stateFeild.value) {
     const url = baseUrl +
     "&street=" + addressFeild.value + "&city=" + cityFeild.value + "&state=" + stateFeild.value;
    createRequest(url, updateUISucsses, updatUIError, smartyInit);
  }
}
addressFeild.addEventListener("blur", checkComplation);
cityFeild.addEventListener("blur", checkComplation);
stateFeild.addEventListener("blur", checkComplation);
