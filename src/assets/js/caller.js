'use strict';

$('body').on('hidden.bs.modal', '#feedback-modal', function () {
  $(this).find('#spinner').show();
  $(this).find('#api_message p').hide().text('');
})

$(document).ready(function() {
  // FIXME: For testing only
  var COUNTER_ID = window.location.search.slice('counter_id'.length + 2);

  var TIMER_INTERVAL_ID = null,
  LOAD_INTERVAL = null,
  SESSION_KEY = null,
  TIMER_START = null,
  PREV_TICKET = null;

  if (COUNTER_ID) $('#counter_label').text(COUNTER_ID);

  (function () {
    var data = JSON.parse(window.localStorage.getItem('user'));

    if (data === null) {
      console.error('No user found');
    } else {
      SESSION_KEY = data.session_key;
      if (data.fname != '' && data.lname != '') {
        $('#name').text(data.fname.concat(' ', data.lname));
      }

      if (data.dept_name) {
        $('#dept_label').text(data.dept_name);
      }
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
      $('#feedback-modal').find('#api_message')
        .removeClass('bg-danger')
        .removeClass('bg-custom')
        .addClass(context)
        .toggleClass('show');
  
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
    callApi('load_counter_stats', { counter_id: COUNTER_ID }, function (res) {
      if (res.stat === 'ok' && res.data) {
        Object.keys(res.data).forEach(function (key) {
          var stat_label = key.split('_')[1];
          var data = res.data[key];

          $('#' + stat_label).text(data);
        });

        if (res.data.hasOwnProperty('current_ticket')) {
          var ticket = res.data.current_ticket;
          clearInterval(TIMER_INTERVAL_ID);
          
          TIMER_START = moment(ticket.dt_served);
          TIMER_INTERVAL_ID = setInterval(function () {
            $('#time').text(moment(moment().diff(TIMER_START)).format('mm:ss'));
          }, 500);
          $('#ticket').text(ticket.ticket_label).animate({ opacity: 1 }, 250);
        }
      }
    });
  }

  // Handle all buttons
  $('body').on('click', 'button[id*="caller_"]', function () {
    if (SESSION_KEY === null && COUNTER_ID === null) {
      return;
    }

    $('#feedback-modal').modal('show');
    var action = $(this).attr('id');

    callApi(action, { session_key: SESSION_KEY, counter_id: COUNTER_ID }, function (res) {
      clearInterval(TIMER_INTERVAL_ID);
      showMessage(res.stat, res.statMsg);

      $('#ticket').animate({ opacity: 0 }, 250);
      $('#time').text('00:00');

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
          $('#ticket').text(res.data.ticket_label).animate({ opacity: 1 }, 250);
          startTimer();
          break;

        case 'caller_recall':
          loadStats();
          startTimer();
          break;
      }
    });
  })

  // Scroll fix ?
  $('.main-content').css('height', 'calc(100vh - ' + $('.custom-header').innerHeight() + 'px)');
});
