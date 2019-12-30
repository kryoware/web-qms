'use strict';

$(document).ready(function () {
  
  $('form').on('submit', function (e) {
    e.preventDefault();

    var input = $(this).serializeArray(), payload = {};

    input.forEach(function (i) {
      payload[i.name] = i.value;
    });

    appendSpinner($(this).find('[type="submit"]'));

    if (payload.email === 'staff@example.com' && payload.password === 'staff') {
      setTimeout(function () {
        window.location = 'home.html';
      }, 1000);
    } else {
      setTimeout(function () {
        removeSpinner($(this).find('[type="submit"]'));

        $(this).find('.form-control').addClass('is-invalid');
        $(this).find('.tx-danger').text('Invalid email or password');
        $(this).find('.tx-danger').animate({
          opacity: 1
        }, 300);
      }, 1000);
    }
  });
});
