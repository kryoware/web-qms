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
    ANNOUNCED = []

$(document).ready(function() {
  setInterval(() => {
    loadAnnouncements()
  }, 5000)

  setInterval(() => {
    console.log('ANNS IN QUEUE: ' + QUEUE.length)

    if (QUEUE.length) announce(QUEUE)
    else return
  }, 2000)

  function loadAnnouncements() {
    $.ajax({
      url: host + 'engine/api.php?act=announcements',
      success: function(res) {
        if (res.stat == 'ok' && res.data) {
            QUEUE = QUEUE.concat(Object.values(res.data).filter(data => !ANNOUNCED.includes(data.ann_id)))
        }
      }
    })
  }

  $('body').on('click', '.btn-call', function() {
    var counter_id = $(this).data('counter_id')

    console.log(counter_id)

    $.ajax({ url: host + 'engine/api.php?act=caller_next&counter_id=' + counter_id })
  })

  $('#generate_ticket').on('click', function() {
    var select = $(this).parent().find('select')

    console.log(select.val())
    if (select.val()) {
      var dept_id = select.val()
      $.ajax({
        url: host + 'engine/api.php?act=issue_ticket&dept_id=' + dept_id
      })

    } else {

    }
  })

  // Counter Carousel
  // $('#counter_carousel').append('<div class="carousel-item active"><div class="counter-wrap d-flex flex-column"></div></div>')

  // data.counters.forEach(counter => {
  //   if (counter.enabled) {
  //     if (CURR < MAX) CURR++
  //     else {
  //       $('#counter_carousel').append('<div class="carousel-item"><div class="counter-wrap d-flex flex-column"></div></div>')
  //       CURR = 0
  //     }

  //     var items = $('#counter_carousel').children()
  //     $(items[items.length - 1]).find('.counter-wrap').append(`
  //       <div class="bg-white mg-b-10">
  //         <div class="tx-dark">
  //           <div class="row no-gutters">

  //             <div class="col text-center pd-y-20">
  //               <div class="d-flex flex-column justify-content-around">
  //                 <p style="font-size: 2.5vw; line-height: 2.5vw;" class="text-uppercase tx-semibold mg-0">Ticket</p>
  //                 <p style="font-size: 4vw; line-height: 4vw;" class="tx-semibold mg-0 mg-t-10">{0001}</p>
  //               </div>
  //             </div>

  //             <div class="col text-center pd-y-20">
  //               <div class="d-flex flex-column justify-content-around">
  //                 <p style="font-size: 2.5vw; line-height: 2.5vw;" class="text-uppercase tx-semibold mg-0">Counter</p>
  //                 <p style="font-size: 4vw; line-height: 4vw;" class="tx-semibold mg-0 mg-t-10">${counter.id.toString().padStart(2, '0')}</p>
  //               </div>
  //             </div>

  //           </div>
  //         </div>
  //       </div>
  //     `)
  //   }
  // })

  // $('#counter_carousel').carousel({
  //   interval: COUNTER_TIMEOUT,
  //   ride: 'carousel'
  // })

  getConfig()

  function getConfig() {
    $.ajax({
      url: 'config.json',
      success: function(res) {
        if (res.stat === 'ok' && Object.keys(res.data).length) {
          // FIXME: MOCK API
          CONFIG = res.data.config

          initializeLayout()
        }
      },
      error: function(err) {
        console.error(err)
      }
    })
  }

  $('#clock_toggle').on('click', function() {
    $(this).toggleClass('active')

    $('.time').parent().parent().slideToggle()
  })

  $('#ticker_toggle').on('click', function() {
    $(this).toggleClass('active')

    $('.main-content').toggleClass('show-ticker')
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
    if (CONFIG['clock']) {
      var clock = CONFIG['clock']
      $('.time').toggle(clock.enabled)

      var format = ''
      if (clock.date_format.show_dow) {
        format += clock.date_format.dow == 'short' ? 'ddd, ' : 'dddd, '
      }

      format += clock.date_format.month == 'short' ? 'MMM ' : 'MMMM '
      format += clock.date_format.day == 'short' ? 'D ' : 'DD '
      format += clock.date_format.show_year ? 'Y' : ''

      format += clock.time_format.hours == 'short' ? ' h:mm' : ' hh:mm'
      format += clock.time_format.show_seconds ? ':ss ' : ''
      format += clock.time_format.show_suffix ? 'A' : ''

      setInterval(() => {
        $('.time p').text(moment().format(format))
      }, 500)
    }
    loadDepartments()
    // Object.keys(data.panel_config).forEach(function(key) {
    //  var panel = data.panel_config[key]
    //  var panel_dom = $('#' + key)
    //  if (panel.enabled) {
    //    panel_dom.show()
    //    panel_dom.addClass('order-' + panel.order)
    //    panel_dom.css('width', panel.width + '%')
    //    if (key == 'vertical') {
    //      var MAX_COUNTERS = parseInt(data.max_counters_displayed)
    //      var CURR = 0
    //      data.counters.forEach(function(counter) {
    //        if (CURR )
    //        panel_dom.find('.carousel-inner').append('<div clascarousel-item')
    //      })
    //    }
    //  }
    // })
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

    }, MODAL_TIMEOUT)
  }
})

// FIXME: Remove when live
var host = 'http://dev.teaconcepts.net/CleverQMS/'

