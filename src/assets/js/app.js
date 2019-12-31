"use strict";

$(document).ready(function () {
  var AUDIO = new Audio('./assets/ding_dong.mp3'),
    MODAL_TIMEOUT = 60000,
    COUNTER_TIMEOUT = 10000,
    REFRESH_INTERVAL = 5000,
    MAX = 5,
    CURR = 0,
    FULLSCREEN_ENABLED = false,
    FULLSCREEN_TIMEOUT = null,
    COUNTERS = null,
    DEPARTMENTS = null,
    TICKETS = [],
    CONFIG = null,
    QUEUE = [],
    ANNOUNCED = [],
    CAROUSEL_PAGE = 1,
    CAROUSEL_INTERVAL_ID = null;

  function carouselScroll(page) {
    console.log('CAROUSEL SLIDE: ' + page);

    var max_pages = $('#counter_carousel').children().length - 1;
    var carousel = $('#counter_carousel').width();
    var slide = $($('#counter_carousel').children()[page - 1]);

    $('#counter_carousel .active').removeClass('active');
    $(slide).addClass('active');

    document.querySelector('.carousel-item.active').scrollIntoView();

    // Return to first slide
    if (page === max_pages) {
      CAROUSEL_PAGE = 1;
    }
  }

  rideCarousel();
  function rideCarousel() {
    console.warn('Start Carousel');
    CAROUSEL_INTERVAL_ID = setInterval(function () {
      carouselScroll(CAROUSEL_PAGE++);
    }, COUNTER_TIMEOUT);
  }

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
    } else {

    }
  });

  $('#clock_toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.time').parent().parent().slideToggle();
  });

  $('#ticker_toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.main-content').toggleClass('show-ticker');
  });

  $('[name="fullscreen_enabled"]').on('change', function () {
    // $(this).
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

  // FIXME: Remove when live
  var host = 'http://dev.teaconcepts.net/CleverQMS/';

  function loadDepartments() {
    $.ajax({
      url: host + 'engine/api.php?act=load_departments&stat=open&details=full',
      success: function success(res) {
        if (res.stat === 'ok' && res.data) {
          $('#counter_carousel').html('');
          DEPARTMENTS = Object.values(res.data);
          Object.values(res.data).forEach(function (dept, key) {
            CURR = 0;
            $('#generate_ticket').parent().find('select').append("<option value=\"".concat(dept.dept_id, "\">").concat(dept.dept_name, "</option>"));
            $('#counter_carousel').append(`
            <div class="carousel-item ${key === 0 ? 'active' : ''}">
              <div class="d-flex flex-column" data-dept_id="${dept.dept_id}">
                <div class="d-flex justify-content-between custom-rounded bg-white mg-b-10 pd-10 ht-100p">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="dept-name mg-0 tx-semibold tx-teal text-left text-uppercase">${dept.dept_name}</span>
                  </div>

                  <div class="d-flex flex-column justify-content-center">
                    <span class="tx-dark now-serving mg-0 tx-semibold text-center text-uppercase">Now Serving</span>
                  </div>
                </div>
              </div>
            </div>
          `);

            Object.values(dept.counters).forEach(function (counter) {
              if (CURR < MAX) {
                CURR++;
              } else {
                $('#counter_carousel').append(`
                <div class="carousel-item">
                  <div class="d-flex flex-column" data-dept_id="${dept.dept_id}">
                    <div class="d-flex justify-content-between custom-rounded bg-white mg-b-10 pd-10 ht-100p">
                      <div class="d-flex flex-column justify-content-center">
                        <span class="dept-name mg-0 tx-semibold tx-teal text-left text-uppercase">${dept.dept_name}</span>
                      </div>

                      <div class="d-flex flex-column justify-content-center">
                        <span class="tx-dark now-serving mg-0 tx-semibold text-center text-uppercase">Now Serving</span>
                      </div>
                    </div>
                  </div>
                </div>
              `);
                CURR = 0;
              }
              $('#horizontal .content').append("\n              <div class=\"col\">\n                <button type=\"button\" data-counter_id=\"".concat(counter.counter_id, "\" class=\"btn btn-outline-success btn-call text-uppercase\">").concat(counter.counter_id, " call next</button>\n              </div>\n            "));
              var containers = $('#counter_carousel').find("[data-dept_id=\"".concat(counter.dept_id, "\"]"));
              $(containers[containers.length - 1]).append(`
              <div class="custom-rounded bg-white mg-b-10" data-counter_id="${counter.counter_id}">
                <div class="tx-dark">
                  <div class="row no-gutters">

                    <div class="col-7 text-left">
                      <div class="d-flex flex-column justify-content-center ht-100p pd-10">
                        <p class="counter-no tx-semibold text-uppercase mg-0">Counter ${counter.counter_no}</p>
                      </div>
                    </div>

                    <div class="col-5 text-right">
                      <div class="d-flex justify-content-end ht-100p">
                        <span class="custom-rounded bg-teal ticket-no tx-semibold pd-10 mg-y-10 mg-r-10 tx-white">
                          <span style="opacity: 0">S-001</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            `);
            });
          });

          // $('#counter_carousel').carousel({
          //   interval: COUNTER_TIMEOUT,
          //   ride: 'carousel'
          // });

          setInterval(function () {
            loadTickets();
          }, 3000);
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
    // Stop sliding for now
    clearInterval(CAROUSEL_INTERVAL_ID);

    var modal_shown = $('#announce-modal').hasClass('show');
    var data = queue[0];

    if (!data || modal_shown) return;

    // Already announced, removed from queue
    if (ANNOUNCED.includes(data.ann_id)) {
      QUEUE.shift();
      announce(QUEUE);
      return;
    } else {
      ANNOUNCED.push(data.ann_id);

      AUDIO.play();
      setTimeout(function () {
        speak(data.message);
      }, 500);

      var slide_dom = $('#counter_carousel [data-counter_id="' + data.counter_no + '"]').closest('.carousel-item');
      CAROUSEL_PAGE = $(slide_dom).index() + 1;

      $('#ticket').text(data.ticket_label);
      $('#counter').text(data.counter_no);
      $('#announce-modal').modal('show');

      setTimeout(function () {
        console.log('Remove Announcement from queue');
        $('#announce-modal').modal('hide');

        // Go to announced counter's page
        carouselScroll(CAROUSEL_PAGE);
        
        setTimeout(function () {
          QUEUE.shift();
          announce(QUEUE);

          // Restart sliding
          rideCarousel();
        }, 500);
      }, 5000);
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

          QUEUE = QUEUE.concat(NEW_QUEUE);
        }
      }
    });
  }
}); // Ready