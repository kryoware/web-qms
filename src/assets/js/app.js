var MODAL_TIMEOUT = 5000
var AUDIO = new Audio('./assets/ding_dong.mp3')
  
$(document).ready(function() {
  getConfig()
  
  function getConfig() {
    $.ajax({
      url: '/src/config.json',
      success: function(res) {
        if (res.stat === 'ok' && Object.keys(res.data).length) {
          initializeLayout(res.data)
        }
      },
      error: function(err) {
        console.error(err)
      }
    })
  }
  
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

  $('.carousel').carousel({
    interval: 3000,
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
})

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