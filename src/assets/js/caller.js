'use strict';

$(document).ready(function() {
  // FIXME: For testing only
  var COUNTER_ID = window.location.search.slice('counter_id'.length + 2);

  var TIMER_INTERVAL_ID = null,
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

    callApi('load_counter_stats', {
      counter_id: COUNTER_ID
    }, function (res) {
      if (res.stat === 'ok' && res.data) {
        Object.keys(res.data).forEach(function (key) {
          var stat_label = key.split('_')[1];
          var data = res.data[key];

          $('#' + stat_label).text(data);
        });
      }
    });
  })();

  $('body').on('resize', function () {
    $('#caller_content').css({ height: window.innerHeight });
  });

  $('#caller_next').on('click', function() {
    if (SESSION_KEY === null && COUNTER_ID === null) {
      return;
    }

    callApi('caller_next', {
      session_key: SESSION_KEY,
      counter_id: COUNTER_ID
    }, function (res) {
      if (res.stat == 'ok') {
        // FIXME:
        var served = parseInt($('#served').text())
        $('#served').text(served++)

        clearInterval(TIMER_INTERVAL_ID);

        PREV_TICKET = res.data.ticket_label;
        $('#ticket').text(PREV_TICKET);
        $('#ticket').animate({ opacity: '+=1' }, 500, 'linear');

        TIMER_START = moment();
        TIMER_INTERVAL_ID = setInterval(function () {
          $('#time').text(moment(moment().diff(TIMER_START)).format('mm:ss'));
        }, 500);
      }
    });
  });

  $('#caller_recall').on('click', function() {
    if (SESSION_KEY === null && COUNTER_ID === null) {
      return;
    }

    callApi('caller_recall', {
      session_key: SESSION_KEY,
      counter_id: COUNTER_ID
    }, function (res) {
      if (res.stat == 'ok') {
        clearInterval(TIMER_INTERVAL_ID);

        $('#time').text('00:00');

        $('#ticket').animate({ opacity: 0 }, 500, 'linear',
        function () {
          $('#ticket').text(PREV_TICKET);
          $('#ticket').animate({
            opacity: '+=1'
          }, 500);
        });
      }
    });
  });

  $('#caller_done').on('click', function() {
    if (SESSION_KEY === null && COUNTER_ID === null) {
      return;
    }

    callApi('caller_done', {
      session_key: SESSION_KEY,
      counter_id: COUNTER_ID
    }, function (res) {
      // FIXME
      clearInterval(TIMER_INTERVAL_ID);
      $('#time').text('00:00');
      $('#ticket').animate({ opacity: 0 }, 500, 'linear');
      // FIXME

      if (res.stat == 'ok') {
        console.log('caller_done', res.data);
      }
    });
  });

  $('#caller_no_show').on('click', function() {
    if (SESSION_KEY === null && COUNTER_ID === null) {
      return;
    }

    callApi('caller_no_show', {
      session_key: SESSION_KEY,
      counter_id: COUNTER_ID
    }, function (res) {
      if (res.stat == 'ok') {
        console.log('caller_no_show', res.data);
      }
    });
  });

  $('#caller_cancel').on('click', function() {
    if (SESSION_KEY === null && COUNTER_ID === null) {
      return;
    }

    callApi('caller_cancel', {
      session_key: SESSION_KEY,
      counter_id: COUNTER_ID
    }, function (res) {
      // FIXME
      clearInterval(TIMER_INTERVAL_ID);
      $('#time').text('00:00');
      $('#ticket').animate({ opacity: 0 }, 500, 'linear');
      // FIXME

      if (res.stat == 'ok') {
        console.log('caller_cancel', res.data);
      }
    });
  });
});