function loadDepartments() {
  $.ajax({
    url: host + 'engine/api.php?act=load_departments&stat=open&details=full',
    success: function(res) {
      if (res.stat == 'ok' && res.data) {
        $('#counter_carousel .carousel-inner').html('')
        DEPARTMENTS = Object.values(res.data)

        Object.values(res.data).forEach((dept, key) => {
          CURR = 0
          $('#generate_ticket').parent().find('select').append(`<option value="${dept.dept_id}">${dept.dept_name}</option>`)

          $('#counter_carousel .carousel-inner').append(`
            <div class="carousel-item ${key == 0 ? 'active' : ''}">
              <div class="d-flex flex-column" data-dept_id="${dept.dept_id}">
                ${DEPARTMENTS.length > 1 ? `<p class="dept-name tx-semibold mg-b-10 pd-10 tx-teal bg-white text-center text-uppercase" style="font-size: 2.75vw">${dept.dept_name}</p>` : ''}
              </div>
            </div>
          `)
          Object.values(dept.counters).forEach(counter => {
            if (CURR < MAX) CURR++
            else {
              $('#counter_carousel .carousel-inner').append(`
                <div class="carousel-item">
                  <div class="d-flex flex-column" data-dept_id="${dept.dept_id}">
                    <p class="custom-rounded dept-name tx-semibold mg-b-10 pd-10 tx-teal bg-white text-center text-uppercase" style="font-size: 2.75vw">${dept.dept_name}</p>
                  </div>
                </div>
              `)
              CURR = 0
            }

            $('#horizontal .content').append(`
              <div class="col">
                <button type="button" data-counter_id="${counter.counter_id}" class="btn btn-outline-success btn-call text-uppercase">${counter.counter_id} call next</button>
              </div>
            `)

            var containers = $('#counter_carousel').find(`[data-dept_id="${counter.dept_id}"]`)
            $(containers[containers.length - 1]).append(`
              <div class="custom-rounded bg-white mg-b-10" data-counter_id="${counter.counter_id}">
                <div class="tx-dark">
                  <div class="row no-gutters">

                    <div class="col text-left">
                      <div class="d-flex flex-column justify-content-around pd-y-20 pd-l-10">
                        <p style="font-size: 4vw; line-height: 4vw;" class="counter-no tx-semibold mg-0">Counter ${counter.counter_no}</p>
                      </div>
                    </div>

                    <div class="col text-right">
                      <div class="d-flex flex-column justify-content-around pd-y-20 pd-r-10">
                        <p style="font-size: 2.5vw; line-height: 2.5vw; display: none;" class="ticket-label text-uppercase tx-semibold mg-0">Ticket</p>
                        <p style="font-size: 4vw; line-height: 4vw;" class="ticket-no tx-semibold mg-0"></p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            `)
          })
        })

        $('#counter_carousel').carousel({
          interval: COUNTER_TIMEOUT,
          ride: 'carousel'
        })

        setInterval(loadTickets(), REFRESH_INTERVAL)
      }
    }
  })
}

function loadTickets() {
  var dept_id = '' // FIXME: This should be dynamic

  $.ajax({
    url: host + 'engine/api.php?act=load_tickets&ds=active' + dept_id,
    success: function(res) {
      if (res.stat == 'ok' && res.data) {
        var NEW_TICKETS = []

        Object.values(res.data).forEach(ticket => {
          NEW_TICKETS.push(ticket)

          if (parseInt(ticket.counter_id) != 0) {
            var counter_card = $(`[data-dept_id="${ticket.dept_id}"]`).find(`[data-counter_id="${ticket.counter_id}"]`)
            var ticket_dom = $(counter_card).find('.ticket-no')

            // console.table({
            //   dept_id: ticket.dept_id,
            //   counter_id: ticket.counter_id,
            //   ticket: ticket.ticket_label
            // })

            ticket_dom.text(ticket.ticket_label)
          }
        })

        if (TICKETS.length == 0) TICKETS = NEW_TICKETS

        // if (TICKETS.length != NEW_TICKETS.length) {
          let NOTIFICATION = TICKETS.filter(x => !NEW_TICKETS.includes(x))
          console.log(NOTIFICATION)
          let NOTIFICATION2 = NEW_TICKETS.filter(x => !TICKETS.includes(x))
          console.log(NOTIFICATION2)
        // }
      }
    }
  })
}


function announce(queue) {
  var modal_shown = $('#announce-modal').hasClass('show')
  var data = queue[0]

  if (!data || modal_shown) return

  console.log(JSON.stringify(data))

  // Already announced, removed from queue
  if (ANNOUNCED.includes(data.ann_id)) {
    QUEUE.shift()
    announce(QUEUE)
    return
  } else {
    ANNOUNCED.push(data.ann_id)

    // Play audio / Text-to-speech ?
    AUDIO.play()

    // Update counter carousel data
    var counter_card_dom = $(`[data-dept_id="${data.dept_id}"] [data-counter_id="${data.counter_no}"]`)
    $(counter_card_dom).find('.ticket-no').text(data.ticket_label)
    // Update counter carousel data

    $('#ticket').text(data.ticket_label)
    $('#counter').text(data.counter_no)

    if (CONFIG['fullscreen_enabled']) $('#announce-modal').modal('show')
    setTimeout(() => {
      if (CONFIG['fullscreen_enabled']) $('#announce-modal').modal('hide')

      setTimeout(() => {
        QUEUE.shift()
        announce(QUEUE)
      }, 250)
    }, MODAL_TIMEOUT)
  }
}
