'use strict';
var API_URL = null;
var API_VER = null;
var API_KEY = null;

function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : decodeURIComponent(results[1]);
}

function appendSpinner(dom) {
  $(dom).find('span').fadeOut(function() {
    $(dom).find('i').fadeIn();
  });
}

function removeSpinner(dom) {
  $(dom).find('i').fadeOut(function() {
    $(dom).find('span').fadeIn();
  });
}

function callApi(action, params, callback, error_callback) {
  if (API_URL === null) {
    API_URL = gup('url');
  }
  API_URL = API_URL === null ? 'http://localhost' : API_URL;

  var host = API_URL;
  var query = '';

  if (typeof params === 'object') {
    var payload = [];

    Object.keys(params).forEach(function (key) {
      payload.push(key + '=' + params[key]);
    });

    if (API_VER != null && API_KEY != null) {
      payload.push('v=' + API_VER);
      payload.push('ak=' + API_KEY);
    }

    query += '&'.concat(payload.join('&'));
  }

  if (typeof Sentry != 'undefined') {
    Sentry.captureMessage(host + '/engine/api.php?act='+ action + query, 'debug');
  }

  $.ajax({
    url: host + '/engine/api.php?act='+ action + query,
    success: function(res) {
      if (typeof callback === 'function') {
        callback(res);
      }
    },
    error: function(err) {
      console.error(err);
      
      if (typeof Sentry != 'undefined') {
        Sentry.captureException(err, 'fatal');
      }

      if (typeof error_callback === 'function') {
        error_callback(err);
      }
    }
  });
}