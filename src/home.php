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
  <link rel="stylesheet" href="assets/css/home.css">
</head>
<body class="bg-gray-300">
  <div style="height: 100vh; overflow: hidden;">
    <div class="slim-header">
      <div class="container-fluid">
        <div class="slim-header-left">
          <h2 class="slim-logo tx-teal"><a href="index.html">Brand</a>
          </h2>
        </div>

        <div class="slim-header-right">
          <div class="dropdown dropdown-c">
            <a aria-expanded="true" class="logged-user" data-toggle="dropdown" href="#"><img alt="" src="../img/img1.jpg"> <span>User</span> <i class="mg-l-10 fa fa-angle-down"></i></a>

            <div class="dropdown-menu dropdown-menu-right" style="position: absolute; transform: translate3d(-42px, 45px, 0px); top: 0px; left: 0px; will-change: transform;">
              <nav class="nav">
                <a class="nav-link" href="#"><i class="icon fa fa-sign-out"></i> Sign Out</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-content row no-gutters">
      <div class="col-12 col-sm-7 ht-100p">
        <div class="d-flex flex-column ht-100p">
          <div class="flex-grow-1 mg-15">
            <div class="now-serving custom-rounded bg-white ht-100p pd-15">
              <div class="row no-gutters ht-100p">
                <div class="now-serving-header col-6 col-md-12 text-center">
                  <p class="tx-semibold mg-0" style="font-size: 5vh">Currently Serving</p>

                  <div class="now-serving-ticket text-center tx-bold tx-dark mx-auto wd-60p bd bd-teal py-2 px-4 mt-3" style="width: fit-content; border-color: #1CAF9A; border-radius: .5rem;">
                    <span class="tx-teal" style="font-size: 5vh">S-001</span>
                  </div>
                </div>

                <div class="now-serving-timer col-6 col-md-12 text-center">
                  <p class="tx-semibold mg-0" style="font-size: 5vh">Serving Time</p>

                  <p class="tx-dark mg-0 mt-3" style="font-size: 5vh">00:00:00</p>
                </div>
              </div>
            </div>
          </div>

          <div class="user-stats-wrap mg-b-15">
            <div class="user-stats text-center custom-rounded bg-white mg-x-15 pd-15 ht-100p" style="font-size: 4vh">
              <div class="d-flex justify-content-between ht-100p">
                <div class="wd-50p ht-100p">
                  <div class="d-flex flex-column justify-content-center ht-100p">
                    <p class="mg-0 tx-semibold">Total Served</p>

                    <p class="mg-0">0</p>
                  </div>
                </div>

                <div class="wd-50p ht-100p">
                  <div class="d-flex flex-column justify-content-center ht-100p">
                    <p class="mg-0 tx-semibold">Extra Stuff</p>

                    <p class="mg-0">-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-5 ht-100p">
        <div class="actions-panel d-flex flex-wrap justify-content-between ht-100p mg-l-15 mg-sm-l-0 pd-y-15 mg-r-15">
          <button class="btn btn-outline btn-teal btn-lg btn-block custom-rounded tx-semibold">Next</button> <button class="btn btn-outline btn-teal btn-lg btn-block custom-rounded tx-semibold">Recall</button> <button class="btn btn-outline btn-teal btn-lg btn-block custom-rounded tx-semibold">No Show</button>
        </div>
      </div>
    </div>
  </div>
  
  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <script src="assets/js/home.js"></script>
</body>
</html>
