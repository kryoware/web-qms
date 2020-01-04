"use strict";

// FIXME: Move this block below .ready()
var DEPT_ID = null;

$(document).ready(function () {

  (function () {
    if (window.location.search.indexOf('dept_id')) {
      DEPT_ID = window.location.search.slice('dept_id'.length + 2);
    }

    callApi('load_departments', { details: 'full' } , function (res) {
      if (res.stat === 'ok' && res.data) {
        var department = Object.values(res.data).filter(function(dep) {
          return parseInt(dep.dept_id) === parseInt(DEPT_ID);
        })[0];

        $('#dept_name').text(department.dept_name);
        
        Object.values(department.counters).forEach(function (counter) {

        });
      }
    });
  })();

  $('body').on('click', '.counter-select', function () {
    if ($(this).hasClass('bg-danger')) {
      return;
    } else if ($(this).hasClass('bg-teal')) {
      $(this).removeClass('bg-teal');
      $(this).addClass('bg-secondary');
      return;
    } else {
      $(this).removeClass('bg-secondary');
      $('#counters .bg-teal').removeClass('bg-teal').addClass('bg-secondary');
      $(this).addClass('bg-teal');

      console.log($(this).data())

      $('[name="counter"]').val($(this).data('counter_id'))
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault()
    e.stopImmediatePropagation()

    if (e.isDefaultPrevented() && e.isImmediatePropagationStopped()) {
      console.log($(this).serializeArray())
    }
  });

});