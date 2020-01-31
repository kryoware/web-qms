'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var API_URL = null;
var API_VER = null;
var API_KEY = null;

function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : decodeURIComponent(results[1]);
}

function appendSpinner(dom) {
  $(dom).find('span').fadeOut(function () {
    $(dom).find('i').fadeIn();
  });
}

function removeSpinner(dom) {
  $(dom).find('i').fadeOut(function () {
    $(dom).find('span').fadeIn();
  });
}

function callApi(action, params, callback, error_callback) {
  if (API_URL === null) {
    API_URL = gup('url');
  }

  API_URL = API_URL === null ? 'http://dev.teaconcepts.net/CleverQMS' : API_URL;
  var host = API_URL;
  var query = '';

  if (_typeof(params) === 'object') {
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
    Sentry.captureMessage(host + '/engine/api.php?act=' + action + query, 'debug');
  }

  $.ajax({
    url: host + '/engine/api.php?act=' + action + query,
    success: function success(res) {
      if (typeof callback === 'function') {
        callback(res);
      }
    },
    error: function error(err) {
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