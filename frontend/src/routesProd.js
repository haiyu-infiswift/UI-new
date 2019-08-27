/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/production/Dashboard.jsx";
import loginFailure from 'views/production/LoginFailure';
import apiTesting from "views/production/APITesing";
import downsamplingError from "views/production/DownsamplingError";
import backfillFailure from "views/production/BackfillFailure";
import Grafana from "views/production/Grafana";
import onDemandBackfill from "views/production/OnDemandBackfill";
import OnDemandAlarm from "views/production/OnDemandAlarm";

var dashboardRoutes;

var modeValue;

dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Hien Monitor",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/production"
  },
  {
    path: "/loginFailure",
    name: "Login Failure",
    icon: "pe-7s-user",
    component: loginFailure,
    layout: "/production"
  },
  {
    path: "/downsamplingError",
    name: "Downsampling Error",
    icon: "pe-7s-note2",
    component: downsamplingError,
    layout: "/production"
  },
  {
    path: "/backfillFailure",
    name: "Backfill Failure",
    icon: "pe-7s-news-paper",
    component: backfillFailure,
    layout: "/production"
  },
  {
    path: "/APItesting",
    name: "API testing",
    icon: "pe-7s-science",
    component: apiTesting,
    layout: "/production"
  },
  {
    path: "/Grafana",
    name: "Grafana graph",
    icon: "pe-7s-leaf",
    component: Grafana,
    layout: "/production"
  },
  {
    path: "/OnDemandBackfill",
    name: "On demand backfill",
    icon: "pe-7s-hammer",
    component: onDemandBackfill,
    layout: "/production"
  },
  {
    path: "/OnDemandAlarm",
    name: "Alarm generator",
    icon: "pe-7s-signal",
    component: OnDemandAlarm,
    layout: "/production"
  }
];

export default dashboardRoutes;
