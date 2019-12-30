function appendSpinner(dom) {
  $(dom).find('span').fadeOut(function () {
    $(dom).find('i').fadeIn();
  });
}

function removeSpinner(dom) {
  $(dom).find('i').fadeOut(function () {
    $(dom).find('span').fadeIn();
  });
}
