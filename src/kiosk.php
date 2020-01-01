<?php
error_reporting("all");
$dir_level = 1;
require_once('../_ini.php');
require("../_template_parts.php");
require("../_template_parts.php");

$page_title = "";
$content_title = "$page_title";
$crumbs_title = "$page_title";

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>

  <?php echo "$_template_head"; ?>
  <title><?php echo "$page_title"; ?></title>
  <link rel="stylesheet" href="assets/css/app.css">
  <link rel="stylesheet" href="assets/css/display.css">
  
  <style>
    .content {
      height: 100vh;
    }
    
    .btn.custom-rounded {
      text-transform: uppercase;
      font-size: 1.75rem;
    }
    
    .welcome-card {
      transition: all .5s ease-in-out;
      height: 50vh
    }
  </style>
</head>
<body>
  <div class="content container-fluid bg-teal">
    
    <div class="d-flex flex-column justify-content-center ht-100p">
      <div class="welcome-card wd-80p m-auto bg-white custom-rounded pd-20">
        
        <div class="d-flex flex-column justify-content-between ht-100p">
          <div>
            <div class="d-flex justify-content-center mg-b-20">
              <img src="http://dev.teaconcepts.net/CleverQMS/assets/header_logo.jpg" class="img-fluid">
            </div>
            <h1 class="text-center text-uppercase tx-semibold tx-dark mg-y-40">Welcome</h1>
            <h3 class="text-center tx-semibold tx-dark">What can we help you with today?</h3>
          </div>
          
          <div id="departments" class="mg-t-20">
            <div class="d-flex ht-100p flex-column justify-content-around">
            </div>
          </div>
          
          <div id="actions" class="mg-t-20" style="display: none;">
            <div class="d-flex flex-column justify-content-between">
              
              <h4 class="text-center tx-dark tx-semibold">Currently in queue: 3</h4>
              <h4 class="text-center tx-dark tx-semibold mg-b-20">Waiting Time: 10 mins</h4>
              
              <div class="d-flex justify-content-between">
                <button type="button" class="btn custom-rounded btn-back wd-50p ht-100p mg-r-5">Go Back</button>
                <button type="button" class="btn btn-success custom-rounded btn-print wd-50p ht-100p mg-l-5">Print Ticket</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
  
  <div id="confirm-modal" class="modal show fade effect-slide-in-bottom" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body tx-center pd-y-20 pd-x-20">
          <i class="icon ion-ios-checkmark-outline tx-100 tx-success lh-1 d-inline-block mg-y-25"></i>
          
          <h3 class="text-center">Please refer to the number printed on your ticket</h3>
          <h4 class="text-center">Your number will be caleld shortly, Thank you for waiting</h4>
          
          <button type="button" class="btn btn-success pd-x-25 mg-t-25 custom-rounded" data-dismiss="modal">Okay</button>
        </div>
      </div>
    </div>
  </div>

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>
  
  <script src="assets/js/kiosk.js?v=<?php echo microtime() ?>"></script>
</body>
</html>