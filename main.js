
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let queryVimpUTM = params.vimp_utm
let cookieVimpUTM = getCookie('vimp_utm')


if (!cookieVimpUTM && queryVimpUTM) {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('vimp_utm', queryVimpUTM);
    setCookie('vimp_utm', queryVimpUTM, 30)

    window.location.search = urlParams;
}

if (cookieVimpUTM && !queryVimpUTM) {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('vimp_utm', cookieVimpUTM);

    window.location.search = urlParams;
}



function vimp_track(type, data) {
    let params = {
        'type': type,
        'vimp_utm': cookieVimpUTM,
        'data': data
    }
    // SEND API
    console.log("VIMP CLIENT JS SEND ->")
    console.log(params);
}


(function (window) {

  // declare
  var vimp = {};

  // your sdk init function
  vimp.init = function () {
      // ...
      console.log("VIMP INIT->")
  };

  // define your namespace myApp
  window.vimp = vimp;

})(window, undefined);