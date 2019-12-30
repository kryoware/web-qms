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
  <div class="custom-container bg-teal">
    <div class="custom-signin wd-100p wd-lg-60p">
      <div class="row no-gutters">
        
        <div class="col-lg-7">
          <div class="custom-signin-bg d-none d-lg-block ht-100p">
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <form class="ht-100p" method="post" action="" accept-charset="utf-8">
            <div class="ht-100p d-flex flex-column pd-20 justify-content-around">
              <div class="text-center">
              <h3>Welcome Message</h3>
              <p>Extra stuff</p>
            </div>

            <div class="mg-y-25">
              <input type="email" name="email" class="form-control mg-t-10" placeholder="Email">
              <input type="password" name="password" class="form-control mg-t-10" placeholder="Password">
              <div class="tx-danger mg-b-10" style="opacity: 0;">error</div>

              <button type="submit" class="btn btn-block btn-oblong btn-teal mg-t-20">
                <span>Sign In</span>
                <i class="fa fa-spin fa-circle-o" style="display: none;"></i>
              </button>
            </div>
          </form>
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
