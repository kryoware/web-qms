'use strict';

var JSPlugin = new function () {
  this.printTicket = function (jsonString) {
    JSBridgePlugin.printTicket(jsonString);
  };
}();
$(document).ready(function () {
  var CONFIG = null,
      ANDROID_TICKET = {},
      DEPARTMENTS = null,
      SELECTED_DEPT = null,
      NEW_TICKET = false,
      API_KEY = null,
      ticker_msg = null;

  (function () {
    API_KEY = gup('ak');
    callApi('load_settings', {
      ak: API_KEY
    }, function (res) {
      if (res.stat === 'ok' && res.data) {
        Object.keys(res.data).forEach(function (key) {
          var data = res.data[key];

          switch (key) {
            case 'company':
              $('.company-name').text(data);
              $('#ticket_company_name').text(data);
              break;

            case 'kiosk_welcome_msg':
              var strings = data.split('. '); // Removed period

              $('.welcome-msg').text(strings[0]); // Slice to remove period

              $('.instruction-msg').text(strings[1].slice(0, -1));
              break;

            case 'kiosk_ticket_msg':
              $('.ticket-msg').text(data);
              break;

            case 'ticker_msg':
              ticker_msg = data;
              break;

            case 'ticker_color':
              break;
          }
        });
        $.ajax({
          url: 'config_kiosk.json',
          success: function success(res) {
            if (res.stat === 'ok' && res.data) {
              CONFIG = res.data.config;
              callApi('load_departments', {
                stat: 'open',
                details: 'full',
                ak: API_KEY
              }, function (res) {
                if (res.stat === 'ok' && res.data) {
                  DEPARTMENTS = Object.values(res.data);
                  initializeLayout();
                }
              });
            }
          }
        });
      }
    });
  })();

  $('#departments .btn-prev').on('click', function () {
    $('#dept_slides').carousel('prev');
  });
  $('#departments .btn-next').on('click', function () {
    $('#dept_slides').carousel('next');
  });
  $('body').on('click', '.kiosk-dept-wrap', function () {
    SELECTED_DEPT = $(this).data('dept_id');
    callApi('issue_ticket', {
      dept_id: SELECTED_DEPT,
      ak: API_KEY
    }, function (res) {
      if (res.stat === 'ok' && res.data) {
        NEW_TICKET = res.data.ticket_no; // Load Tickets

        callApi('load_tickets', {
          ds: 'active',
          ak: API_KEY,
          dept_id: SELECTED_DEPT
        }, function (res) {
          var TICKET_OBJECT = Object.values(res.data).filter(function (ticket) {
            return parseInt(ticket.ticket_no) === parseInt(NEW_TICKET);
          });
          var TICKET_SERVED = Object.values(res.data).filter(function (ticket) {
            return parseInt(ticket.ticket_no) != NEW_TICKET && parseInt(ticket.counter_id) != 0;
          }).sort(function (a, b) {
            return new Date(a.dt_served) - new Date(b.dt_served);
          });

          if (TICKET_OBJECT.length > 0) {
            TICKET_OBJECT = TICKET_OBJECT[0];
            var date = moment().format('DD-MM-Y');
            var time = moment().format('hh:mm:ss A');
            $('#confirm-modal .ticket').text(TICKET_OBJECT.ticket_label);
            $('#ticket_logo').html('');
            $('#ticket_no').text(TICKET_OBJECT.ticket_label);
            $('#ticket_date').text(date);
            $('#ticket_time').text(time);
            $('#ticket_serving').parent().hide();

            if (TICKET_SERVED.length) {
              $('#ticket_serving').parent().show();
              $('#ticket_serving').text(TICKET_SERVED[0].ticket_label);
            } else {
              $('#ticket_serving').parent().hide();
            }

            $('#ticket_customers').text(Object.values(res.data).length - 1);
            $('#confirm-modal').modal('show');
            ANDROID_TICKET = {
              date: date,
              time: time,
              ticket_no: TICKET_OBJECT.ticket_label,
              served: TICKET_SERVED.length ? TICKET_SERVED[0] : {},
              company_name: $('#ticket_company_name').text(),
              customers: $('#ticket_customers').text()
            };
            setTimeout(printTicket, 2000);
            setTimeout(function () {
              $('#confirm-modal').modal('hide');
            }, 4000);
          } else {
            console.error('TICKET NOT FOUND');
          }
        });
      }
    });
  });
  $('#confirm-modal').on('show.bs.modal', function () {
    setTimeout(function () {
      $('#confirm-modal .modal-body').fadeIn();
    }, 500);
  });
  $('#confirm-modal').on('hide.bs.modal', function () {
    $('#confirm-modal .modal-body').hide();
  });

  function printTicket() {
    var logo = $('.branding .img-fluid').clone();

    if (typeof JSBridgePlugin === 'undefined') {
      $(logo).addClass('wd-300');
      $(logo).addClass('ht-300');
      $('#ticket_logo').append(logo);
      setTimeout(function () {
        window.print();
      }, 250);
    } else {
      JSPlugin.printTicket(JSON.stringify(ANDROID_TICKET));
    }

    return false;
  }

  function initializeLayout() {
    if (CONFIG.layout) {
      if (CONFIG.layout.type === 'grid') {
        var css = '';

        if (CONFIG.layout.grid_columns) {
          css = 'col-'.concat(12 / CONFIG.layout.grid_columns);

          if (DEPARTMENTS.length > CONFIG.layout.grid_columns) {
            css += ' mg-b-25';
          }
        } else {
          if (DEPARTMENTS.length <= 3) {
            css = 'col-12';
          } else if (DEPARTMENTS.length <= 6) {
            css = 'col-6';
          } else {
            css = 'col-4';
          }
        }

        DEPARTMENTS.forEach(function (dept, key) {
          if (dept.counters) {
            $('#grid-wrap').append("\n              <div class=\"".concat(css, "\">\n                <div class=\"kiosk-dept-wrap custom-rounded bg-custom tx-white\" data-dept_id=\"").concat(dept.dept_id, "\">\n                  <div class=\"d-flex flex-column justify-content-center ht-100p\">\n                    <p class=\"text-center mg-0 text-uppercase kiosk-dept-name\">").concat(dept.dept_name, "</p>\n                  </div>\n                </div>\n              </div>\n            "));
          }
        });
      } else if (CONFIG.layout.type === 'slides') {
        $('#carousel-wrap').removeClass('d-none');
        $('#carousel-wrap').addClass('d-flex');
        $('#carousel-wrap .flex-grow-1').append("\n          <div id=\"dept_slides\" class=\"carousel slide wd-95p\">\n            <div class=\"carousel-inner\">\n            </div>\n          </div>\n        ");
        DEPARTMENTS.forEach(function (dept, key) {
          if (dept.counters) {
            $('#dept_slides .carousel-inner').append("\n              <div class=\"carousel-item ".concat(key === 0 ? 'active' : '', "\">\n                <div class=\"kiosk-dept-wrap custom-rounded bg-custom tx-white mg-x-25\">\n                  <div class=\"d-flex flex-column justify-content-center ht-100p\">\n                    <p class=\"text-center mg-0 text-uppercase kiosk-dept-name\">").concat(dept.dept_name, "</p>\n                  </div>\n                </div>\n              </div>\n            "));
          }
        });
        $('#dept_slides').carousel({
          interval: false,
          wrap: true
        });
      }
    }

    if (CONFIG.show_company_name === true) {
      $('.company-name-wrap').removeClass('d-none').addClass('d-flex');
    }

    if (CONFIG.slideshow_enabled === true) {
      $('#bg_slideshow').fadeIn(function () {
        CONFIG.slideshow_images.forEach(function (image, key) {
          $('#bg_slideshow .carousel-inner').append("\n            <div class=\"carousel-item ".concat(key === 0 ? 'active' : '', "\">\n              <div class=\"ht-100p wd-100p\">\n                <img src=\"").concat(image, "\" class=\"img-fluid\">\n              </div>\n            </div>\n          "));
        });
        $('#bg_slideshow').carousel({
          interval: parseFloat(CONFIG.slide_bg) * 1000
        });
      });
    }

    if (CONFIG['show_ticker'] === true) {
      $('#ticker').addClass(CONFIG.ticker_location === 'header' ? 'order-0' : 'order-12');
      $('#ticker').toggle();
      $('#ticker').append("<div class=\"marquee\">".concat(ticker_msg, "</div>"));
      setTimeout(function () {
        $('body').find('.marquee').marquee({
          duration: 15000
        });
      }, 500);
    }

    $('.branding-wrap').addClass(CONFIG.branding_location === 'header' ? 'order-0' : 'order-12');
    $('.welcome-card').toggleClass('mg-t-20', CONFIG.branding_location === 'footer');
    $('.welcome-card').toggleClass('mg-b-20', CONFIG.branding_location === 'header');

    if (CONFIG.show_logo === true) {
      $('.branding').fadeIn();

      if (CONFIG.clock.enabled === true) {} else {
        var css = '';

        switch (CONFIG.logo_location) {
          case 'center':
            css = 'mx-auto';
            break;

          case 'right':
            css = 'ml-auto';
            break;

          case 'left':
            css = 'mr-auto';
            break;
        }

        $('.branding').addClass(css);
        $('.branding-wrap').removeClass('custom-rounded');
        $('.branding-wrap').css({
          'margin-top': '0px',
          'margin-right': '0px',
          'margin-left': '0px'
        });
      }
    }

    if (CONFIG.clock) {
      var clock = CONFIG.clock;
      $('.time').fadeIn();

      if (clock.enabled) {
        if (CONFIG.show_logo === false) {
          $('.branding-wrap').addClass('ml-auto');
          $('.branding-wrap').css('width', 'fit-content');
        }

        var format = ''; // if (clock.date_format.show_dow) {
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
  }
}); // READY