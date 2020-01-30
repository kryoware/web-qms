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
  <link rel="stylesheet" href="assets/css/login.css">
</head>
<body>
  <div class="container-fluid mg-0 pd-0">
    <div class="d-flex flex-column">

      <!-- Department Tabs -->
      <div class="header-wrap bg-white pd-20">
        <p class="text-center wd-100p tx-dark tx-semibold" style="font-size: 5vmin;">Select Department</p>
        <ul id="departments" class="nav nav-pills nav-fill"></ul>
      </div>
      <!-- Department Tabs -->

      <!-- Tab Content -->
      <div id="tab_content_wrapper" class="bg-white custom-rounded pd-20 mg-y-20">
        <p class="text-center wd-100p tx-dark tx-semibold" style="font-size: 5vmin;">Select Counter</p>
        <div id="counters" class="tab-content"></div>

        <div class="wd-100p" style="display: none;">
          <button type="button" class="btn custom-rounded btn-block btn-continue">Continue</button>
        </div>
      </div>
      <!-- Tab Content -->

    </div>
  </div>
  <!-- Container -->

  <!-- Login Modal -->
  <div id="login-modal" class="modal show fade effect-slide-in-bottom" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content custom-rounded">
        <div class="modal-header footer-wrap tx-white">
          <p class="wd-100p text-center" style="font-size: 8vmin;">Login to Counter <span id="login_counter"></span></p>
        </div>

        <div class="modal-body tx-center pd-0 pd-t-20 pd-x-20">
          <form method="POST">
            <div class="d-flex justify-content-center wd-100p">
              <input type="hidden" name="counter">
              <input type="tel" name="pin" class="form-control flex-grow-1 custom-rounded" placeholder="Enter PIN">
              <button type="submit" class="btn custom-rounded btn-custom tx-white wd-50p mg-l-20">
                <span>Login</span>
                <i class="fa fa-spin fa-circle-o" style="display: none;"></i>
              </button>
            </div>
            <div class="d-flex wd-100p">
            <p class="error mg-0 mg-t-5 wd-100p flex-grow-1 text-center tx-danger" style="opacity: 0;"></p>
              <button type="button" class="btn custom-rounded btn-custom text-uppercase wd-50p mg-l-20" style="opacity: 0; height: 1px;">
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>

        <div class="modal-footer header-wrap justify-content-center pd-t-0">
          <button type="button" data-dismiss="modal" data-target="#login-modal" class="btn custom-rounded btn-back wd-50p">Back</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Login Modal -->

  <?php echo "$_template_footer_inc_1"; ?>
  <?php echo "$_template_footer_inc_2"; ?>

  <!-- For Debugging -->
  <script src="https://browser.sentry-cdn.com/5.11.1/bundle.min.js" integrity="sha384-r7/ZcDRYpWjCNXLUKk3iuyyyEcDJ+o+3M5CqXP5GUGODYbolXewNHAZLYSJ3ZHcV" crossorigin="anonymous"></script>
  <script>
    if (typeof Sentry != 'undefined') {
      Sentry.init({ dsn: 'https://e172e3c73d894417834ccc525ee30a67@sentry.io/2011088' });
    }
  </script>
  <!-- For Debugging -->

  <script src="assets/js/utils.js"></script>
  <script src="assets/js/login.js"></script>
</body>
</html>
