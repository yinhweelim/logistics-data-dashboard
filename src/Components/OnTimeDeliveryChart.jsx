import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//chart options
const OnTimeDeliveryChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "On-time deliveries by requested delivery date",
      },
      scales: {
        x: {
          ticks: {
            stepSize: 1, //set tick interval on x-axis as 1
          },
        },
        y: { max: 100 },
      },
    },
  };

  //Calculate % on time deliveries by requested delivery date
  //use reduce to create an object with total and true counts per date, output:
  // {
  //   '2023-08-01': {
  //     total: 2,
  //     trueCount: 1
  //   },
  //   '2023-08-02': {
  //     total: 3,
  //     trueCount: 2
  //   }
  // }
  const countsByDate = props.tripsData.reduce((acc, record) => {
    const { deliveryDate, isOnTime } = record;
    acc[deliveryDate] = acc[deliveryDate] || { total: 0, trueCount: 0 };
    acc[deliveryDate].total += 1;
    if (isOnTime === true) {
      acc[deliveryDate].trueCount += 1;
    }
    return acc;
  }, {});

  //convert the object to an array of objects with date and % true, output:
  //const dataArray = [
  //   {
  //     date: '2023-08-01',
  //     onTimeRate: 50, // (1 trueCount / 2 total) * 100
  //   },
  //   {
  //     date: '2023-08-02',
  //     onTimeRate: 66.66666666666666, // (2 trueCount / 3 total) * 100
  //   }
  // ];
  let dataArray = Object.entries(countsByDate).map(([date, counts]) => ({
    date,
    onTimeRate: (counts.trueCount / counts.total) * 100,
  }));

  //sort by date in ascending order
  dataArray = dataArray.sort((recordA, recordB) => {
    const dateA = new Date(recordA.date);
    const dateB = new Date(recordB.date);
    return dateA - dateB;
  });

  //adjust array to show 7 most recent dates
  const numDatesToShow = 7;
  const startIndex = Math.max(0, dataArray.length - numDatesToShow);
  const recentDataArray = dataArray.slice(startIndex);

  const data = {
    labels: recentDataArray.map((row) => row.date),
    datasets: [
      {
        label: "On-time delivery % ",
        data: recentDataArray.map((row) => row.onTimeRate),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default OnTimeDeliveryChart;
