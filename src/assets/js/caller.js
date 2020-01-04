$(document).ready(function() {
  $('.profile-pic').on('click', function () {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  })

  $('#caller_next').on('click', function() {
    callApi('caller_next', {

    }, function (res) {
      console.log(res)

      if (res.stat == 'ok') {
        console.log('caller_next', res.data)
      }
    });
  });

  $('#caller_recall').on('click', function() {
    callApi('caller_recall', {

    }, function (res) {
      console.log(res)

      if (res.stat == 'ok') {
        console.log('caller_recall', res.data)
      }
    });
  });

  $('#caller_done').on('click', function() {
    callApi('caller_done', {

    }, function (res) {
      console.log(res)

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
