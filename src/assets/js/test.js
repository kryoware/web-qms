'use strict';

$(document).ready(function() {

});

var VW = $(window).width();
var VH = $(window).height();

function carouselScroll(page) {
  var page_dom = $('.wrapper').children()[page - 1]
  $('.wrapper .active').removeClass('active')
  $(page_dom).addClass('active')

  if (page == 1) {
    $('.wrapper').animate({
      scrollLeft: 0
    }, 500);
  } else {
    $('.wrapper').animate({
      scrollLeft: '+='.concat((page - 1) * (.4 * VW))
    }, 500);
  }
}