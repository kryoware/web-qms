'use strict';

$(document).ready(function () {
  var TIMER_INTERVAL_ID = null,
      LOAD_INTERVAL = null,
      SESSION_KEY = null,
      TIMER_START = null,
      PREV_TICKET = null;

  (function () {
    API_KEY = gup('ak');
    API_URL = gup('url');
    API_VER = gup('v');
    SESSION_KEY = gup('session_key');

    if (SESSION_KEY === null) {
      window.location.replace('caller-login.php');
    }

    loadStats();
    startTimer();
  })();

  function showMessage(context, message) {
    var css = '';

    switch (context) {
      case 'notice':
        css = 'warning';
        break;

      case 'error':
        css = 'danger';
        break;

      case 'ok':
        css = 'custom';
        break;
    }

    context = 'bg-'.concat(css);
    $('#feedback-modal').find('#spinner').fadeOut(function () {
      $('#feedback-modal').find('#api_message').removeClass('bg-danger').removeClass('bg-custom').addClass(context).toggleClass('show');
      setTimeout(function () {
        $('#feedback-modal').find('#api_message p').html(message).fadeIn();
      }, 350);
    });
    setTimeout(function () {
      $('#feedback-modal').find('#api_message').toggleClass('show');
      $('#feedback-modal').modal('hide');
    }, 2000);
  }

  function startTimer() {
    clearInterval(LOAD_INTERVAL);
    LOAD_INTERVAL = setInterval(loadStats, 10000);
  }

  function loadStats() {
    callApi('caller_counter_stats', {
      session_key: SESSION_KEY
    }, function (res) {
      Sentry.captureMessage(JSON.stringify(res), 'debug');

      if (res.stat === 'ok' && res.data) {
        Object.keys(res.data).forEach(function (key) {
          var stat_label = key.split('_')[1];
          var data = res.data[key];
          $('#' + stat_label).text(data);
        });

        if (res.data.hasOwnProperty('current_user')) {
          var user = res.data.current_user;

          if (user.fname != '' && user.lname != '') {
            $('#name').text(user.fname.concat(' ', user.lname));
          }

          if (user.hasOwnProperty('counter_no')) {
            $('#counter_no span').text(user.counter_no);
          }

          if (user.hasOwnProperty('dept_name')) {
            $('#dept_name span').text(user.dept_name);
          }
        }

        if (res.data.hasOwnProperty('current_ticket')) {
          var ticket = res.data.current_ticket;
          clearInterval(TIMER_INTERVAL_ID);
          TIMER_INTERVAL_ID = setInterval(function () {
            TIMER_START = moment(ticket.dt_served);
            var elapsedSeconds = moment().diff(TIMER_START, 'seconds');
            var hours = parseInt(elapsedSeconds / 3600);
            var minutes = parseInt((elapsedSeconds - hours * 3600) / 60);
            var seconds = elapsedSeconds - hours * 3600 - minutes * 60;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            $('#time').text([hours, minutes, seconds].join(':'));
          }, 500);
          $('#ticket').text(ticket.ticket_label).animate({
            opacity: 1
          }, 250);
        }
      } else if (res.stat === 'error') {
        window.location.replace('caller-login.php');
      }
    }, function (err) {
      showMessage('error', 'Server Error');
    });
  }

  $('body').on('click', '#caller_logout', function () {
    callApi('caller_logout', {
      session_key: SESSION_KEY
    }, function (res) {
      if (res.stat === 'ok') {
        window.location.replace('caller-login.php');
      }
    });
  });
  $('body').on('hidden.bs.modal', '#feedback-modal', function () {
    $(this).find('#spinner').show();
    $(this).find('#api_message p').hide().text('');
  }); // Handle all buttons

  $('body').on('click', 'button[id*="caller_"]', function () {
    if (SESSION_KEY === null) {
      return;
    }

    $('#feedback-modal').modal('show');
    var action = $(this).attr('id');
    callApi(action, {
      session_key: SESSION_KEY
    }, function (res) {
      Sentry.captureMessage(JSON.stringify(res), 'debug');
      clearInterval(TIMER_INTERVAL_ID);
      showMessage(res.stat, typeof res.statMsg === 'undefined' ? '' : res.statMsg);
      $('#ticket').animate({
        opacity: 0
      }, 250);
      $('#time').text('00:00:00');

      if (typeof res.data === 'undefined') {
        return;
      }

      switch (action) {
        case 'caller_done':
          break;

        case 'caller_cancel':
          break;

        case 'caller_next':
          showMessage(res.stat, 'Now Serving: Ticket # ' + res.data.ticket_label);
          $('#ticket').text(res.data.ticket_label).animate({
            opacity: 1
          }, 250);
          startTimer();
          break;

        case 'caller_recall':
          loadStats();
          startTimer();
          break;
      }
    }, function (err) {
      showMessage('error', 'Server Error');
    });
  });
  $('.main-content').css('height', 'calc(100vh - ' + $('.custom-header').innerHeight() + 'px)');
});