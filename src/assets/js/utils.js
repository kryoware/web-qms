'use strict';

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
  var query = '';

  if (typeof params === 'object') {
    var payload = [];

    Object.keys(params).forEach(function (key) {
      payload.push(key + '=' + params[key]);
    });

    query += '&'.concat(payload.join('&'));
  }

  $.ajax({
    url: '/CleverQMS/engine/api.php?act='+ action + query,
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