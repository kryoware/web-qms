<?php
$_lib_theme_url = '../app/';
$_template_meta_site = "@teaconcepts";
$_template_meta_creator = "@teaconcepts";
$_template_meta_card= "summary_large_image";
$_template_meta_title = " System ";
$_template_meta_des = " System (2019)";
$_template_meta_image = "";

$_template_head = '<meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

                    <!-- Twitter -->
                    <meta name="twitter:site" content="' . $_template_meta_site . '">
                    <meta name="twitter:creator" content="' . $_template_meta_creator . '">
                    <meta name="twitter:card" content="' . $_template_meta_card . '">
                    <meta name="twitter:title" content="' . $_template_meta_site . '">
                    <meta name="twitter:description" content="' . $_template_meta_des . '">
                    <meta name="twitter:image" content="' . $_template_meta_site . '">

                    <!-- Facebook -->
                    <meta property="og:url" content="">
                    <meta property="og:title" content="' . $_template_meta_title . '">
                    <meta property="og:description" content="' . $_template_meta_des . '">

                    <meta property="og:image" content="' . $_template_meta_site . '">
                    <meta property="og:image:secure_url" content="ht">
                    <meta property="og:image:type" content="image/png">
                    <meta property="og:image:width" content="1200">
                    <meta property="og:image:height" content="600">

                    <!-- Meta -->
                    <meta name="description" content="' . $_template_meta_des . '">
                    <meta name="author" content="' . $_template_meta_creator . '">



                     <!-- vendor css -->
                    <link href="' . $_lib_theme_url . 'lib/font-awesome/css/font-awesome.css" rel="stylesheet">
                    <link href="' . $_lib_theme_url . 'lib/Ionicons/css/ionicons.css" rel="stylesheet">
                    <link href="' . $_lib_theme_url . 'lib/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet">
                    <link href="' . $_lib_theme_url . 'lib/select2/css/select2.min.css" rel="stylesheet">
                    <link href="' . $_lib_theme_url . 'lib/jquery-toggles/css/toggles-full.css" rel="stylesheet">


                     <!-- DataTables css
                        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4-4.1.1/dt-1.10.18/datatables.min.css"/>
                     -->

                    <link href="' . $_lib_theme_url . 'lib/datatables/css/jquery.dataTables.css" rel="stylesheet">


                    <!-- Slim CSS -->
                    <link rel="stylesheet" href="' . $_lib_theme_url . 'css/slim.css">

                    <!-- TODO: google fonts wont load -->
                    <!--- <link rel="stylesheet" href="fonts.css"> -->

                    <!-- MOJO: My Styles CSS -->
                    <link rel="stylesheet" href="' . $_lib_root_url . 'styles_mojo.css">
                    <link rel="stylesheet" href="styles.css">';




$_template_footer_inc_1 =  ' <script src="' . $_lib_theme_url . 'lib/jquery/js/jquery.js"></script>
                            <script src="' . $_lib_theme_url . 'lib/jquery-ui/js/jquery-ui.js"></script>

                            <script src="' . $_lib_theme_url . 'lib/popper.js/js/popper.js"></script>
                            <script src="' . $_lib_theme_url . 'lib/bootstrap/js/bootstrap.js"></script>
                            <script src="' . $_lib_theme_url . 'lib/jquery.cookie/js/jquery.cookie.js"></script>


                            <script src="' . $_lib_theme_url . 'lib/moment/js/moment.js"></script>
                            <script src="' . $_lib_theme_url . 'lib/select2/js/select2.full.min.js"></script>
                            <script src="' . $_lib_theme_url . 'lib/jquery-toggles/js/toggles.min.js"></script>

                            ';


$_template_footer_inc_2 =  '<script src="' . $_lib_theme_url . 'js/slim.js"></script>
                            <script src="' . $_lib_theme_url . 'js/ResizeSensor.js"></script>

                            <!-- DataTables
                            <script type="text/javascript" src="$_paths2lib/https://cdn.datatables.net/v/bs4-4.1.1/dt-1.10.18/datatables.min.js"></script>
                            -->
                            <script src="' . $_lib_theme_url . 'lib/datatables/js/jquery.dataTables.js" type="text/javascript"></script>



                            <script src="' . $_lib_root_url . '_lib/js/basic.js"></script>
                            <script src="engine/main.js"></script>
                            ';


