"use strict";

var AUDIO = new Audio('./assets/ding_dong.mp3'),
    MODAL_TIMEOUT = 60000,
    COUNTER_TIMEOUT = 10000,
    REFRESH_INTERVAL = 5000,
    MAX = 3,
    CURR = 0,
    FULLSCREEN_ENABLED = false,
    FULLSCREEN_TIMEOUT = null,
    COUNTERS = null,
    DEPARTMENTS = null,
    TICKETS = [],
    CONFIG = null,
    QUEUE = [],
    ANNOUNCED = [];

$(document).ready(function () {
  $('body').click();

  (function () {
    $.ajax({
      url: 'config.json',
      success: function success(res) {
        if (res.stat === 'ok' && Object.keys(res.data).length) {
          // FIXME: MOCK API
          CONFIG = res.data.config;
          initializeLayout();
        }
      },
      error: function error(err) {
        console.error(err);
      }
    });
  })();

  setInterval(loadAnnouncements, 5000);
  setInterval(function () {
    console.log('ANNS IN QUEUE: ' + QUEUE.length);
    if (QUEUE.length) announce(QUEUE);else return;
  }, 3000);
  $('body').on('click', '.btn-call', function () {
    var counter_id = $(this).data('counter_id');
    $.ajax({
      url: host + 'engine/api.php?act=caller_next&counter_id=' + counter_id
    });
  });
  $('#generate_ticket').on('click', function () {
    var select = $(this).parent().find('select');
    console.log(select.val());

    if (select.val()) {
      var dept_id = select.val();
      $.ajax({
        url: host + 'engine/api.php?act=issue_ticket&dept_id=' + dept_id
      });
    } else {}
  });
  $('#clock_toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.time').parent().parent().slideToggle();
  });
  $('#ticker_toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.main-content').toggleClass('show-ticker');
  });
  $('[name="fullscreen_enabled"]').on('change', function () {// $(this).
  });
  $('#layout_config').on('submit', function (e) {
    e.preventDefault();
    $(this).serializeArray().forEach(function (x) {
      console.log(x);
    });
  });
  $('#sample_fullscreen_duration').on('change', function () {
    MODAL_TIMEOUT = parseInt($(this).val()) * 1000;
  });
  $('#sample_fullscreen').on('click', function () {
    sampleFullScreen();
  });

  function initializeLayout(data) {
    if (CONFIG['clock']) {
      var clock = CONFIG['clock'];
      $('.time').toggle(clock.enabled);
      var format = '';

      if (clock.date_format.show_dow) {
        format += clock.date_format.dow == 'short' ? 'ddd, ' : 'dddd, ';
      }

      format += clock.date_format.month == 'short' ? 'MMM ' : 'MMMM ';
      format += clock.date_format.day == 'short' ? 'D ' : 'DD ';
      format += clock.date_format.show_year ? 'Y' : '';
      format += clock.time_format.hours == 'short' ? ' h:mm' : ' hh:mm';
      format += clock.time_format.show_seconds ? ':ss ' : '';
      format += clock.time_format.show_suffix ? 'A' : '';
      setInterval(function () {
        $('.time p').text(moment().format(format));
      }, 500);
    }

    loadDepartments();
  }
}); // Ready
// FIXME: Remove when live

var host = 'http://dev.teaconcepts.net/CleverQMS/';

