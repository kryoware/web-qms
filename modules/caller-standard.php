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
<body class="bg-white">
  <div class="d-flex flex-column" id="caller_content">
    <div class="custom-header container-fluid pd-10 justify-content-between d-flex bg-white">
      <div class="d-flex flex-column tx-semibold">
        <p class="mg-0" id="counter_no">Counter: <span id="counter_label"></span></p>
        <p class="mg-0" id="dept_name">Department: <span id="dept_label"></span></p>
      </div>

      <div class="dropdown dropdown-c show">
        <a href="#" class="logged-user" data-toggle="dropdown" aria-expanded="true">
          <img src="http://via.placeholder.com/500x500" alt="">
          <span>USER</span>
          <i class="fa fa-angle-down"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right " x-placement="bottom-end" style="position: absolute; transform: translate3d(-65px, 45px, 0px); top: 0px; left: 0px; will-change: transform;">
          <nav class="nav">
            <a href="#" class="nav-link wd-100p" id="caller_logout" ><i class="icon ion-forward"></i> Sign Out</a>
          </nav>
        </div>
      </div>
    </div>
  
    <div class="main-content container-fluid pd-0 mg-0 flex-grow-1 d-flex flex-column">
      <div class="panel-wrap d-flex" style="height: inherit;">
        <div class="summary-panel bg-custom flex-grow-1">
          <div class="d-flex flex-column justify-content-between pd-10 ht-100p">

            <!-- SUMMARY -->
            <div class="custom-oblong flex-grow-1 d-flex flex-column pd-10 bg-white mg-b-10">

              <div class="d-flex flex-column ht-100p justify-content-center">
                <div class="d-flex flex-column flex-grow-1 ">
                  <p class="summary-label mg-0 text-center text-uppercase">Serving</p>
                  <p id="ticket" class="mg-0 text-center tx-custom tx-semibold" style="opacity: 0;">S-001</p>
                </div>

                <div class="d-flex flex-column justify-content-between">
                  <p class="summary-label mg-0 text-center text-uppercase">Time Elapsed</p>
                  <p class="wd-75p mx-auto custom-oblong pd-10 bg-custom tx-white mg-0 text-center" id="time">00:00:00</p>
                </div>
              </div>

            </div>
            <!-- SUMMARY -->

            <!-- STATISTICS-->
            <div class="custom-oblong flex-grow-1 d-flex flex-column pd-x-25 pd-y-10 bg-white" style="font-size: 2.5vmax">
              <div class="d-flex flex-column ht-100p justify-content-center">
                <p class="text-center text-uppercase tx-semibold tx-custom mg-0 mg-b-10">Statistics</p>

                <div class="row no-gutters">
                  <div class="col">
                  <div class="d-flex flex-column">
                    <p class="mg-0 text-center tx-semibold" id="done">0</p>
                    <p class="mg-0 text-center">Served</p>
                  </div>
                  </div>

                  <div class="col">
                  <div class="d-flex flex-column">
                    <p class="mg-0 text-center tx-semibold" id="cancelled">0</p>
                    <p class="mg-0 text-center">Cancelled</p>
                  </div>
                  </div>

                  <div class="col">
                  <div class="d-flex flex-column">
                    <p class="mg-0 text-center tx-semibold" id="pending">0</p>
                    <p class="mg-0 text-center">Queue</p>
                  </div>
                  </div>

                </div>
              </div>
            </div>
            <!-- STATISTICS-->

          </div>
        </div>

        <div class="actions-panel bg-gray-200 flex-grow-1">
          <div class="d-flex flex-column pd-10 ht-100p">
            <button class="tx-white tx-semibold tx-uppercase custom-oblong btn btn-custom btn-block flex-grow-1 mg-b-5" id="caller_next">Next</button>

            <div class="d-flex justify-content-between flex-grow-1 mg-y-5">
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-warning wd-50p mg-r-5" id="caller_recall">Recall</button>
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-success wd-50p mg-l-5" id="caller_done">Done</button>
            </div>

            <div class="d-flex justify-content-between flex-grow-1 mg-t-5">
              <!-- <button class="tx-semibold tx-uppercase custom-oblong btn btn-secondary wd-50p mg-r-5" id="caller_no_show">No Show</button> -->
              <button class="tx-semibold tx-uppercase custom-oblong btn btn-danger wd-100p" id="caller_cancel">Cancel</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Feedback Modal -->
  <div id="feedback-modal" class="modal fade effect-scale" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content custom-rounded">

        <div class="modal-body tx-center pd-0">
          <div id="spinner" class="pd-20">
            <i class="fa fa-circle-o-notch fa-spin" style="font-size: 3.5rem"></i>
          </div>

          <div id="api_message" class="custom-rounded tx-white">
            <div class="d-flex flex-column justify-content-center ht-100p pd-20">
              <p class="mg-0 text-center" style="display: none;"></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- Feedback Modal -->

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <script src="assets/js/utils.js"></script>
  <script src="assets/js/caller.js"></script>
</body>
</html>
