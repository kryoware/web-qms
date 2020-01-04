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
  #confirm-modal .modal-dialog {
    max-width: 65vmin !important;
  }
  .content {
    height: 100vh;
  }
  .btn.custom-rounded {
    text-transform: uppercase;
    font-size: 1.75rem;
  }
  .welcome-wrap {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .welcome-card {
    transition: all .5s ease-in-out;
  }
  #bg_slideshow {
    height: 100vh;
    width: 100vw;
  }
  #bg_slideshow .carousel-item, #bg_slideshow .carousel-inner {
    height: 100%;
  }
  #bg_slideshow .img-fluid {
    height: 100vh;
    width: 100vw;
  }
  .branding-wrap .d-flex {
    width: auto;
  }
  .time p {
    line-height: 5vmin;
    font-size: 4.5vmin;
  }
  .ticker {
    line-height: 7.5vmin;
    font-size: 5vmin;
  }
  .kiosk-dept-wrap {
    height: 20vmin;
  }
  .kiosk-dept-name {
    font-size: 3.5vw;
  }
  @media screen and (orientation: portrait) {
    #grid-wrap {
      max-height: 67.5vh;
    }
  }
  @media screen and (orientation: landscape) {
    #grid-wrap {
      max-height: 50vh;
    }
  }
  #grid-wrap {
    overflow-y: scroll;
  }
  #departments .btn-icon {
    width: 15vmin;
    height: 15vmin;
    font-size: 1.5rem;
  }
  .welcome-card h1 {
    font-size: 4rem;
  }
  .welcome-card h3 {
    font-size: 2rem;
  }
  .success-card {
    height: 30vh;
  }
  </style>
</head>
<body>
  <div class="content container-fluid mg-0 pd-0 bg-teal">
    <div class="carousel slide bg-white" id="bg_slideshow" style="display: none;">
      <div class="carousel-inner"></div>
    </div>

    <div class="welcome-wrap ht-100p">
      <div class="wd-100p d-flex flex-column justify-content-center m-auto ht-100p">

        <div class="row no-gutters bg-teal tx-white" id="ticker" style="display: none;"></div>

        <div class="branding-wrap bg-white custom-rounded mg-20 pd-25">
          <div class="d-flex justify-content-between">

            <div class="branding" style="display: none;">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <img class="img-fluid" src="http://dev.teaconcepts.net/CleverQMS/assets/header_logo.jpg">
              </div>
            </div>

            <div class="time" style="display: none;">
              <div class="d-flex flex-column justify-content-center tx-dark tx-semibold ht-100p">
                <p class="mg-0"></p>
              </div>
            </div>

          </div>
        </div>

        <div class="steps-wrap flex-grow-1 d-flex">
          <div class="custom-card-wrap wd-100p">
            <div class="welcome-card mg-x-20 mg-b-20 bg-white custom-rounded pd-25 flex-grow-1">
              <div class="d-flex flex-column justify-content-between ht-100p">

                <div class="d-flex flex-column justify-content-between flex-grow-1 mg-b-20">
                  <h1 class="text-center text-uppercase tx-semibold tx-dark mg-0">Welcome</h1>
                  <h3 class="text-center tx-semibold tx-dark mg-0">Please choose a department</h3>
                </div>

                <div id="departments">

                  <div id="grid-wrap" class="row"></div>

                  <div id="carousel-wrap" class="d-none ht-100p justify-content-between">
                    <div class="d-flex flex-column justify-content-center">
                      <button type="button" class="btn btn-teal btn-icon rounded-circle btn-prev">
                        <i class="fa fa-chevron-left"></i>
                      </button>
                    </div>

                    <div class="flex-grow-1 d-flex justify-content-center"></div>

                    <div class="d-flex flex-column justify-content-center">
                      <button type="button" class="btn btn-teal btn-icon rounded-circle btn-next">
                        <i class="fa fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

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