$_template_header = '<div class="slim-header with-sidebar">
    <div class="container-fluid">
        <div class="slim-header-left">
            <h2 class="slim-logo"><a href="home.php"><img src="assets/header_logo.jpg"></a></h2>
            <a href="" id="slimSidebarMenu" class="slim-sidebar-menu"><span></span></a>
            <div class="search-box developer">
                <input type="text" class="form-control" placeholder="Search">
                <button class="btn btn-primary"><i class="fa fa-search"></i></button>
            </div><!-- search-box -->
        </div><!-- slim-header-left -->
        <div class="slim-header-right">
            <div class="dropdown dropdown-a" data-toggle="tooltip" title="Activity Logs">
                <a href="" class="header-notification" data-toggle="dropdown">
                    <i class="icon ion-ios-bolt-outline"></i>
                </a>
                <div class="dropdown-menu d-none">
                    <div class="dropdown-menu-header">
                        <h6 class="dropdown-menu-title">Activity Logs</h6>
                        <div>
                            <a href="">Filter List</a>
                            <a href="">Settings</a>
                        </div>
                    </div><!-- dropdown-menu-header -->
                    <div class="dropdown-activity-list">
                        <div class="activity-label">Today, December 13, 2017</div>
                        <div class="activity-item">
                            <div class="row no-gutters">
                                <div class="col-2 tx-right">10:15am</div>
                                <div class="col-2 tx-center"><span class="square-10 bg-success"></span></div>
                                <div class="col-8">Purchased christmas sale cloud storage</div>
                            </div><!-- row -->
                        </div><!-- activity-item -->
                        <div class="activity-item">
                            <div class="row no-gutters">
                                <div class="col-2 tx-right">9:48am</div>
                                <div class="col-2 tx-center"><span class="square-10 bg-danger"></span></div>
                                <div class="col-8">Login failure</div>
                            </div><!-- row -->
                        </div><!-- activity-item -->
                        <div class="activity-item">
                            <div class="row no-gutters">
                                <div class="col-2 tx-right">7:29am</div>
                                <div class="col-2 tx-center"><span class="square-10 bg-warning"></span></div>
                                <div class="col-8">(D:) Storage almost full</div>
                            </div><!-- row -->
                        </div><!-- activity-item -->
                        <div class="activity-item">
                            <div class="row no-gutters">
                                <div class="col-2 tx-right">3:21am</div>
                                <div class="col-2 tx-center"><span class="square-10 bg-success"></span></div>
                                <div class="col-8">1 item sold <strong>Christmas bundle</strong></div>
                            </div><!-- row -->
                        </div><!-- activity-item -->
                        <div class="activity-label">Yesterday, December 12, 2017</div>
                        <div class="activity-item">
                            <div class="row no-gutters">
                                <div class="col-2 tx-right">6:57am</div>
                                <div class="col-2 tx-center"><span class="square-10 bg-success"></span></div>
                                <div class="col-8">Earn new badge <strong>Elite Author</strong></div>
                            </div><!-- row -->
                        </div><!-- activity-item -->
                    </div><!-- dropdown-activity-list -->
                    <div class="dropdown-list-footer">
                        <a href="page-activity.html"><i class="fa fa-angle-down"></i> Show All Activities</a>
                    </div>
                </div><!-- dropdown-menu-right -->
            </div><!-- dropdown -->
            <div class="dropdown dropdown-b" data-toggle="tooltip" title="Notifications">
                <a href="" class="header-notification " data-toggle="dropdown">
                    <i class="icon ion-ios-bell-outline"></i>
                    <span class="indicator"></span>
                </a>
                <div class="dropdown-menu d-none">
                    <div class="dropdown-menu-header">
                        <h6 class="dropdown-menu-title">Notifications</h6>
                        <div>
                            <a href="">Mark All as Read</a>
                            <a href="">Settings</a>
                        </div>
                    </div><!-- dropdown-menu-header -->
                    <div class="dropdown-list">
                        <!-- loop starts here -->
                        <a href="" class="dropdown-link">
                            <div class="media">
                                <img src="http://via.placeholder.com/500x500" alt="">
                                <div class="media-body">
                                    <p><strong>Suzzeth Bungaos</strong> tagged you and 18 others in a post.</p>
                                    <span>October 03, 2017 8:45am</span>
                                </div>
                            </div><!-- media -->
                        </a>
                        <!-- loop ends here -->
                        <a href="" class="dropdown-link">
                            <div class="media">
                                <img src="http://via.placeholder.com/500x500" alt="">
                                <div class="media-body">
                                    <p><strong>Mellisa Brown</strong> appreciated your work <strong>The Social Network</strong></p>
                                    <span>October 02, 2017 12:44am</span>
                                </div>
                            </div><!-- media -->
                        </a>
                        <a href="" class="dropdown-link read">
                            <div class="media">
                                <img src="http://via.placeholder.com/500x500" alt="">
                                <div class="media-body">
                                    <p>20+ new items added are for sale in your <strong>Sale Group</strong></p>
                                    <span>October 01, 2017 10:20pm</span>
                                </div>
                            </div><!-- media -->
                        </a>
                        <a href="" class="dropdown-link read">
                            <div class="media">
                                <img src="http://via.placeholder.com/500x500" alt="">
                                <div class="media-body">
                                    <p><strong>Julius Erving</strong> wants to connect with you on your conversation with <strong>Ronnie Mara</strong></p>
                                    <span>October 01, 2017 6:08pm</span>
                                </div>
                            </div><!-- media -->
                        </a>
                        <div class="dropdown-list-footer">
                            <a href="page-notifications.html"><i class="fa fa-angle-down"></i> Show All Notifications</a>
                        </div>
                    </div><!-- dropdown-list -->
                </div><!-- dropdown-menu-right -->
            </div><!-- dropdown -->
            <div class="dropdown dropdown-c">
                <a href="#" class="logged-user" data-toggle="dropdown">
                    <img src="http://via.placeholder.com/500x500" alt="">
                    <span>USER</span>
                    <i class="fa fa-angle-down"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <nav class="nav">
