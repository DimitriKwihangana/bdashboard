import { Doughnut } from 'react-chartjs-2'; // Change Pie to Doughnut
import Chart from 'chart.js/auto';
import React, { useCallback, useEffect, useState } from "react";
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

const Label = () => {
  const dispatch = useDispatch();

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const projects = useSelector((state) => state.data.projects);
  
  const [chartData, setChartData] = useState({
    labels: ['Snail', 'Sambaza', 'Dolphin', 'Whale'], // Labels for the donut chart
    datasets: [
      {
        label: 'Active Projects filtered by contract',
        data: [0, 0, 0, 0], // Initial data
        backgroundColor: [
          "rgba(8, 122, 188)", 
          "rgba(157, 195, 229)",
          "rgba(140, 207, 152)",
          "rgba(127, 127, 127)"
        ],
        borderWidth: 1, 
      },
    ],
  });

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Label of projects', // Your title here
        font: {
          size: 18, // Font size of the title
          weight: 'bold', 
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color:"#087ABC",
      },
    
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
      datalabels: { 
        font: {
            size: 16,
          },
        color: '#black', 
        anchor: 'end', 
        align: 'centre', 
        
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex]; // Get label
          return `${label}: ${value}%`; // Format the label to show percentage
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allows for height customization
    cutout: '50%', // This makes it a donut chart
  };

  useEffect(() => {
    const snail = projects.filter((p) => p.label === 'Snail').length;
    const sambaza = projects.filter((p) => p.label === 'Sambaza').length;
    const dolphin = projects.filter((p) => p.label === 'Dolphin').length;
    const whale = projects.filter((p) => p.label === 'Whale').length;

    const total = snail + sambaza + dolphin + whale; // Calculate total projects
    const data = total > 0 ? [ 
      (snail / total) * 100, 
      (sambaza / total) * 100, 
      (dolphin / total) * 100, 
      (whale / total) * 100 
    ] : [0, 0, 0, 0]; // Calculate percentages

    // Update chart data
    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data,
        },
      ],
    }));
  }, [projects]);

  return (
    <div style={{ height: '320px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Centering the chart */}
      <Doughnut data={chartData} options={options} plugins={[ChartDataLabels]} /> {/* Render Donut chart with options and data labels */}
    </div>
  );
};

export default Label;
