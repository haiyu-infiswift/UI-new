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
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import ListBox from 'views/ListBox';

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
    component: ListBox,
    layout: "/admin"
  },
  {
    path: "/downsamplingError",
    name: "Downsampling Error",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/backfillFailure",
    name: "Backfill Failure",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/APItesting",
    name: "API testing",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  }
];

export default dashboardRoutes;
