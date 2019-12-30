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
  <link rel="stylesheet" href="aseets/css/app.css">
  <link rel="stylesheet" href="aseets/css/display.css">
</head>
<body>
  <div class="container-fluid pd-0">
    <div class="row no-gutters" style="height: 7.5vh;">
      <div class="d-flex wd-100p">
        <div class="ml-auto time ht-100p" style="display: none;">
          <div class="d-flex flex-column justify-content-center tx-teal tx-semibold ht-100p pd-10">
            <p class="mg-0" style="line-height: 5vh; font-size: 4vh;"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex main-content">
      <div id="vertical" class="d-flex flex-column wd-40p bg-teal" style="overflow-y: hidden">

        <div class="row no-gutters">
          <div class="col">
            <div id="counter_carousel" class="carousel slide pd-t-10 pd-x-10" style="overflow: hidden">
              <div class="carousel-inner" role="listbox">
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="d-flex flex-column wd-60p">

        <div id="large" class="row no-gutters">

          <div class="col ht-100p">
            <div id="media" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item" data-interval="10000">
                  <div class="ht-100p d-flex align-items-center">

                    <img class="img-fluid" src="./assets/media_1.jpg">

                  </div><!-- d-flex -->
                </div>
                <div class="carousel-item" data-interval="10000">
                  <div class="ht-100p d-flex align-items-center">

                    <img class="img-fluid" src="./assets/media_2.jpg">

                  </div><!-- d-flex -->
                </div>
                <div class="carousel-item active" data-interval="10000">
                  <div class="ht-100p d-flex align-items-center">

                    <img class="img-fluid" src="./assets/media_3.jpg">

                  </div><!-- d-flex -->
                </div>
              </div>
          </div>
          </div>
        </div>

        <div id="horizontal" class="row no-gutters">
        </div>
      </div>

    </div>

    <div id="ticker" style="height: 5vh;" class="bg-teal tx-white">
      <marquee style="line-height: 5vh; font-size: 4vh;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor hendrerit placerat. Donec pretium, felis congue semper fringilla, quam massa egestas arcu, vel rutrum risus ex sed odio</marquee>
    </div>
  </div>

  <div class="modal fade effect-scale" id="announce-modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="announceModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body mg-0 pd-0">

          <div class="row no-gutters ht-100p">

            <div class="col-6 bg-teal ht-100p">
              <div class="d-flex flex-column justify-content-center ht-100p">
                <div class="pd-25 tx-white tx-uppercase tx-center">
                  <h4>Ticket #</h4>

                  <h1 id="ticket"></h1>
                </div>
              </div>
            </div>

            <div class="col-6 tx-teal ht-100p">
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

  <script src="assets/js/utils.js"></script>
  <script src="assets/js/app.js"></script>
</body>
</html>