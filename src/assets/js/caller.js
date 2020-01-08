$(document).ready(function() {
  /* NOTES
    caller_next 
    caller_cancel
    caller_recall
    caller_done (meaning close na current ticket but dont call nxt ticket )
  */
  
  // FIXME: For testing only
  var COUNTER_ID = window.location.search.slice('counter_id'.length + 2);
  var TIMER_INTERVAL_ID = null;
  var TIMER_START = null;
  var PREV_TICKET = null;
  console.log(COUNTER_ID)

  if (COUNTER_ID) $('#counter_label').text(COUNTER_ID)

  $('#caller_next').on('click', function() {
    callApi('caller_next', {
      counter_id: COUNTER_ID
    }, function (res) {
      if (res.stat == 'ok') {
        // FIXME:
        var served = parseInt($('#served').text())
        $('#served').text(served++)

        clearInterval(TIMER_INTERVAL_ID);

        PREV_TICKET = res.data.ticket_label;
        $('#ticket').text(PREV_TICKET);
        $('#ticket').animate({ opacity: '+=1' }, 500, 'linear');

        TIMER_START = moment();
        TIMER_INTERVAL_ID = setInterval(function () {
          $('#time').text(moment(moment().diff(TIMER_START)).format('mm:ss'));
        }, 500);
      }
    });
  });

  $('#caller_recall').on('click', function() {
    callApi('caller_recall', {
      counter_id: COUNTER_ID
    }, function (res) {
      if (res.stat == 'ok') {
        clearInterval(TIMER_INTERVAL_ID);

        $('#time').text('00:00');
        
        $('#ticket').animate({ opacity: 0 }, 500, 'linear',
        function () {
          $('#ticket').text(PREV_TICKET);
          $('#ticket').animate({
            opacity: '+=1'
          }, 500);
        });
      }
    });
  });

  $('#caller_done').on('click', function() {
    callApi('caller_done', {

    }, function (res) {      
      // FIXME
      clearInterval(TIMER_INTERVAL_ID);
      $('#time').text('00:00');
      $('#ticket').animate({ opacity: 0 }, 500, 'linear');
      // FIXME

      if (res.stat == 'ok') {
        console.log('caller_done', res.data)
      }
    });
  });

  $('#caller_no_show').on('click', function() {
    callApi('caller_no_show', {

    }, function (res) {
      console.log(res)

      if (res.stat == 'ok') {
        console.log('caller_no_show', res.data)
      }
    });
  });

  $('#caller_cancel').on('click', function() {
    callApi('caller_cancel', {

    }, function (res) {
      console.log(res)

      if (res.stat == 'ok') {
        console.log('caller_cancel', res.data)
      }
    });
  });

  $('form').on('submit', function(e) {
    e.preventDefault()

    var payload = {}
    var input = $(this).serializeArray()

    console.log(input)

    input.forEach(i => {
      console.log(i)
      payload[i.name] = i.value
    })

    appendSpinner($(this).find('[type="submit"]'))

    console.log(payload)

    if (payload.email == 'staff@example.com' && payload.password == 'staff') {
      console.log('valid')
      setTimeout(() => {
        window.location = 'home.php'
      }, 1000)
    } else {
      setTimeout(() => {
        removeSpinner($(this).find('[type="submit"]'))

        $(this).find('.form-control').addClass('is-invalid')
        $(this).find('.tx-danger').text('Invalid email or password')
        $(this).find('.tx-danger').animate({
          opacity: 1
        }, 300)
      }, 1000)
    }
  })
})
