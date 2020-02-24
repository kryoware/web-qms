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
  <link rel="stylesheet" href="assets/css/kiosk.css">
</head>
<body>
  <div id="ticket" style="line-height: 1.25; color: black; background: white;">
    <div class="d-flex">
      <div id="ticket_logo" class="d-flex justify-content-center flex-shrink-0 flex-grow-1" style="margin-bottom: 1.25rem;"></div>
      <p class="text-wrap flex-shrink-1" id="ticket_company_name" style="font-size: 5rem; font-weight: bold; display: block; margin-bottom: 1.25rem;">Company Name</p>
    </div>
    
    <!-- <br/><br/> -->

    <!-- <span style="font-size: 5rem;">Your Ticket Number</span><br/> -->

    <span id="ticket_no" style="font-size: 10rem; font-weight: bold; line-height: 1.5;">3</span><br/>

    <!-- <span style="font-size: 4rem; display: block; margin-bottom: 1.25rem;" class="ticket-msg"></span><br/><br/>
    <span style="font-size: 4rem; line-height: 1.25;">Latest Ticket Served: <span id="ticket_serving"></span></span><br/>
    <span style="font-size: 4rem; line-height: 1.25; display: block; margin-bottom: 1.25rem;">Total Customer(s) waiting: <span id="ticket_customers"></span></span><br/><br/>

    <div class="clearfix">
      <span id="ticket_date" style="font-size: 3rem; float: left;">1</span>
      <span id="ticket_time" style="font-size: 3rem; float: right;">2</span>
    </div> -->
  </div>

  <div class="content-wrap">
    <div class="d-flex flex-column ht-100p" id="kiosk_content">
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
                      <img class="img-fluid" src="../assets/company_logo.png">
                    </div>
                    <div class="d-none flex-column justify-content-center company-name-wrap">
                      <p class="mg-0 mg-l-15 company-name"></p>
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
            <div class="welcome-card custom-rounded bg-white mg-x-20 pd-x-25 pd-t-25 d-flex flex-column">

              <div class="">
                <h1 class="text-center text-uppercase tx-bold tx-dark mg-0 welcome-msg" style="font-size: 6vmin;"></h1>
                <h3 class="text-center tx-dark mg-0 mg-t-20 mg-b-20 instruction-msg" style="font-size: 4.5vmin;"></h3>
              </div>

              <div id="departments" class="flex-grow-1">

                <div class="d-flex flex-column justify-content-center ht-100p">
                  <div id="grid-wrap" class="row d-flex flex-wrap"></div>

                  <div id="carousel-wrap" class="d-none ht-100p justify-content-between"></div>
                </div>
              </div>
            </div>
            <!-- Welcome Card -->

            <!-- Ticker Container -->
            <div class="d-flex flex-column tx-white order-12 justify-content-end flex-grow-1">
              <div id="ticker" class="bg-custom" style="display: none;"></div>
            </div>
            <!-- Ticker Container -->
          </div>
        </div>
        <!-- Welcome Wrapper -->

      </div>
    </div>
  </div>
  <!-- Container -->

  <div id="confirm-modal" class="modal show fade effect-slide-in-bottom" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content custom-rounded">
        <div class="modal-body tx-center tx-dark" style="display: none;">
          <i class="icon ion-ios-checkmark-outline tx-100 tx-success lh-1 d-inline-block mg-y-25"></i>

          <div class="mg-b-15">
            <h2 class="text-center mg-b-25">Ticket Number</h2>
            <h1 class="text-center mg-b-40 ticket tx-bold"></h1>
          </div>
          <h2 class="text-center mg-b-25 ticket-msg"></h2>
          <!-- <h2 class="text-center mg-b-25">Thank you for waiting</h2> -->
        </div>
      </div>
    </div>
  </div>

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <script src="assets/js/marquee.min.js" type="text/javascript"></script>
  <script src="assets/js/utils.js"></script>
  <script src="assets/js/kiosk.js"></script>
</body>
</html>