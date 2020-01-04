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
    .logged-user img{
      width: 32px;
      height: 32px;
    }
    .slim-header {
      height: unset;
    }
    
    .main-content{
      height: calc(100vh - 62px) !important;
    }

    @media screen and (orientation: portrait) {
      .panel-wrap {
        flex-direction: column !important;
      }

      .summary-panel {
        width: 100vw;
      }
      
      .actions-panel {
        width: 100vw;
      }
    }

    @media screen and (orientation: landscape) {
      .summary-panel {
        width: 40vw;
      }
      
      .actions-panel {
        width: 60vw;
      }
    }

    .summary-label {
      font-size: 1.25rem;
    }
    #ticket,
    #time {
      font-size: 3rem;
    }
    .profile-pic img {
      border: 1px solid #1CAF9A;
      border-radius: 100%;
      padding: 2px;
    }
    .profile-pic {
      width: 32px;
      height: 32px;
    }

    .custom-oblong {
      border-radius: 1rem;
    }
  </style>
</head>
<body>
  <div class="d-flex flex-column">
    <div class="custom-header container-fluid pd-y-10 justify-content-between d-flex">
      <div class="d-flex flex-column">
        <p class="mg-0" id="counter_no">Counter #</p>
        <p class="mg-0" id="dept_name">Department</p>
      </div>
      
      <div class="d-flex">
        <div class="d-flex flex-column justify-content-center ht-100p">
          <div class="profile-pic">
            <img alt="" src="http://lorempixel.com/output/cats-q-c-480-480-8.jpg" class="img-fluid" id="image">
          </div>
        </div>
        
        <div class="d-flex flex-column justify-content-center ht-100p">
          <p class="mg-0 mg-l-10" id="name">First Name</p>
        </div>
      </div>
    </div>
  
    <div class="main-content container-fluid pd-0 mg-0 flex-grow-1">
      <div class="panel-wrap d-flex ht-100p">
        <div class="summary-panel bg-teal">
          <div class="d-flex flex-column justify-content-between pd-10 ht-100p">

            <!-- SUMMARY -->
            <div class="custom-oblong d-flex flex-column pd-10 bg-white flex-grow-1 mg-b-10">

              <div class="d-flex flex-column flex-grow-1 ">
                <p class="summary-label mg-0 text-center text-uppercase">Serving</p>
                <p id="ticket" class="mg-0 text-center tx-teal tx-semibold" style="opacity: 0;">S-001</p>
              </div>

              <div class="d-flex flex-column justify-content-between">
                <p class="summary-label mg-0 text-center text-uppercase">Time Elapsed</p>
                <p class="wd-75p mx-auto custom-oblong pd-10 bg-teal tx-white mg-0 text-center" id="time">00:00</p>
              </div>

            </div>
            <!-- SUMMARY -->


            <!-- STATISTICS-->
            <div class="custom-oblong d-flex flex-column pd-x-25 pd-y-10 bg-white" style="font-size: 2.5vmax">
              <p class="text-center text-uppercase tx-semibold tx-teal mg-0 mg-b-10">Statistics</p>

              <div class="d-flex justify-content-between">

                <div class="d-flex flex-column">
                  <p class="mg-0 text-center tx-semibold">12</p>
                  <p class="mg-0 text-center">Served</p>
                </div>

                <div class="d-flex flex-column">
                  <p class="mg-0 text-center tx-semibold">34</p>
                  <p class="mg-0 text-center">Cancelled</p>
                </div>

                <div class="d-flex flex-column">
                  <p class="mg-0 text-center tx-semibold">56</p>
                  <p class="mg-0 text-center">Queue</p>
                </div>

              </div>
            </div>
            <!-- STATISTICS-->


          </div>
        </div>

        <div class="actions-panel bg-gray-400 flex-grow-1">
          <div class="d-flex flex-column pd-10 ht-100p">
            <button class="tx-semibold tx-uppercase custom-oblong btn btn-teal btn-block flex-grow-1 mg-b-5" id="caller_next">Next</button>

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