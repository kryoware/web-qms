<?php
error_reporting("all");
$dir_level = 1;
require_once('../_ini.php');
require("../_template_parts.php");
require("../_template_parts.php");

$page_title = "";
$content_title = "$page_title";
$crumbs_title = "$page_title";

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>

  <?php echo "$_template_head"; ?>
  <title><?php echo "$page_title"; ?></title>
  <link rel="stylesheet" href="assets/css/app.css">
  <link rel="stylesheet" href="assets/css/display.css">
  <link rel="stylesheet" href="assets/css/display-2.css">
</head>
<body>
  <div aria-hidden="true" aria-labelledby="announceModalLabel" class="modal fade effect-scale" data-backdrop="static" id="announce-modal" role="dialog" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body mg-0 pd-0">
          <div class="row no-gutters ht-100p">
            <div class="col-6 bg-custom ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-white tx-uppercase tx-center">
                  <h4>Ticket #</h4>
                  <h1 id="ticket"></h1>
                </div>
              </div>
            </div>
            <div class="col-6 tx-custom ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-uppercase tx-center">
                  <h4>Counter</h4>
                  <h1 id="counter"></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid pd-0">
    <div class="row no-gutters bg-white" id="header">
      <div class="d-flex wd-100p">
        <div class="d-flex flex-column justify-content-center pd-l-10">
          <div class="d-flex ht-100p">
            <div class="d-none flex-column justify-content-center brand-wrap">
              <div class="slim-logo mg-0"><img class="pd-y-10" src="../assets/company_logo.png"></div>
            </div>
            <div class="d-none flex-column justify-content-center ht-100p company-name-wrap">
              <p class="mg-0 mg-l-10 company-name tx-dark tx-semibold"></p>
            </div>
          </div>
        </div>
        <div class="ml-auto time ht-100p" style="display: none;">
          <div class="d-flex flex-column justify-content-center tx-dark tx-semibold ht-100p pd-10">
            <p class="mg-0"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex main-content">
      <div class="d-flex flex-column wd-55p bg-custom" id="vertical">
        <div class="row pd-x-30 pd-t-15">


          <!-- <div class="col">
            <div id="counter_carousel"></div>
          </div> -->
        </div>
      </div>

      <div class="d-flex flex-column wd-45p">
        <div class="row no-gutters" id="large">
          <div class="col ht-100p d-flex carousel-wrap bg-custom">
            <div class="media-wrap"></div>
            <!-- <div class="carousel slide" data-ride="carousel" id="media">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item" data-interval="10000">
                  <div><img class="img-fluid" src="./assets/media_1.jpg"></div>
                </div>
                <div class="carousel-item" data-interval="10000">
                  <div><img class="img-fluid" src="./assets/media_2.jpg"></div>
                </div>
                <div class="carousel-item active" data-interval="10000">
                  <div><img class="img-fluid" src="./assets/media_3.jpg"></div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="row pd-x-15" id="horizontal_">
        </div>
      </div>
    </div>
    <div class="row no-gutters bg-custom tx-white" id="ticker" style="display: none;"></div>
  </div>

  <div aria-hidden="true" aria-labelledby="announceModalLabel" class="modal fade effect-scale" data-backdrop="static" id="announce-modal" role="dialog" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body mg-0 pd-0">
          <div class="row no-gutters ht-100p">
            <div class="col-6 bg-custom ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-white tx-uppercase tx-center">
                  <h4>Ticket #</h4>
                  <h1 id="ticket"></h1>
                </div>
              </div>
            </div>
            <div class="col-6 tx-custom ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-uppercase tx-center">
                  <h4>Counter</h4>
                  <h1 id="counter"></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>


  <script src="assets/js/marquee.min.js" type="text/javascript"></script>
  <script src="assets/js/utils.js?v=<?php echo microtime() ?>"></script>
  <script>
    var videoFallback = null;

    function onVideoEnded() {
      next();
    }
    function onVideoPaused() {
      next();
    }

    function start() {
      var active = $('.media-wrap .active');
      var isImage = $('.media-wrap .active').find('img').length != 0;
      var isVideo = $('.media-wrap .active').find('video').length != 0;

      var ttl = parseInt($(active).data('ttl')) * 1000;

      // check if image
      if (isImage) {

        setTimeout(function () {
          $(active).fadeOut(function () {
            next();
          });
        }, ttl);
      }

      // check if video
      if (isVideo) {
        ttl += 1000;

        // play video
        $(active).find('button').click();

        videoFallback = setTimeout(function () {
          // pause video
          $(active).find('button').click();
        }, ttl);
      }
    }

    function next() {
      var totalSlides = $('.media-wrap').children().length;
      var activeIndex = $('.media-wrap .active').index();
      var thisSlide = $('.media-wrap').children()[activeIndex];
      var nextSlide = null;

      if (activeIndex + 1 === totalSlides) {
        nextSlide = $('.media-wrap').children()[0];
      } else {
        nextSlide = $('.media-wrap').children()[activeIndex + 1];
      }

      $(thisSlide).removeClass('active').fadeOut(function () {
        $(nextSlide).addClass('active').fadeIn();
      });

      var isImage = $(nextSlide).find('img');
      var ttl = parseInt($(nextSlide).data('ttl')) * 1000;

      if (isImage.length) {
        setTimeout(function () {
          $(nextSlide).fadeOut(function () {
            next();
          });
        }, ttl);
      } else {
        ttl += 1000;

        // play video
        $(nextSlide).find('button').click();
        
        videoFallback = setTimeout(function () {
          // pause video
          $(nextSlide).find('button').click();
        }, ttl)
      }
    }

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
        COLUMNS = 3,
        ticker_msg = null;

      (function () {
        callApi('load_ads', {}, function (res) {
          if (res.stat === 'ok') {
            Object.values(res.data).forEach(function (m, key) {
              if (m.type === 'image') {
                $('.media-wrap').append(`
                  <div id="${key}" data-ttl="${m.ttl}" class="media ${key === 0 ? 'active' : ''}" ${key === 0 ? '' : 'style="display: none"'}>
                    <img class="img-fluid" src="../assets/ads/${m.filename}" />
                  <\/div>
                `);
              }

              if (m.type === 'video') {
                $('.media-wrap').append(`
                  <div id="${key}" data-ttl="${m.ttl}" class="media ${key === 0 ? 'active' : ''}" ${key === 0 ? '' : 'style="display: none"'}>
                    <video class="img-fluid" src="../assets/ads/${m.filename}" onended="onVideoEnded()" onpause="onVideoPaused()"><\/video>
                    <button type="button" style="display: none" />
                  <\/div>
                `);
              }
            });

            start();
          }
        });

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
      
      $('body').on('click', '.media-wrap button', function () {
        var video = $(this).parent().find('video').get(0);
        
        if (video.currentTime != 0) {
          clearTimeout(videoFallback);
          
          video.pause();
          video.currentTime = 0;
        } else {
          video.play();
        }
      });

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
          }, 300);

          // Add blinking effect
          $('[data-counter_no="' + data.counter_no + '"]').find('.ticket-no').addClass('blink');
          $('[data-counter_no="' + data.counter_no + '"]').find('.counter-no').addClass('blink');

          setTimeout(function () {
            $('[data-counter_no="' + data.counter_no + '"]').find('.ticket-no').removeClass('blink');
            $('[data-counter_no="' + data.counter_no + '"]').find('.counter-no').removeClass('blink');
          }, 20000)

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

      function speak(message) {
        var msg = new SpeechSynthesisUtterance(message);
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[0];
        window.speechSynthesis.speak(msg);
      }

      function loadDepartments() {
        callApi('load_departments', { stat: 'open', details: 'full' }, function (res) {
          if (res.stat === 'ok' && res.data) {
            Object.values(res.data).forEach(function (dept, key) {
              Object.values(dept.counters).forEach(function (counter) {
                $('#vertical .row').append(`
                  <div class="col-${12 / COLUMNS}">
                    <div class="bg-white custom-rounded pd-y-10 pd-x-20 ht-100p counter-card d-flex flex-column" data-counter_id="${counter.counter_id}" data-counter_no="${counter.counter_no}">

                      <p class="counter-no tx-dark text-center tx-semibold text-uppercase mg-0">Counter ${counter.counter_no}</p>

                      <div class="d-flex flex-column justify-content-center flex-grow-1">
                        <span class="custom-rounded bg-custom ticket-no tx-semibold pd-10 mx-auto mt-auto tx-white">
                          <span style="opacity: 0">S-001</span>
                        </span>
                      </div>
                    </div>
                  </div>
                `)
              });
            });

            setInterval(function () {
              loadTickets();
            }, TICKET_INTERVAL);
          }
        })
      }

      function loadAnnouncements() {
        callApi('announcements', {}, function (res) {
          if (res.stat === 'ok' && res.data) {
            var T_QUEUE = QUEUE.map(function (ann) {
              return ann.ann_id;
            });

            var NEW_QUEUE = Object.values(res.data).filter(function (data) {
              return !ANNOUNCED.includes(data.ann_id) || !T_QUEUE.includes(data.ann_id);
            });

            QUEUE = QUEUE.concat(NEW_QUEUE);
          }
        });
      }

      function loadTickets() {
        callApi('load_tickets', { ds: 'active' },  function (res) {
          if (res.stat === 'ok' && res.data) {
            var NEW_TICKETS = [];
            Object.values(res.data).forEach(function (ticket) {
              NEW_TICKETS.push(ticket);

              if (parseInt(ticket.counter_id) != 0) {
                var counter_card = $("[data-counter_id=\"".concat(ticket.counter_id, "\"]"));
                var ticket_dom = $(counter_card).find('.ticket-no');
                ticket_dom.text(ticket.ticket_label);
              }
            });

            if (TICKETS.length == 0) TICKETS = NEW_TICKETS;
          }
        });
      }

      function initializeLayout(data) {
        $('.main-content').toggleClass('show-ticker', CONFIG['show_ticker'] === true);

        if (CONFIG['show_ticker'] === true) {
          $('#ticker').toggle();
          $('#ticker').append(`<div class="marquee">${ticker_msg}</div>`);

          setTimeout(() => {
            $('body').find('.marquee').marquee({ duration: 15000 });
          }, 500);
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
        })();

        setInterval(loadAnnouncements, ANNOUNCEMENT_INTERVAL);
        setInterval(function () {
          console.log('ANNS IN QUEUE: ' + QUEUE.length);

          if (QUEUE.length) {
            announce(QUEUE);
          } else {
            return;
          }
        }, ANNOUNCEMENT_INTERVAL / 2);
      }
    })
  </script>
</body>
</html>