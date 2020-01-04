var host = 'http://dev.teaconcepts.net/CleverQMS/';
var CONFIG = null;
var DEPARTMENTS = null;
var SELECTED_DEPT = null;
var IS_FULLSCREEN = false;
var NEW_TICKET = false;

$(document).ready(function () {
  
  (function () {
    $.ajax({
      url: 'config_kiosk.json',
      success: function (res) {
        if (res.stat === 'ok' && res.data) {
          CONFIG = res.data.config;
    
          $.ajax({
            url: host + 'engine/api.php?act=load_departments&stat=open&details=full',
            success: function (res) {
              if (res.stat === 'ok' && res.data) {
                DEPARTMENTS = Object.values(res.data);

                initializeLayout();
              }
            }
          });
        }
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
    SELECTED_DEPT = $(this).data('dept_id')
    // var dept = DEPARTMENTS.filter(function (dept) {
    //   return parseInt(dept.dept_id) == parseInt(SELECTED_DEPT);
    // })[0];

    // Create Ticket
    $.ajax({
      url: host + 'engine/api.php?act=issue_ticket&dept_id=' + SELECTED_DEPT,
      success: function(res) {
        // Load Tickets
        $.ajax({
          url: host + 'engine/api.php?act=load_tickets&ds=active&dept_id=' + SELECTED_DEPT,
          success: function(res) {
            NEW_TICKET = res.data.ticket_no;

            var t = Object.values(res.data).filter(function(ticket) {
              return parseInt(ticket.ticket_no) === parseInt(NEW_TICKET);
            });

            console.log(t)

            $('#confirm-modal').find('').text(t.ticket_label)

            $('#confirm-modal').modal('show');
            
            setTimeout(function () {
              $('#confirm-modal').modal('hide');
            }, 3000)
          }
        })
      }
    });
  });

  function initializeLayout() {
    if (CONFIG.layout) {
      if (CONFIG.layout.type === 'grid') {
        var css = '';
        if (CONFIG.layout.grid_columns) {
          css = 'col-'.concat(12 / CONFIG.layout.grid_columns);

          if (DEPARTMENTS.length > CONFIG.layout.grid_columns) {
            css += ' mg-y-15';
          }
        } else {
          css = 'col'; // auto
        }
        css += ' mg-y-15';

        DEPARTMENTS.forEach(function (dept, key) {
          $('#grid-wrap').append(`
            <div class="${css}">
              <div class="kiosk-dept-wrap custom-rounded bg-teal tx-white" data-dept_id="${dept.dept_id}">
                <div class="d-flex flex-column justify-content-center ht-100p">
                  <p class="text-center mg-0 text-uppercase kiosk-dept-name">${dept.dept_name}</p>
                </div>
              </div>
            </div>
          `);
        });
      } else if (CONFIG.layout.type === 'slides') {
        $('#carousel-wrap').removeClass('d-none');
        $('#carousel-wrap').addClass('d-flex');

        $('#carousel-wrap .flex-grow-1').append(`
          <div id="dept_slides" class="carousel slide wd-95p">
            <div class="carousel-inner">
            </div>
          </div>
        `);

        DEPARTMENTS.forEach(function (dept, key) {
          $('#dept_slides .carousel-inner').append(`
            <div class="carousel-item ${key === 0 ? 'active' : ''}">
              <div class="kiosk-dept-wrap custom-rounded
 bg-teal tx-white mg-x-25">
                <div class="d-flex flex-column justify-content-center ht-100p">
                  <p class="text-center mg-0 text-uppercase kiosk-dept-name">${dept.dept_name}</p>
                </div>
              </div>
            </div>
          `);
        });

        $('#dept_slides').carousel({ interval: false, wrap: true });
      }
    }

    if (CONFIG.slideshow_enabled === true) {
      $('#bg_slideshow').fadeIn(function() {
        CONFIG.slideshow_images.forEach(function (image, key) {
          $('#bg_slideshow .carousel-inner').append(`
            <div class="carousel-item ${key === 0 ? 'active' : ''}">
              <div class="ht-100p wd-100p">
                <img src="${image}" class="img-fluid">
              </div>
            </div>
          `);
        });

        $('#bg_slideshow').carousel({
          interval: parseFloat(CONFIG.slide_bg) * 1000
        });
      });
    }

    
    if (CONFIG['show_ticker'] === true) {
      $('#ticker').addClass(CONFIG.ticker_location === 'header' ? 'order-0' : 'order-12' );
      $('#ticker').toggle();
      $('#ticker').append(`
        <marquee class="ticker">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          porttitor hendrerit placerat. Donec pretium, felis congue semper fringilla, quam massa egestas arcu, vel rutrum
          risus ex sed odio</marquee>
      `);
    }
    
    $('.branding-wrap').addClass(CONFIG.branding_location === 'header' ? 'order-0' : 'order-12' );
    $('.welcome-card').toggleClass('mg-t-20',CONFIG.branding_location === 'footer');

    if (CONFIG.show_logo === true) {
      $('.branding').fadeIn();

      if (CONFIG.clock.enabled === true) {


      } else {
        var css = ''

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

        $('.branding').addClass(css)
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

        var format = '';

        if (clock.date_format.show_dow) {
          format += clock.date_format.dow == 'short' ? 'ddd, ' : 'dddd, ';
        }

        format += clock.date_format.month == 'short' ? 'MMM ' : 'MMMM ';
        format += clock.date_format.day == 'short' ? 'D ' : 'DD ';
        format += clock.date_format.show_year ? 'Y' : '';
        format += clock.time_format.hours == 'short' ? ' h:mm' : ' hh:mm';
        format += clock.time_format.show_seconds ? ':ss ' : '';
        format += clock.time_format.show_suffix ? ' A' : '';
        setInterval(function () {
          $('.time p').text(moment().format(format));
        }, 500);
      }
    }
  }
  
  $('body').on('click', '.btn-dept', function () {
    $('#departments .active').removeClass('active');
    $(this).addClass('active');
    
    var dept = $(this).html();
    SELECTED_DEPT = $(this).data('dept_id');
    
    $('.welcome-card').css('height', '40vh');
    
    $('h1').fadeOut(function () {
      $('h1').text('In Queue: ' + dept);
    })
    
    $('h3').fadeOut(function () {
      $('h3').text('');
    });

    $('#departments').fadeOut(function () {
      $('h1').fadeIn();
      $('h3').fadeIn();
      $('#actions').fadeIn();
    });
  });
  
  
  $('body').on('click', '.btn-back', function () {
    $('.welcome-card').css('height', '50vh');
    
    $('h1').fadeOut(function () {
      $('h1').text('Welcome');
    })
    
    $('h3').fadeOut(function () {
      $('h3').text('What can we help you with today?');
    });
    
    $('#actions').fadeOut(function () {
      $('h1').fadeIn();
      $('h3').fadeIn();
      $('#departments').fadeIn();
    });
  });

  $('body').on('click', '.btn-print', function () {
  });
  
  $('#confirm-modal').on('show.bs.modal', function () {
    setTimeout(function () {
      $('#confirm-modal .modal-body').fadeIn();
    }, 500);
  });

  $('#confirm-modal').on('hide.bs.modal', function () {
    $('#confirm-modal .modal-body').hide();
  });
}); // READY