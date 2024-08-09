const xhr = new XMLHttpRequest();

xhr.addEventListener('load' , ()=>{    // this is for waiting for the response from the backend as response works after some time so load means when it has loaded the response
  console.log(xhr.response);
});

xhr.open('GET' , 'https://supersimplebackend.dev/documentation' );// two parameters first i sthe type of request and second to the place (url) to send the http message or request
xhr.send();
// xhr.response;