$(document).ready(function() {
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
        window.location = 'home.html'
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
