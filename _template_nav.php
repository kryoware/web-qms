<?php
$_template_nav = '<div class="slim-sidebar">
        <label class="sidebar-label">Navigation</label>
        
        <!-- DASHBOARD -->
        <ul class="nav nav-sidebar">
            <li class="sidebar-nav-item with-sub">
                <a href="" class="sidebar-nav-link"><i class="icon ion-ios-home-outline"></i> Dashboard</a>
                <ul class="nav sidebar-nav-sub">
                    <li class="nav-sub-item"><a href="home.php" class="nav-sub-link">Home</a></li>

                </ul>
            </li>


            <!-- CUSTOMERS -->
            <li class="sidebar-nav-item with-sub">
                <li class="sidebar-nav-item with-sub">
                <a href="" class="sidebar-nav-link "><i class="ion-ios-person-outline"></i> PROFILES</a>
                <ul class="nav sidebar-nav-sub">

                    <li class="nav-sub-item"><a href="customers.php" class="nav-sub-link ">Customers</a></li>
                    <li class="nav-sub-item"><a href="organizations.php" class="nav-sub-link ">Customers (Org)</a></li>
                    <li class="nav-sub-item"><a href="addresses.php" class="nav-sub-link ">Addresses</a></li>
                    <li class="nav-sub-item"><a href="hvacs.php" class="nav-sub-link">HVACs</a></li>
                    
                </ul>
            </li>

            <!-- CUSTOMERS -->
            <li class="sidebar-nav-item with-sub">
                <li class="sidebar-nav-item with-sub">
                <a href="" class="sidebar-nav-link "><i class="icon ion-ios-people-outline"></i> TEAMS </a>
                <ul class="nav sidebar-nav-sub">

                    <li class="nav-sub-item"><a href="people.php?t=staff&" class="nav-sub-link nav-staff">Staff</a></li>
                    <li class="nav-sub-item"><a href="teams.php" class="nav-sub-link nav-designers ">Teams</a></li>
                    <li class="nav-sub-item"><a href="people.php?t=admin&" class="nav-sub-link nav-admin">Admins</a></li>
                    
                </ul>
            </li>



            <!-- REPORTS -->
            <li class="sidebar-nav-item with-sub hideMe">
                <a href="" class="sidebar-nav-link"><i class="icon ion-ios-analytics-outline"></i> Reports</a>
                <ul class="nav sidebar-nav-sub">
                    <li class="nav-sub-item"><a href="chart-morris.html" class="nav-sub-link">Morris Charts</a></li>
                    <li class="nav-sub-item"><a href="chart-flot.html" class="nav-sub-link">Flot Charts</a></li>
                    <li class="nav-sub-item"><a href="chart-chartjs.html" class="nav-sub-link">ChartJS</a></li>
                    <li class="nav-sub-item"><a href="chart-echarts.html" class="nav-sub-link">ECharts</a></li>
                    <li class="nav-sub-item"><a href="chart-chartist.html" class="nav-sub-link">Chartist</a></li>
                    <li class="nav-sub-item"><a href="chart-rickshaw.html" class="nav-sub-link">Rickshaw</a></li>
                    <li class="nav-sub-item"><a href="chart-sparkline.html" class="nav-sub-link">Sparkline</a></li>
                    <li class="nav-sub-item"><a href="chart-peity.html" class="nav-sub-link">Peity</a></li>
                </ul>
            </li>


            <!-- SETTINGS  -->
            <li class="sidebar-nav-item with-sub">
                <a href="" class="sidebar-nav-link"><i class="icon ion-ios-gear-outline"></i> Settings</a>
                <ul class="nav sidebar-nav-sub">
                    <li class="nav-sub-item"><a href="form-elements.html" class="nav-sub-link">TIMEZONE</a></li>
                    
                </ul>
            </li>
     
        </ul>
    </div><!-- slim-sidebar -->';
