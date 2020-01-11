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
  <style>
    .counter-card,
    .department-card {
      transition: all .3s ease-in-out;
    }

    .department-select,
    .counter-select {
      padding-bottom: 20px;
      flex-grow: 1;
    }

    .form-control:focus {
      border-color: #1CAF9A;
    }

    .header-wrap {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }

    .footer-wrap {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }

    body {
      height: 100vh;
      width: 100vw;
    }

    .nav-link.active {
      background-color: #1CAF9A !important;
    }
    .nav-link {
      border-radius: .5rem !important;
    }

    #counters .row {
      margin-left: -10px !important;
      margin-right: -10px !important;
    }

    #counters .col,
    #counters .col-6,
    #counters .col-4 {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    #login-modal .modal-dialog {
      width: 90vw;
    }
    #login-modal .modal-footer {
      background-color: #ffffff !important;
      padding: 0px 20px 20px 20px !important;
      border: none !important;

    }
    #login-modal .modal-header {
      background-color: #1CAF9A !important;
      padding: 20px 20px 0px 20px !important;
      border: none !important;
    }
    html {
      scroll-behavior: smooth;
    }
  </style>
</head>
<body>
  <div class="container-fluid mg-0 pd-0 ht-100p">
    <div class="d-flex flex-column ht-100p">

      <!-- Department Tabs -->
      <div class="header-wrap bg-white pd-20">
        <p class="text-center wd-100p tx-dark tx-semibold" style="font-size: 5vmin;">Select Department</p>
        <ul id="departments" class="nav nav-pills nav-justified"></ul>
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
              <button type="submit" class="btn custom-rounded btn-custom wd-50p mg-l-20">
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

  <script src="assets/js/utils.js"></script>
  <script src="assets/js/login.js"></script>
</body>
</html>
