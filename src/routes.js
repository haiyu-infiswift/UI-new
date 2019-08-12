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
import Dashboard from "views/Dashboard.jsx";

import Typography from "views/Typography.jsx";
//import Icons from "views/Icons.jsx";
//import TableList from "views/TableListLogin";
import loginFailure from 'views/LoginFailure';
import apiTesting from "views/APITesing";
import downsamplingError from "views/DownsamplingError";
import backfillFailure from "views/BackfillFailure";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Hien Monitor",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/loginFailure",
    name: "Login Failure",
    icon: "pe-7s-user",
    component: loginFailure,
    layout: "/admin"
  },
  {
    path: "/downsamplingError",
    name: "Downsampling Error",
    icon: "pe-7s-note2",
    component: downsamplingError,
    layout: "/admin"
  },
  {
    path: "/backfillFailure",
    name: "Backfill Failure",
    icon: "pe-7s-news-paper",
    component: backfillFailure,
    layout: "/admin"
  },
  {
    path: "/APItesting",
    name: "API testing",
    icon: "pe-7s-science",
    component: apiTesting,
    layout: "/admin"
  }
];

export default dashboardRoutes;
