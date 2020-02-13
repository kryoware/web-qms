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
  <link rel="stylesheet" href="assets/css/display-2.css">
</head>
<body>
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

  <div class="container-fluid pd-0">

    <div class="d-flex flex-wrap main-content">

      <div class="d-flex flex-column wd-100p">

        <div class="row no-gutters" id="large">
          <!-- Info -->
          <div class="col-5 bg-white" id="header">
            <div class="d-flex flex-column ht-100p justify-content-center">
              <div class="wd-100p justify-content-center brand-wrap d-flex">
                    <div class="slim-logo mg-0"><img class="pd-y-10" src="../assets/company_logo.png"></div>
                  </div><div class="mg-t-15 wd-100p justify-content-center company-name-wrap d-flex">
                    <p class="mg-0 mg-l-10 company-name tx-dark tx-semibold">Development Bank of the Philippines</p>
                  </div><div class="time text-center mg-t-60" style="">
                <div class="d-flex flex-column justify-content-center tx-dark tx-semibold ht-100p pd-10">
                  <p class="mg-0"> 09:55:14  PM</p>
                </div>
              </div>
              
            </div>
          </div>

          <!-- Media -->
          <div class="col-7 d-flex carousel-wrap bg-custom">
            <div class="media-wrap wd-100p ht-45p"></div>
          </div>
        </div>

        <!-- Misc -->
        <div class="row pd-x-15" id="horizontal_"></div>
      </div>

      <!-- Counters -->
      <div class="d-flex flex-column wd-100p bg-custom" id="vertical">
        <div class="row pd-x-30 pd-t-15">
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
  <script src="assets/js/grid.js?v=<?php echo microtime() ?>"></script>
</body>
</html>
