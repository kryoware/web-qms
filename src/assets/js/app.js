$(document).ready(function() {
  var AUDIO = new Audio('./assets/ding_dong.mp3'),
    MODAL_TIMEOUT = 5000,
    COUNTER_TIMEOUT = 5000,
    MAX = 4,
    CURR = 0

  var data = {
    "counters": [
      {
        "id": 1,
        "name": "Counter 1",
        "enabled": true
      },
      {
        "id": 2,
        "name": "Counter 2",
        "enabled": false
      },
      {
        "id": 3,
        "name": "Counter 3",
        "enabled": true
      },
      {
        "id": 4,
        "name": "Counter 4",
        "enabled": false
      },
      {
        "id": 5,
        "name": "Counter 5",
        "enabled": true
      },
      {
        "id": 6,
        "name": "Counter 6",
        "enabled": true
      },
      {
        "id": 7,
        "name": "Counter 7",
        "enabled": true
      }
    ]
  }

  $('#counter_carousel').append('<div class="carousel-item active"><div class="counter-wrap d-flex flex-column"></div></div>')

  data.counters.forEach(counter => {
    if (counter.enabled) {
      if (CURR < MAX) CURR++
      else {
        $('#counter_carousel').append('<div class="carousel-item"><div class="counter-wrap d-flex flex-column"></div></div>')
        CURR = 0
      }

      var items = $('#counter_carousel').children()
      $(items[items.length - 1]).find('.counter-wrap').append(`
        <div class="bg-white mg-b-10">
          <div class="tx-dark">
            <div class="row no-gutters">

              <div class="col text-center pd-y-20">
                <div class="d-flex flex-column justify-content-around">
                  <p style="font-size: 2.5rem; line-height: 2.5rem;" class="text-uppercase tx-semibold mg-0">Ticket</p>
                  <p style="font-size: 4rem; line-height: 4rem;" class="tx-semibold mg-0 mg-t-10">{0001}</p>
                </div>
              </div>

              <div class="col text-center pd-y-20">
                <div class="d-flex flex-column justify-content-around">
                  <p style="font-size: 2.5rem; line-height: 2.5rem;" class="text-uppercase tx-semibold mg-0">Counter</p>
                  <p style="font-size: 4rem; line-height: 4rem;" class="tx-semibold mg-0 mg-t-10">${counter.id.toString().padStart(2, '0')}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      `)
    }
  })

  $('#counter_carousel').carousel({
    interval: COUNTER_TIMEOUT,
    ride: 'carousel'
  })

  // getConfig()
  //
  // function getConfig() {
  //   $.ajax({
  //     url: '/src/config.json',
  //     success: function(res) {
  //       if (res.stat === 'ok' && Object.keys(res.data).length) {
  //         initializeLayout(res.data)
  //       }
  //     },
  //     error: function(err) {
  //       console.error(err)
  //     }
  //   })
  // }

  $('#ticker_toggle').on('click', function() {
    $(this).toggleClass('active')

    if ($(this).hasClass('active')) {
      $('.main-content').css('height', '95vh')
    } else {
      $('.main-content').css('height', '100vh')
    }

    $('#ticker').toggle()
  })

  $('[name="fullscreen_enabled"]').on('change', function() {
//    $(this).
  })

  $('#layout_config').on('submit', function(e) {
    e.preventDefault()

    $(this).serializeArray().forEach(function(x) {
      console.log(x)
    })
  })

  $('#sample_fullscreen_duration').on('change', function() {
    MODAL_TIMEOUT = parseInt($(this).val()) * 1000
  })

  $('#sample_fullscreen').on('click', function() {
    sampleFullScreen()
  })

  function initializeLayout(data) {
    Object.keys(data.panel_config).forEach(function(key) {
//      var panel = data.panel_config[key]
//      var panel_dom = $('#' + key)
//
//      if (panel.enabled) {
//        panel_dom.show()
//        panel_dom.addClass('order-' + panel.order)
//        panel_dom.css('width', panel.width + '%')

//        if (key == 'vertical') {
//          var MAX_COUNTERS = parseInt(data.max_counters_displayed)
//          var CURR = 0
//
//          data.counters.forEach(function(counter) {
//            if (CURR )
//            panel_dom.find('.carousel-inner').append('<div clascarousel-item')
//
//
//          })
//        }
//      }
    })
  }


  function sampleFullScreen() {

    var ticket = parseInt(Math.random() * 1000).toString()
    ticket = ticket.padStart(5, '0')

    showAnnouncement(ticket, parseInt(Math.random() * 10).toString().padStart(2, '0'))
  }

  function showAnnouncement(ticket = '', counter = '') {
    $('#ticket').text(ticket)
    $('#counter').text(counter)

    AUDIO.play()

    $('#announce-modal').modal('show')

    setTimeout(function() {
      $('#announce-modal').modal('hide')
    }, MODAL_TIMEOUT)
  }
})