<!--                        <a href="page-profile.html" class="nav-link"><i class="icon ion-person"></i> View Profile</a>-->
<!--                        <a href="page-edit-profile.html" class="nav-link"><i class="icon ion-compose"></i> Edit Profile</a>-->
<!--                        <a href="page-activity.html" class="nav-link"><i class="icon ion-ios-bolt"></i> Activity Log</a>-->
<!--                        <a href="page-settings.html" class="nav-link"><i class="icon ion-ios-gear"></i> Account Settings</a>-->
<!--                        <a href="page-signin.html" class="nav-link"><i class="icon ion-forward"></i> Sign Out</a>-->
                        <a href="page-settings.html" class="nav-link"><i class="icon ion-ios-gear"></i> Change Password</a>
                        <a href="page-signin.html" class="nav-link"><i class="icon ion-forward"></i> Sign Out</a>
                    </nav>
                </div><!-- dropdown-menu -->
            </div><!-- dropdown -->
        </div><!-- header-right -->
    </div><!-- container-fluid -->
</div><!-- slim-header -->';

//NAVIGATION
require_once ("_template_nav.php");

$_template_footer = '<p>Copyright 2019 &copy; All Rights Reserved. TeaConcepts </p>
                <p>Designed by: <a href="">MojoTojo</a></p>';



//hide elements if not Dev Address
if( $_SERVER['REMOTE_ADDR'] != '202.137.120.28'){
//    $_template_sidebar_nav = "";
//    $_template_header_with_sidebar = "";

    echo "<script>
            var developer = 1;
        </script>";
}

$jqueryMask = '<script src="' . $_lib_theme_url . 'lib/jquery.maskedinput/js/jquery.maskedinput.js"></script>';
$parsely = '<script src="' . $_lib_theme_url . 'lib/parsleyjs/js/parsley.js"></script>';
$moment = '<script src="' . $_lib_theme_url . 'lib/moment/js/moment.js"></script>';

?>
