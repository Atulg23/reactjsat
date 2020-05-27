import React, { Fragment, ReactElement, Component } from "react";
import Chart from "react-apexcharts";
import {  makeStyles } from "@material-ui/core";

// import { PieChart, Pie, Sector, Cell,ResponsiveContainer } from 'recharts';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   ResponsiveContainer
// } from "recharts";

const useStyles = () =>
  makeStyles({
    root: {
     
      width:"100%",
      marginTop:"50"
    },
    tableWrapper: {
      height: 400,
      overflow: "scroll",
      width:"1000px"
    },
    paper:{
       /* ... */
      
    }
    
  });


const data = [
  { name: "Availaible", value: 400 },
  { name: "Earmarked", value: 300 },
  { name: "Shadow Buffer", value: 300 },
  { name: "Project Buffer", value: 200 },
  { name: "Billable", value: 200 }
];

const data2 = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined)
];
function createData(time ,amount) {
  return { time, amount };
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FFBB28"];

// interface Props {
//   cx: number;
//   cy: number;
//   innerRadius: any;
//   outerRadius: any;
//   percent: any;
//   index: any;
//   midAngle: any;
// }
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const options1 = {
  labels: [
    "Availaibility",
    "EarMarked",
    "Shadow Buffer",
    "Project Buffer",
    "Client Visibility"
  ],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

const options2 = {
  labels: ["DU0", "DU1", "DU2", "DU3", "DU4"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

const series = [10, 55, 41, 17, 30];
const classes = useStyles();


const Dashboard =() =>  {


      
    return (

      <div className="mainContent" style={{ height: "500px", width: "500px" }}>
        <div style={{ display: "flex" }}>
          <div>
            <p style={{ marginLeft: "50px" }}>Resource Availaibility</p>
            <Chart
              options={options1}
              series={series}
              type="donut"
              width="380"
            />
          </div>
          <div>
            <p style={{ marginLeft: "50px" }}>Department allocation</p>
            <Chart options={options2} series={series} type="pie" width="350" />
          </div>
        </div>
      </div>
    );
  }


export default Dashboard;
