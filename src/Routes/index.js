import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Employee from "../components/Employee/Employee";
import DUlist from '../components/DU/DUlist';
import DUDD from '../components/DUDD/DUDDlist';
import Designation from '../components/Designation/Designation'
import Organization from '../components/Organization/Organization'
import Customer from './../components/Customer/Customer';
import ADDCustomer from './../components/Customer/newAddCustomer';
import EditCustomer from './../components/Customer/EditCustomer';
import Section from "./../components/Section/Section";
import Operations from './../components/operations/operations';
import Technology from './../components/Technology/Technology';
import EmployeeAD from './../components/EmployeeAD/EmployeeAD';
import Countries from './../components/Countries/Countries';
import Departments from './../components/Departments/Departments';
import Project from './../components/Project/Project';
import ResourceAllocation from './../components/ResourceAllocation/ResourceAllocation';
import ResourceAllocationDetails from './../components/ResourceAllocation/ResourceAllocationDetails';
import Domain from './../components/Domain/Domain';
import ProjectType from './../components/ProjectType/ProjectType';
import SOW from "../components/SOW/SOW";
import ProjectDashboard from './../components/ProjectDashboard/ProjectDashboard';
import Roles from './../components/Roles/Roles';
//import SOW_PD from '../components/ProjectDashboard/SOW_PD';
import ProjectList from '../components/ProjectList/ProjectList';
import AddProject from "../components/ProjectList/AddProject";
import EditProject from "../components/ProjectList/EditProject";

export default function Routes()  {

    return (
      <Switch>    
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route path="/employee" component={Employee} />
        <Route path="/du" component={DUlist} />
        <Route path="/dudd" component={DUDD} />
        <Route path="/designation" component={Designation} />
        <Route path="/organization" component={Organization} />
        <Route exact path="/customer" component={Customer} />
        <Route path="/addcustomer" component={ADDCustomer} />
        <Route path="/editcustomer" component={EditCustomer} />
        <Route path="/section" component={Section} />
        <Route path="/operation" component={Operations} />
        <Route path="/technology" component={Technology} />
        <Route path="/employeead" component={EmployeeAD} />
        <Route path="/countries" component={Countries} />
        <Route path="/departments" component={Departments} />
        <Route path="/projectlist" component={ProjectList} />

        <Route path="/projectdashboard/projects" component={Project} />
        <Route path="/projectdashboard/project_types" component={ProjectType} />
        <Route  path="/projectdashboard" component={ProjectDashboard} />
        <Route path="/domains" component={Domain} />
        <Route path="/ra" component={ResourceAllocation} />
        <Route path="/radetails" component={ResourceAllocationDetails} />
        <Route path="/sow" component={SOW} />
        <Route  path="/roles" component={Roles} />
        <Route path="/addproject" component={AddProject}/>
        <Route path="/editproject" component={EditProject}/>
        {/* <Route exact path="/notification" component={Notification} /> */}
      </Switch>
    );
  }

