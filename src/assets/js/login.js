"use strict";

$(document).ready(function () {
  (function () {
    callApi('load_departments', { details: 'full' } , function (res) {
      if (res.stat === 'ok' && res.data) {
        Object.values(res.data).forEach(function (dept, key) {
          $('#departments').append(`
            <li class="nav-item">
              <a class="nav-link tx-semibold ht-100p ${key === 0 ? 'active' : ''}" id="${dept.dept_name.toLowerCase().split(' ').join('-')}-tab" data-toggle="tab" href="#${dept.dept_name.toLowerCase().split(' ').join('-')}" role="tab" aria-controls="contact" aria-selected="false">
                <div class="d-flex flex-column justify-content-center ht-100p">
                  <p class="mg-0 text-uppercase">${dept.dept_name}</p>
                </div>
              </a>
            </li>
          `);

          $('#counters').append(`
            <div class="ht-100p tab-pane fade ${key === 0 ? 'show active' : ''}" id="${dept.dept_name.toLowerCase().split(' ').join('-')}" role="tabpanel" aria-labelledby="${dept.dept_name.toLowerCase().split(' ').join('-')}-tab">
              <div class="row d-flex flex-wrap flex-grow-1 counter-list"></div>
            </div>
          `);

          Object.values(dept.counters).forEach(function (counter) {
            $('#' + dept.dept_name.toLowerCase().split(' ').join('-')).find('.counter-list').append(`
              <div class="department-select col-6">
                <div class="department-card custom-rounded ht-100p bg-secondary pd-20" data-counter_id=${counter.counter_id}>
                  <p class="text-center text-uppercase wd-100p tx-white tx-semibold mg-0" style="font-size: 4vmin;">Counter #${counter.counter_no}</p>
                  <p class="text-center text-uppercase wd-100p tx-white mg-0" style="font-size: 3vmin; opacity: 0;">[ {USER} ]</p>
                </div>
              </div>
            `);
          });
        });
      }
    });
  })();

  $('body').on('click', '#departments a', function () {
    $(this).tab('show');
  });

  $('body').on('click', '.department-card', function () {
    if ($(this).hasClass('bg-warning')) {
      return;
    } else if ($(this).hasClass('bg-custom')) {
      $(this).removeClass('bg-custom');
      $(this).addClass('bg-secondary');
      $('.btn-continue').parent().slideUp(300);
      return;
    } else {
      $(this).removeClass('bg-secondary');
      $('#counters .bg-custom').removeClass('bg-custom').addClass('bg-secondary');
      $(this).addClass('bg-custom');

      $('[name="counter"]').val($(this).data('counter_id'));
      $('.btn-continue').parent().slideDown(300);
      setTimeout(function () {
        document.getElementById('tab_content_wrapper').scrollIntoView();
      }, 300);
    }
  });

  $('body').on('click', '.btn-continue', function () {
    $('#login-modal #login_counter').text($('[name="counter"]').val());
    $('#login-modal').modal('show');
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (e.isDefaultPrevented() && e.isImmediatePropagationStopped()) {
      appendSpinner($('[type="submit"]'));

      var dept_name = $('.nav-link.active').text().trim()

      var payload = {};
      $(this).serializeArray().forEach(function (input) {
        payload[input.name] = input.value;
      });

      callApi('caller_login', {
        caller_pin: '1234' // FIXME: For DEMO
      }, function (res) {
        removeSpinner($('[type="submit"]'));

        if (res.stat === 'ok') {
          var user = {};

          user.fname = res.data.fname;
          user.lname = res.data.lname;
          user.session_key = res.data.session_key;
          user.dept_name = dept_name;

          window.localStorage.setItem('user', JSON.stringify(user));
          window.location.href = 'caller-standard.php?counter_id=' + payload.counter;
        } else {
          $('form .form-control').addClass('parsley-error');
          $('form .error').text('Invalid PIN');
          $('form .error').animate({ opacity: 1 }, 300);
        }
      });
    }
  });
});