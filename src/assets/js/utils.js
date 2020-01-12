'use strict';

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
  var host = 'http://dev.teaconcepts.net/CleverQMS/';
  var query = '';

  if (typeof params === 'object') {
    var payload = [];

    Object.keys(params).forEach(function (key) {
      payload.push(key + '=' + params[key]);
    });

    query += '&'.concat(payload.join('&'));
  }

  $.ajax({
    url: host + 'engine/api.php?act='+ action + query,
    success: function(res) {
      if (typeof callback === 'function') {
        callback(res);
      }
    },
    error: function(err) {
      console.error(err);
      if (typeof error_callback === 'function') {
        error_callback(res);
      }
    }
  });
}