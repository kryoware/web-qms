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
</head>
<body>
  <div class="container-fluid pd-0">
    <div class="row no-gutters bg-white" id="header">
      <div class="d-flex wd-100p">
        <div class="d-flex flex-column justify-content-center pd-l-10">
          <div class="d-flex ht-100p">
            <div class="d-none flex-column justify-content-center brand-wrap">
              <div class="slim-logo mg-0"><img class="pd-y-10" src="../assets/company_logo.png"></div>
            </div>
            <div class="d-none flex-column justify-content-center ht-100p company-name-wrap">
              <p class="mg-0 mg-l-10 company-name tx-dark tx-semibold"></p>
            </div>
          </div>
        </div>
        <div class="ml-auto time ht-100p" style="display: none;">
          <div class="d-flex flex-column justify-content-center tx-dark tx-semibold ht-100p pd-10">
            <p class="mg-0"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex main-content">
      <div class="d-flex flex-column wd-40p bg-custom" id="vertical">
        <div class="row no-gutters">
          <div class="col">
            <div id="counter_carousel"></div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column wd-60p">
        <div class="row no-gutters" id="large">
          <div class="col ht-100p d-flex carousel-wrap bg-custom">
            <div class="media-wrap"></div>
            
            <!-- <div class="carousel slide" data-ride="carousel" id="media">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item" data-interval="10000">
                  <div><img class="img-fluid" src="./assets/media_1.jpg"></div>
                </div>
                <div class="carousel-item" data-interval="10000">
                  <div><img class="img-fluid" src="./assets/media_2.jpg"></div>
                </div>
                <div class="carousel-item active" data-interval="10000">
                  <div><img class="img-fluid" src="./assets/media_3.jpg"></div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="row pd-x-15" id="horizontal_">
          <!-- <div class="col text-center">
              <div class="d-flex flex-column ht-100p">
                <div class="flex-grow-1 d-flex flex-column justify-content-center">
                  <p class="mg-0 tx-dark tx-semibold pd-y-10">SALES</p>
                </div>

                <p class="bg-white custom-rounded pd-10">S-123</p>
                <p class="bg-white custom-rounded pd-10">S-456</p>

              </div>
            </div>
            <div class="col text-center">
              <div class="d-flex flex-column ht-100p">
                <div class="flex-grow-1 d-flex flex-column justify-content-center">
                  <p class="mg-0 tx-dark tx-semibold pd-y-10">BILLING</p>
                </div>

                <p class="bg-white custom-rounded pd-10">B-123</p>
                <p class="bg-white custom-rounded pd-10">B-456</p>

              </div>
            </div>
            <div class="col text-center">
              <div class="d-flex flex-column ht-100p">
                <div class="flex-grow-1 d-flex flex-column justify-content-center">
                  <p class="mg-0 tx-dark tx-semibold pd-y-10">CUSTOMER SUPPORT</p>
                </div>

                <p class="bg-white custom-rounded pd-10">CS-123</p>
                <p class="bg-white custom-rounded pd-10">CS-456</p>

              </div>
            </div> -->
        </div>
      </div>
    </div>
    <div class="row no-gutters bg-custom tx-white" id="ticker" style="display: none;"></div>
  </div>

  <div aria-hidden="true" aria-labelledby="announceModalLabel" class="modal fade effect-scale" data-backdrop="static" id="announce-modal" role="dialog" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body mg-0 pd-0">
          <div class="row no-gutters ht-100p">
            <div class="col-6 bg-custom ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-white tx-uppercase tx-center">
                  <h4>Ticket #</h4>
                  <h1 id="ticket"></h1>
                </div>
              </div>
            </div>
            <div class="col-6 tx-custom ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-uppercase tx-center">
                  <h4>Counter</h4>
                  <h1 id="counter"></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <script src="assets/js/marquee.min.js" type="text/javascript"></script>
  <script src="assets/js/utils.js?v=<?php echo microtime() ?>"></script>
  <script src="assets/js/app.js?v=<?php echo microtime() ?>"></script>
</body>
</html>