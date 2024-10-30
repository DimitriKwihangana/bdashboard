// chartOptions.js

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

export const sectoroptions =  {
    responsive: true,
    indexAxis: "x",
  
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Sector Performance Overview",
        font: {
          size: 18,
        },
        color:"#087ABC",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      datalabels: {
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== 0; // Only display labels if the value is not zero
        },
        align: 'centre',
        anchor: 'centre',
        formatter: (value, context) => {
          return value; // You can customize this to format the data labels
        },
        font: {
          size: 16,
        },
        color: '#000', // Color of the data labels
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
        maxBarThickness: 50,
      },
    },
  };

  export const useractiveoptions  =   {
    responsive: true,
    indexAxis: "x",
  
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Active bids",
        font: {
          size: 18,
        },
        color:"#087ABC",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      datalabels: {
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== 0; // Only display labels if the value is not zero
        },
        align: 'centre',
        anchor: 'centre',
        formatter: (value, context) => {
          return value; // You can customize this to format the data labels
        },
        font: {
          size: 16,
        },
        color: '#000', // Color of the data labels
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
        maxBarThickness: 50,
      },
    },
  };
  export const Datesoptions = {
    responsive: true,
    indexAxis: "x",
  
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Bids submitted",
        font: {
          size: 18,
        },
        color:"#087ABC",
        padding: {
          top: 10,
          bottom: 20,
        },
        
      },
      datalabels: {
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== 0; // Only display labels if the value is not zero
        },
        align: 'centre',
        anchor: 'centre',
        formatter: (value, context) => {
          return value; // You can customize this to format the data labels
        },
        font: {
          size: 16,
        },
        color: '#000', // Color of the data labels
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
        maxBarThickness: 50,
      },
    },
  };

export const contractTypeoptions = {
  responsive: true,
  indexAxis: "x",
  
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Contract type of all bids",
      font: {
        size: 18,
      },
      color:"#087ABC",
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    datalabels: {
      display: (context) => {
        return context.dataset.data[context.dataIndex] !== 0; // Only display labels if the value is not zero
      },
      align: 'center',
      anchor: 'center',
      formatter: (value) => value, // Customize if needed
      font: {
        size: 16,
      },
      color: '#000', // Color of the data labels
    },
  },
  scales: {
    x: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
      },
      grid: {
        display: false,
      },
      maxBarThickness: 50,
    },
  },
};


  export const allprojectsoptions  =   {
    responsive: true,
    indexAxis: "x",
  
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Status of all bids",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color:"#087ABC",
      },
      datalabels: {
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== 0; // Only display labels if the value is not zero
        },
        align: 'centre',
        anchor: 'centre',
        formatter: (value, context) => {
          return value; 
        },
        font: {
          size: 16,
        },
        color: '#000', 
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
        maxBarThickness: 50,
      },
    },
  };

  export const donut = {
    responsive: true,          // Make the chart responsive
    maintainAspectRatio: false, // Allow for aspect ratio adjustments
    cutout: '70%',            // The percentage of the chart that is cut out of the middle to create a donut shape
    plugins: {
      legend: {
        display: true,        // Display the legend
        position: 'top',      // Position of the legend (top, bottom, left, right)
        labels: {
          boxWidth: 20,       // Width of the colored box in the legend
          padding: 15,        // Padding between legend items
          font: {
            size: 14,         // Font size of legend text
          },
        },
      },
      tooltip: {
        enabled: true,        // Enable tooltips
        callbacks: {
          label: function(tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0; // Get the value of the current data point
            return `${label}: ${value}`; // Format the tooltip label
          },
        },
      },
    },
    
    elements: {
      arc: {
        borderWidth: 2,       // Width of the border around the segments
      },
    },
    animation: {
      animateRotate: true,    // Enable rotation animation
      animateScale: true,     // Enable scale animation
    },
  };
  