function appendSpinner(dom) {
  $(dom).find('span').fadeOut(function() {
    $(dom).find('i').fadeIn()
  })
}

function removeSpinner(dom) {
  $(dom).find('i').fadeOut(function() {
    $(dom).find('span').fadeIn()
  })
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message)
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[0]
  window.speechSynthesis.speak(msg)
}