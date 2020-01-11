<?php
session_start();
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
  <link rel="stylesheet" href="assets/css/caller.css">
</head>
<body>
  <div class="d-flex flex-column">
    <div class="custom-header container-fluid pd-y-10 justify-content-between d-flex bg-white">
      <div class="d-flex flex-column tx-semibold">
        <p class="mg-0" id="counter_no">Counter <span id="counter_label"></span></p>
        <p class="mg-0" id="dept_name">Department <span id="dept_label"></span></p>
      </div>
      
      <div class="d-flex">
        <div class="d-flex flex-column justify-content-center ht-100p">
          <div class="profile-pic">
            <img alt="" src="assets/placeholder.jpg" class="img-fluid" id="image">
          </div>
        </div>
        
        <div class="d-flex flex-column justify-content-center ht-100p tx-semibold">
          <p class="mg-0 mg-l-10" id="name">Juan Dela Cruz</p>
        </div>
      </div>
    </div>
  
    <div class="main-content container-fluid pd-0 mg-0 flex-grow-1">
      <div class="panel-wrap d-flex ht-100p">
        <div class="summary-panel bg-custom">
          <div class="d-flex flex-column justify-content-between pd-10 ht-100p">

            <!-- SUMMARY -->
            <div class="custom-oblong d-flex flex-column pd-10 bg-white flex-grow-1 mg-b-10">

              <div class="d-flex flex-column flex-grow-1 ">
                <p class="summary-label mg-0 text-center text-uppercase">Serving</p>
                <p id="ticket" class="mg-0 text-center tx-custom tx-semibold" style="opacity: 0;">S-001</p>
              </div>

              <div class="d-flex flex-column justify-content-between">
                <p class="summary-label mg-0 text-center text-uppercase">Time Elapsed</p>
                <p class="wd-75p mx-auto custom-oblong pd-10 bg-custom tx-white mg-0 text-center" id="time">00:00</p>
              </div>

            </div>
            <!-- SUMMARY -->


            <!-- STATISTICS-->
            <div class="custom-oblong d-flex flex-column pd-x-25 pd-y-10 bg-white" style="font-size: 2.5vmax">
              <p class="text-center text-uppercase tx-semibold tx-custom mg-0 mg-b-10">Statistics</p>

              <div class="d-flex justify-content-between">

                <div class="d-flex flex-column">
                  <p class="mg-0 text-center tx-semibold" id="served">0</p>
                  <p class="mg-0 text-center">Served</p>
                </div>

                <div class="d-flex flex-column">
                  <p class="mg-0 text-center tx-semibold" id="cancelled">0</p>
                  <p class="mg-0 text-center">Cancelled</p>
                </div>

                <div class="d-flex flex-column">
                  <p class="mg-0 text-center tx-semibold" id="queue">0</p>
                  <p class="mg-0 text-center">Queue</p>
                </div>

              </div>
            </div>
            <!-- STATISTICS-->


          </div>
        </div>

        <div class="actions-panel flex-grow-1">
          <div class="d-flex flex-column pd-10 ht-100p">
            <button class="tx-semibold tx-uppercase custom-oblong btn btn-custom btn-block flex-grow-1 mg-b-5" id="caller_next">Next</button>

            <div class="d-flex justify-content-between flex-grow-1 mg-y-5">
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-warning wd-50p mg-r-5" id="caller_recall">Recall</button>
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-success wd-50p mg-l-5" id="caller_done">Done</button>
            </div>

            <div class="d-flex justify-content-between flex-grow-1 mg-t-5">
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-secondary wd-50p mg-r-5" id="caller_no_show">No Show</button>
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-danger wd-50p mg-l-5" id="caller_cancel">Cancel</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <script src="assets/js/utils.js"></script>
  <script src="assets/js/caller.js"></script>
</body>
</html>
