
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let queryVimpUTM = params.vimp_utm
let cookieVimpUTM = getCookie('vimp_utm')

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

function vumpRequest(url, params, method) {

  params = params || {};
  method = method || "post";

  // function to remove the iframe
  var removeIframe = function( iframe ){
      iframe.parentElement.removeChild(iframe);
  };

  // make a iframe...
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';

  iframe.onload = function() {
    var iframeDoc = iframe.contentWindow.document;

      // Make a invisible form
      var form = iframeDoc.createElement('form');
      form.method = method;
      form.action = url;
      iframeDoc.body.appendChild(form);

      // pass the parameters
      for ( var name in params ){
          var input = iframeDoc.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = params[name];
          form.appendChild(input);
      }

      form.submit();
      // remove the iframe
      setTimeout( function(){
          removeIframe(iframe);
      }, 500);
  };

  document.body.appendChild(iframe);
}

(function (window) {

  // declare
  var vimp = {};

  // your sdk init function
  vimp.init = function () {
      // ...
      console.log("VIMP INIT->")
      vimp.track({
          'event': 'PAGE_VIEW',
          'campaign': 1,
          'action': 3,
      })
  };

  vimp.track = function (params) {
      var baseURL = 'https://vimpconvapi.devphantom.com/api/conversion?v=1'
      var data = ""
      for (var name in params) {
          data = data.concat('&'+name+'='+encodeURIComponent(params[name]))
      }
      var img = new Image();
      img.src = baseURL + data;
      img.onload = null;
      img.onerror = null;
      console.log("VIMP DATA SENT")
  };

  // define your namespace myApp
  window.vimp = vimp;

  })(window, undefined);