function loadDepartments() {
  $.ajax({
    url: host + 'engine/api.php?act=load_departments&stat=open&details=full',
    success: function success(res) {
      if (res.stat === 'ok' && res.data) {
        $('#counter_carousel .carousel-inner').html('');
        DEPARTMENTS = Object.values(res.data);
        Object.values(res.data).forEach(function (dept, key) {
          CURR = 0;
          $('#generate_ticket').parent().find('select').append("<option value=\"".concat(dept.dept_id, "\">").concat(dept.dept_name, "</option>"));
          $('#counter_carousel .carousel-inner').append("\n            <div class=\"carousel-item ".concat(key == 0 ? 'active' : '', "\">\n              <div class=\"d-flex flex-column\" data-dept_id=\"").concat(dept.dept_id, "\">\n                ").concat(DEPARTMENTS.length > 1 ? "<p class=\"dept-name tx-semibold mg-b-10 pd-10 tx-teal bg-white text-center text-uppercase\" style=\"font-size: 2.75vw\">".concat(dept.dept_name, "</p>") : '', "\n              </div>\n            </div>\n          "));
          Object.values(dept.counters).forEach(function (counter) {
            if (CURR < MAX) CURR++;else {
              $('#counter_carousel .carousel-inner').append("\n                <div class=\"carousel-item\">\n                  <div class=\"d-flex flex-column\" data-dept_id=\"".concat(dept.dept_id, "\">\n                    <p class=\"custom-rounded dept-name tx-semibold mg-b-10 pd-10 tx-teal bg-white text-center text-uppercase\" style=\"font-size: 2.75vw\">").concat(dept.dept_name, "</p>\n                  </div>\n                </div>\n              "));
              CURR = 0;
            }
            $('#horizontal .content').append("\n              <div class=\"col\">\n                <button type=\"button\" data-counter_id=\"".concat(counter.counter_id, "\" class=\"btn btn-outline-success btn-call text-uppercase\">").concat(counter.counter_id, " call next</button>\n              </div>\n            "));
            var containers = $('#counter_carousel').find("[data-dept_id=\"".concat(counter.dept_id, "\"]"));
            $(containers[containers.length - 1]).append("\n              <div class=\"custom-rounded bg-white mg-b-10\" data-counter_id=\"".concat(counter.counter_id, "\">\n                <div class=\"tx-dark\">\n                  <div class=\"row no-gutters\">\n\n                    <div class=\"col-7 text-left\">\n                      <div class=\"d-flex flex-column justify-content-around pd-y-20 pd-l-10\">\n                        <p style=\"font-size: 4vw; line-height: 4vw;\" class=\"counter-no tx-semibold mg-0\">Counter ").concat(counter.counter_no, "</p>\n                      </div>\n                    </div>\n\n                    <div class=\"col-5 text-right\">\n                      <div class=\"d-flex flex-column justify-content-around pd-y-20 pd-r-10\">\n                        <p style=\"font-size: 2.5vw; line-height: 2.5vw; display: none;\" class=\"ticket-label text-uppercase tx-semibold mg-0\">Ticket</p>\n                        <p style=\"font-size: 4vw; line-height: 4vw;\" class=\"ticket-no tx-semibold mg-0\"></p>\n                      </div>\n                    </div>\n\n                  </div>\n                </div>\n              </div>\n            "));
          });
        });
        $('#counter_carousel').carousel({
          interval: COUNTER_TIMEOUT,
          ride: 'carousel'
        });
        setInterval(loadTickets(), REFRESH_INTERVAL);
      }
    }
  });
}

function loadTickets() {
  var dept_id = ''; // FIXME: This should be dynamic

  $.ajax({
    url: host + 'engine/api.php?act=load_tickets&ds=active' + dept_id,
    success: function success(res) {
      if (res.stat === 'ok' && res.data) {
        var NEW_TICKETS = [];
        Object.values(res.data).forEach(function (ticket) {
          NEW_TICKETS.push(ticket);

          if (parseInt(ticket.counter_id) != 0) {
            var counter_card = $("[data-dept_id=\"".concat(ticket.dept_id, "\"]")).find("[data-counter_id=\"".concat(ticket.counter_id, "\"]"));
            var ticket_dom = $(counter_card).find('.ticket-no');
            ticket_dom.text(ticket.ticket_label);
          }
        });
        if (TICKETS.length == 0) TICKETS = NEW_TICKETS;
      }
    }
  });
}

function announce(queue) {
  var modal_shown = $('#announce-modal').hasClass('show');
  var data = queue[0];
  if (!data || modal_shown) return;
  console.log('do stuff'); // Already announced, removed from queue

  if (ANNOUNCED.includes(data.ann_id)) {
    QUEUE.shift();
    announce(QUEUE);
    return;
  } else {
    ANNOUNCED.push(data.ann_id); // try {
    //   // Play audio / Text-to-speech ?
    //   AUDIO.play();
    // } catch(e) {
    //   console.error(e)
    // }
    // Update counter carousel data

    var counter_card_dom = $("[data-dept_id=\"".concat(data.dept_id, "\"] [data-counter_id=\"").concat(data.counter_no, "\"]"));
    $(counter_card_dom).find('.ticket-no').text(data.ticket_label); // Update counter carousel data

    $('#ticket').text(data.ticket_label);
    $('#counter').text(data.counter_no);
    $('#announce-modal').modal('show');
    setTimeout(function () {
      console.log('setup modal close');
      $('#announce-modal').modal('hide');
      setTimeout(function () {
        QUEUE.shift();
        announce(QUEUE);
      }, 250);
    }, MODAL_TIMEOUT);
  }
}

function loadAnnouncements() {
  $.ajax({
    url: host + 'engine/api.php?act=announcements',
    success: function success(res) {
      if (res.stat === 'ok' && res.data) {
        var T_QUEUE = QUEUE.map(function (ann) {
          return ann.ann_id;
        });
        var NEW_QUEUE = Object.values(res.data).filter(function (data) {
          return !ANNOUNCED.includes(data.ann_id) || !T_QUEUE.includes(data.ann_id);
        });
        console.log(NEW_QUEUE);
        QUEUE = QUEUE.concat(NEW_QUEUE);
      }
    }
  });
}