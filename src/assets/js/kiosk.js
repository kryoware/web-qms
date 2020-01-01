$(document).ready(function () {
  // FIXME: Remove when live
  var host = 'http://dev.teaconcepts.net/CleverQMS/';
  
  var SELECTED_DEPT = null;
  
  (function () {
    
    $.ajax({
      url: host + 'engine/api.php?act=load_departments&stat=open&details=full',
      success: function success(res) {
        if (res.stat === 'ok' && res.data) {
          Object.values(res.data).forEach(function (dept, key) {
            $("#departments .d-flex").append(`
              <button type="button" data-dept_id="${dept.dept_id}" class="btn btn-outline-teal custom-rounded btn-block btn-dept">${dept.dept_name}</button>
            `)
          })
        }
      }
    });
  })();
  
  $('body').on('click', '.btn-dept', function () {
    $('#departments .active').removeClass('active');
    $(this).addClass('active');
    
    var dept = $(this).html();
    SELECTED_DEPT = $(this).data('dept_id');
    
    $('.welcome-card').css('height', '40vh');
    
    $('h1').fadeOut(function () {
      $('h1').text('In Queue: ' + dept);
    })
    
    $('h3').fadeOut(function () {
      $('h3').text('');
    });

    $('#departments').fadeOut(function () {
      $('h1').fadeIn();
      $('h3').fadeIn();
      $('#actions').fadeIn();
    });
  });
  
  
  $('body').on('click', '.btn-back', function () {
    $('.welcome-card').css('height', '50vh');
    
    $('h1').fadeOut(function () {
      $('h1').text('Welcome');
    })
    
    $('h3').fadeOut(function () {
      $('h3').text('What can we help you with today?');
    });
    
    $('#actions').fadeOut(function () {
      $('h1').fadeIn();
      $('h3').fadeIn();
      $('#departments').fadeIn();
    });
  });

  $('body').on('click', '.btn-print', function () {
    // Create Ticket
    $.ajax({
      url: host + 'engine/api.php?act=issue_ticket&dept_id=' + SELECTED_DEPT,
      success: function(res) {
        $('#confirm-modal').modal('show');
        
        setTimeout(function () {
          $('#confirm-modal').modal('hide');
        }, 5000)
      }
    });
  });
  
  $('#confirm-modal').on('hide.bs.modal', function () {
    $('.btn-back').click();
  });
}); // READY