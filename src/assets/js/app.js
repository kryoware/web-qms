  var AUDIO = new Audio('./assets/ding_dong.mp3'),
    MODAL_TIMEOUT = 60000,
    COUNTER_TIMEOUT = 10000,
    MAX = 2,
    CURR = 0,
    FULLSCREEN_ENABLED = false,
    FULLSCREEN_TIMEOUT = null,

    COUNTERS = null,
    DEPARTMENTS = null,
    TICKETS = null,
    CONFIG = null

$(document).ready(function() {

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
  //                 <p style="font-size: 2.5rem; line-height: 2.5rem;" class="text-uppercase tx-semibold mg-0">Ticket</p>
  //                 <p style="font-size: 4rem; line-height: 4rem;" class="tx-semibold mg-0 mg-t-10">{0001}</p>
  //               </div>
  //             </div>

  //             <div class="col text-center pd-y-20">
  //               <div class="d-flex flex-column justify-content-around">
  //                 <p style="font-size: 2.5rem; line-height: 2.5rem;" class="text-uppercase tx-semibold mg-0">Counter</p>
  //                 <p style="font-size: 4rem; line-height: 4rem;" class="tx-semibold mg-0 mg-t-10">${counter.id.toString().padStart(2, '0')}</p>
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
          CONFIG = res.data

          initializeLayout()
        }
      },
      error: function(err) {
        console.error(err)
      }
    })
  }

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
      $('#announce-modal').modal('hide')
    }, MODAL_TIMEOUT)
  }
})

// FIXME: Remove when live
var host = 'http://dev.teaconcepts.net/CleverQMS/'

function render() {
}

function loadDepartments() {
  $.ajax({
    url: host + 'engine/api.php?act=load_departments&stat=open',
    success: function(res) {
      if (res.stat == 'ok' && res.data) {
        $('#counter_carousel .carousel-inner').html('')
        DEPARTMENTS = Object.values(res.data).forEach((dept, key) => {
          $('#generate_ticket').parent().find('select').append(`<option value="${dept.dept_id}">${dept.dept_name}</option>`)

          $('#counter_carousel .carousel-inner').append(`
            <div class="carousel-item ${key == 0 ? 'active' : ''}">
              <div class="d-flex flex-column" data-dept_id="${dept.dept_id}">
                <p class="dept-name tx-semibold mg-b-10 pd-10 tx-teal bg-white text-center text-uppercase" style="font-size: 2.75rem">${dept.dept_name}</p>
              </div>
            </div>
          `)
        })

        $('#counter_carousel').carousel({
          interval: COUNTER_TIMEOUT,
          ride: 'carousel'
        })
        loadCounters()
      }
    }
  })
}

function loadCounters() {
  $.ajax({
    url: host + 'engine/api.php?act=load_counters&stat=open',
    success: function(res) {
      if (res.stat == 'ok' && res.data) {
        Object.values(res.data).forEach(counter => {
          if (CURR < MAX) CURR++
          else {
            var dept_name = $('#counter_carousel').find(`[data-dept_id="${counter.dept_id}"] .dept-name`).text()

            console.log(dept_name)

            $('#counter_carousel .carousel-inner').append(`
              <div class="carousel-item">
                <div class="d-flex flex-column" data-dept_id="${counter.dept_id}">
                  <p class="dept-name tx-semibold mg-b-10 pd-10 tx-teal bg-white text-center text-uppercase" style="font-size: 2.75rem">${dept_name}</p>
                </div>
              </div>
            `)
            CURR = 0
          }
          console.log(counter)

          $('#horizontal .content').append(`
            <div class="col">
              <button type="button" data-counter_id="${counter.counter_id}" class="btn btn-outline-success btn-call text-uppercase">${counter.counter_id} call next</button>
            </div>
          `)

          var containers = $('#counter_carousel').find(`[data-dept_id="${counter.dept_id}"]`)
          $(containers[containers.length - 1]).append(`
            <div class="bg-white mg-b-10" data-counter_id="${counter.counter_id}">
              <div class="tx-dark">
                <div class="row no-gutters">

                  <div class="col text-center pd-y-20">
                    <div class="d-flex flex-column justify-content-around">
                      <p style="font-size: 2.5rem; line-height: 2.5rem;" class="ticket-label text-uppercase tx-semibold mg-0">Ticket</p>
                      <p style="font-size: 4rem; line-height: 4rem;" class="ticket-no tx-semibold mg-0 mg-t-10"></p>
                    </div>
                  </div>

                  <div class="col text-center pd-y-20">
                    <div class="d-flex flex-column justify-content-around">
                      <p style="font-size: 2.5rem; line-height: 2.5rem;" class="counter-label text-uppercase tx-semibold mg-0">Counter</p>
                      <p style="font-size: 4rem; line-height: 4rem;" class="counter-no tx-semibold mg-0 mg-t-10">${counter.counter_no.toString().padStart(2, '0')}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          `)
        })

        // setInterval(() => {
        //   console.log('Refresh Tickets')
        //   loadTickets()
        // }, 1000)
      }
    }
  })
}

function loadTickets() {
  var dept_id = '' // FIXME: This should be dynamic

  $.ajax({
    url: host + 'engine/api.php?act=load_tickets&stat=active' + dept_id,
    success: function(res) {
      if (res.stat == 'ok' && res.data) {
        TICKETS = Object.values(res.data).forEach(deptTickets => {
          Object.values(deptTickets).forEach(ticket => {
            if (parseInt(ticket.counter_id) != 0) {
              var counter_card = $(`[data-dept_id="${ticket.dept_id}"]`).find(`[data-counter_id="${ticket.counter_id}"]`)
              var ticket_dom = $(counter_card).find('.ticket-no')

              console.table({
                dept_id: ticket.dept_id,
                counter_id: ticket.counter_id,
                ticket: ticket.ticket_label
              })

              ticket_dom.text(ticket.ticket_label)
            }
          })
        })
      }
    }
  })
}
