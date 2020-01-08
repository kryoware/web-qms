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
  <link rel="stylesheet" href="assets/css/app.css?v=<?php echo microtime() ?>">
  <style>
    .kiosk-dept-name {
      font-size: 36px;
      padding: 10px;
    }
    #grid-wrap [class*="col"] {
      min-height: 15vh;
      max-height: 15vh;
    }

    #confirm-modal .modal-dialog {
      max-width: 65vmin !important;
    }

    .welcome-wrap {
      position: absolute;
      top: 0;
      width: 100%;
    }

    .container {
      height: 100vh;
      width: 100vw;
    }

    .welcome-card {
      transition: all .5s ease-in-out;
    }

    #bg_slideshow {
      height: 100vh;
      width: 100vw;
    }

    #bg_slideshow .carousel-item,
    #bg_slideshow .carousel-inner {
      height: 100%;
    }

    .branding-wrap .d-flex {
      width: auto;
    }

    .company-subtitle {
      line-height: 3vmin;
      font-size: 2.5vmin;
    }

    .ticker {
      line-height: 7.5vmin;
      font-size: 5vmin;
    }

  </style>
</head>
<body>
  <div class="container-fluid mg-0 pd-0">
    <div class="carousel fade slide bg-white" id="bg_slideshow" style="display: none;">
      <div class="carousel-inner"></div>
    </div>

    <!-- Welcome Wrapper -->
    <div class="welcome-wrap ht-100p">
      <div class="d-flex flex-column ht-100p">
        <!-- Branding/Clock Container -->
        <div class="branding-wrap mg-20 bg-white custom-rounded pd-x-25 pd-b-25">
          <div class="d-flex flex-wrap justify-content-between">

            <div class="branding pd-t-25 flex-grow-1 tx-dark tx-semibold" style="display: none;">
              <div class="d-flex ht-100p">
                <div class="d-flex flex-column justify-content-center ht-100p">
                  <img class="img-fluid" src="http://dev.teaconcepts.net/CleverQMS/assets/header_logo.jpg">
                </div>
                <div class="d-none flex-column justify-content-center ht-100p company-name-wrap">
                  <p class="mg-0 mg-l-15 company-name">Company Name</p>
                  <p class="mg-0 mg-l-15 mg-t-15 company-subtitle" style="display: none;">Optional Text</p>
                </div>
              </div>
            </div>

            <div class="time pd-t-25 flex-grow-1" style="display: none;">
              <div class="d-flex flex-column justify-content-center tx-dark tx-semibold ht-100p">
                <p class="text-right mg-0"></p>
              </div>
            </div>

          </div>
        </div>
        <!-- Branding/Clock Container -->

        <!-- Welcome Card -->
        <div class="welcome-card custom-rounded bg-white mg-x-20 pd-x-25 pd-t-25 flex-grow-1 d-flex flex-column">

          <div class="">
            <h1 class="text-center text-uppercase tx-bold tx-dark mg-0" style="font-size: 6vmin;">Welcome</h1>
            <h3 class="text-center tx-dark mg-0 mg-t-15 mg-b-20" style="font-size: 4.5vmin;">Please choose a department</h3>
          </div>

          <div id="departments" class="flex-grow-1">

            <div id="grid-wrap" class="row d-flex flex-wrap"></div>

            <div id="carousel-wrap" class="d-none ht-100p justify-content-between"></div>

          </div>
        </div>
        <!-- Welcome Card -->

        <!-- Ticker Container -->
        <div class="row no-gutters bg-teal tx-white" id="ticker" style="display: none;"></div>
        <!-- Ticker Container -->
      </div>
    </div>
    <!-- Welcome Wrapper -->

  </div>
  <!-- Container -->

  <div id="confirm-modal" class="modal show fade effect-slide-in-bottom" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content custom-rounded">
        <div class="modal-body tx-center pd-y-20 pd-x-20" style="display: none;">
          <i class="icon ion-ios-checkmark-outline tx-100 tx-success lh-1 d-inline-block mg-y-25"></i>

          <h1 class="text-center mg-b-40">Please refer to the number printed on your ticket</h1>
          <h2 class="text-center mg-b-25">Your number will be called shortly, Thank you for waiting</h2>
        </div>
      </div>
    </div>
  </div>

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <script src="assets/js/kiosk.js?v=<?php echo microtime() ?>"></script>
</body>
</html>