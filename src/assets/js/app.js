'use strict';

$(document).ready(function () {
  var AUDIO = new Audio('./assets/ding_dong.mp3'),
  TICKET_INTERVAL = null,
  ANNOUNCEMENT_INTERVAL = null,
  SLIDE_INTERVAL = null,
  IMAGE_INTERVAL = null,
  VIDEO_INTERVAL = null,
  MAX_COUNTERS = 5,
  CURR = 0,
  FULLSCREEN_ENABLED = false,
  FULLSCREEN_TIMEOUT = null,
  COUNTERS = null,
  DEPARTMENTS = null,
  TICKETS = [],
  CONFIG = null,
  QUEUE = [],
  ANNOUNCED = [],
  CAROUSEL_PAGE = 2,
  CAROUSEL_INTERVAL_ID = null,
  ticker_msg = null;

  (function () {

    callApi('load_settings', {}, function (res) {
      if (res.stat === 'ok' && res.data) {
        Object.keys(res.data).forEach(function (key) {
          var data = res.data[key];

          switch (key) {
            case 'company':
              $('.company-name').text(data);
              break;

            case 'ticker_msg':
              ticker_msg = data;
              break;
          }
        });

        $.ajax({
          url: 'config.json',
          success: function success(res) {
            if (res.stat === 'ok' && Object.keys(res.data).length) {
              // FIXME: MOCK API
              CONFIG = res.data.config;
    
              ANNOUNCEMENT_INTERVAL = parseFloat(CONFIG['load_announcements']) * 1000;
              TICKET_INTERVAL = parseFloat(CONFIG['load_ticket']) * 1000;
              SLIDE_INTERVAL = parseFloat(CONFIG['slide_dept']) * 1000;
              IMAGE_INTERVAL = parseFloat(CONFIG['slide_image']) * 1000;
              VIDEO_INTERVAL = parseFloat(CONFIG['slide_video']) * 1000;
    
              initializeLayout();
            }
          },
          error: function error(err) {
            console.error(err);
          }
        });
      }
    });
  })();

  // FIXME: Remove when live
  var host = 'http://dev.teaconcepts.net/CleverQMS/';

  function initializeLayout(data) {
    $('.main-content').toggleClass('show-ticker', CONFIG['show_ticker'] === true);

    if (CONFIG['show_ticker'] === true) {
      $('#ticker').toggle();
      $('#ticker').append(`<marquee style="line-height: 10vh; font-size: 7vh;">${ticker_msg}</marquee>`);
    }

    if (CONFIG['show_logo'] === true || CONFIG['clock'].enabled) {
      $('#header').show();
      $('.main-content').addClass('show-header');
    } else if (CONFIG['show_logo'] === false && CONFIG['clock'].enabled === false) {
      $('#header').hide();
      $('.main-content').removeClass('show-header');
    }

    if (CONFIG.show_logo === true) {
      $('.brand-wrap').removeClass('d-none').addClass('d-flex');
    }

    if (CONFIG.show_company_name === true) {
      $('.company-name-wrap').removeClass('d-none').addClass('d-flex');
    }

    if (CONFIG['clock']) {
      var clock = CONFIG['clock'];
      $('.time').toggle(clock.enabled);

      if (clock.enabled) {
        var format = '';

        // if (clock.date_format.show_dow) {
        //   format += clock.date_format.dow == 'short' ? 'ddd, ' : 'dddd, ';
        // }

        // format += clock.date_format.month == 'short' ? 'MMM ' : 'MMMM ';
        // format += clock.date_format.day == 'short' ? 'D ' : 'DD ';
        // format += clock.date_format.show_year ? 'Y' : '';
        format += clock.time_format.hours == 'short' ? ' h:mm' : ' hh:mm';
        format += clock.time_format.show_seconds ? ':ss ' : '';
        format += clock.time_format.show_suffix ? ' A' : '';
        setInterval(function () {
          $('.time p').text(moment().format(format));
        }, 500);
      }
    }
  
    (function () {
      loadDepartments();
      rideCarousel();
    })();

    setInterval(loadAnnouncements, ANNOUNCEMENT_INTERVAL);
    setInterval(function () {
      console.log('ANNS IN QUEUE: ' + QUEUE.length);
      if (QUEUE.length) announce(QUEUE);else return;
    }, ANNOUNCEMENT_INTERVAL / 2);
  }

  function speak(message) {
    var msg = new SpeechSynthesisUtterance(message);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    window.speechSynthesis.speak(msg);
  }

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
                    <span class="dept-name mg-0 tx-semibold tx-custom text-left text-wrap text-uppercase">${dept.dept_name}</span>
                  </div>

                  <div class="d-flex flex-column justify-content-center">
                    <span class="tx-dark now-serving mg-0 tx-semibold text-center text-uppercase">Now Serving</span>
                  </div>
                </div>
              </div>
            </div>
          `);

            Object.values(dept.counters).forEach(function (counter) {
              if (CURR < MAX_COUNTERS) {
                CURR++;
              } else {
                $('#counter_carousel').append(`
                <div class="carousel-item">
                  <div class="d-flex flex-column" data-dept_id="${dept.dept_id}">
                    <div class="d-flex justify-content-between custom-rounded bg-white mg-b-10 pd-10 ht-100p">
                      <div class="d-flex flex-column justify-content-center">
                        <span class="dept-name mg-0 tx-semibold tx-custom text-left text-wrap text-uppercase">${dept.dept_name}</span>
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

              var containers = $('#counter_carousel').find("[data-dept_id=\"".concat(counter.dept_id, "\"]"));
              $(containers[containers.length - 1]).append(`
              <div class="custom-rounded bg-white mg-b-10" data-counter_id="${counter.counter_id}" data-counter_no="${counter.counter_no}">
                <div class="tx-dark">
                  <div class="row no-gutters">

                    <div class="col-7 text-left">
                      <div class="d-flex flex-column justify-content-center ht-100p pd-10">
                        <p class="counter-no tx-semibold text-uppercase mg-0">Counter ${counter.counter_no}</p>
                      </div>
                    </div>

                    <div class="col-5 text-right">
                      <div class="d-flex justify-content-end ht-100p">
                        <span class="custom-rounded bg-custom ticket-no tx-semibold pd-10 mg-y-10 mg-r-10 tx-white">
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

          setInterval(function () {
            loadTickets();
          }, TICKET_INTERVAL);
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

      clearInterval(CAROUSEL_INTERVAL_ID)
      var slide_dom = $('#counter_carousel [data-dept_id="' + data.dept_id + '"] [data-counter_no="' + data.counter_no + '"]').closest('.carousel-item');

      // Add blinking effect
      $('#counter_carousel [data-dept_id="' + data.dept_id + '"] [data-counter_no="' + data.counter_no + '"]').find('.ticket-no').addClass('blink')
      $('#counter_carousel [data-dept_id="' + data.dept_id + '"] [data-counter_no="' + data.counter_no + '"]').find('.counter-no').addClass('blink')

      setTimeout(function () {
        $('#counter_carousel [data-dept_id="' + data.dept_id + '"] [data-counter_no="' + data.counter_no + '"]').find('.ticket-no').removeClass('blink')
        $('#counter_carousel [data-dept_id="' + data.dept_id + '"] [data-counter_no="' + data.counter_no + '"]').find('.counter-no').removeClass('blink')
      }, 13000)

      CAROUSEL_PAGE = $(slide_dom).index() + 1;

      $('#ticket').text(data.ticket_label);
      $('#counter').text(data.counter_no);
      $('#announce-modal').modal('show');

      setTimeout(function () {
        $('#announce-modal').modal('hide');

        setTimeout(function () {
          QUEUE.shift();
          announce(QUEUE);
        }, 500);
      }, 10000);
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

  function carouselScroll(page) {
    var  max_pages = $('#counter_carousel').children().length;
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

  function rideCarousel() {
    console.log('start carousel')
    CAROUSEL_INTERVAL_ID = setInterval(function () {
      carouselScroll(CAROUSEL_PAGE++);
    }, SLIDE_INTERVAL);
  }
}); // Ready